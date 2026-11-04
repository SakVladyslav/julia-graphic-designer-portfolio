import type { ComponentType } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const casePageModule = "../../../pages/project/ProjectCasePage";

interface ChunkAttempt {
  resolve: (module: { default: ComponentType }) => void;
  reject: (error: Error) => void;
}

function installChunkMock(attempts: ChunkAttempt[]): void {
  vi.doMock(casePageModule, () => {
    return new Promise<{ default: ComponentType }>((resolve, reject) => {
      attempts.push({ resolve, reject });
    });
  });
}

describe("case chunk errors", () => {
  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    vi.doUnmock(casePageModule);
    vi.resetModules();
    window.history.pushState({}, "", import.meta.env.BASE_URL);
  });

  it("starts a new case-chunk import after the previous one rejects", async () => {
    vi.resetModules();
    const attempts: ChunkAttempt[] = [];
    installChunkMock(attempts);

    const { loadProjectCasePage } = await import("../../../pages/project/loadProjectCasePage");
    const first = loadProjectCasePage();

    await waitFor(() => {
      expect(attempts).toHaveLength(1);
    });
    const chunkError = new Error("chunk failed");
    attempts[0]?.reject(chunkError);
    await expect(first).rejects.toThrow(/chunk failed|error when mocking a module/);

    const second = loadProjectCasePage();
    await waitFor(() => {
      expect(attempts).toHaveLength(2);
    });
    attempts[1]?.resolve({
      default: function ProjectCasePage() {
        return null;
      },
    });
    await expect(second).resolves.toMatchObject({ default: expect.any(Function) });
  });

  it("mounts the shell and the missing-page view when a direct visit cannot load the chunk", async () => {
    const rejections: unknown[] = [];
    const onUnhandled = (reason: unknown) => {
      rejections.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);

    document.body.innerHTML = '<div id="root"><article class="case-page">Prerender</article></div>';
    window.history.pushState({}, "", `${import.meta.env.BASE_URL}projects/lovespace`);
    vi.resetModules();
    const attempts: ChunkAttempt[] = [];
    installChunkMock(attempts);

    const imported = import("../../../main");
    await waitFor(
      () => {
        expect(attempts.length).toBeGreaterThan(0);
      },
      { timeout: 10000 },
    );
    const rejected = new Set<ChunkAttempt>();
    const rejectFresh = () => {
      for (const attempt of attempts) {
        if (rejected.has(attempt)) {
          continue;
        }
        rejected.add(attempt);
        attempt.reject(new Error("chunk failed"));
      }
    };
    rejectFresh();
    await imported;

    try {
      await waitFor(() => {
        rejectFresh();
        expect(
          screen.getByRole("heading", { name: "This page does not exist." }),
        ).toBeInTheDocument();
      });
      expect(screen.getByRole("link", { name: "Reload" })).toHaveAttribute(
        "href",
        `${import.meta.env.BASE_URL}projects/lovespace`.replace(/\/{2,}/g, "/"),
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
      await userEvent.setup().click(screen.getByRole("link", { name: /back to the homepage/i }));
      expect(await screen.findByRole("heading", { name: /julia samchuk/i })).toBeInTheDocument();
      expect(rejections).toEqual([]);
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  });

  it("shows a project fallback between the header and footer while the chunk loads from home", async () => {
    window.history.pushState({}, "", import.meta.env.BASE_URL);
    vi.resetModules();
    const attempts: ChunkAttempt[] = [];
    installChunkMock(attempts);

    const { default: App } = await import("../../../App");
    render(<App />);

    await userEvent.setup().click(screen.getByRole("link", { name: /lovespace/i }));

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Loading the project.")).toBeInTheDocument();
    expect(document.querySelector(".case-page")).not.toBeInTheDocument();
  });
});
