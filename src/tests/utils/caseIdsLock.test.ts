import { describe, expect, it, vi } from "vitest";

import { assertCaseIdsLocked } from "../../utils/caseIdsLock";
import { prerenderPages } from "../../utils/prerenderPages";

vi.mock("../../constants/caseCopy", async () => {
  const actual = await vi.importActual<typeof import("../../constants/caseCopy")>(
    "../../constants/caseCopy",
  );
  const caseCopy = [
    ...actual.caseCopy.filter((item) => item.id !== "novyny"),
    {
      id: "only-copy",
      title: "Only Copy — Julia Samchuk",
      description: "Only in case copy.",
      imageAlt: "Only copy",
    },
  ];

  return {
    ...actual,
    caseCopy,
    caseCopyById: (id: string) => caseCopy.find((item) => item.id === id),
  };
});

const lockMessage = "Published case ids, project cases, and case copy must be the same list";

describe("assertCaseIdsLocked", () => {
  it("accepts one shared list", () => {
    expect(() => assertCaseIdsLocked(["lovespace"], ["lovespace"], ["lovespace"])).not.toThrow();
  });

  it("rejects an id missing from case copy", () => {
    expect(() => assertCaseIdsLocked(["lovespace"], ["lovespace"], [])).toThrow(
      expect.objectContaining({
        message: lockMessage,
        cause: {
          publishedIds: ["lovespace"],
          caseIds: ["lovespace"],
          copyIds: [],
        },
      }),
    );
  });

  it("rejects an id that exists only in case copy", () => {
    expect(() =>
      assertCaseIdsLocked(["lovespace"], ["lovespace"], ["lovespace", "only-copy"]),
    ).toThrow(
      expect.objectContaining({
        message: lockMessage,
        cause: {
          publishedIds: ["lovespace"],
          caseIds: ["lovespace"],
          copyIds: ["lovespace", "only-copy"],
        },
      }),
    );
  });

  it("rejects a published id with no case body", () => {
    expect(() => assertCaseIdsLocked(["lovespace"], [], ["lovespace"])).toThrow(
      expect.objectContaining({
        message: lockMessage,
        cause: {
          publishedIds: ["lovespace"],
          caseIds: [],
          copyIds: ["lovespace"],
        },
      }),
    );
  });
});

describe("prerenderPages case id lock", () => {
  it("fails the build when case copy drops a published id and adds an unknown one", () => {
    expect(() => prerenderPages()).toThrow(lockMessage);
  });
});
