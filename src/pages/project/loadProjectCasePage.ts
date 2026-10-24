import type { ComponentType } from "react";

interface ProjectCaseModule {
  default: ComponentType;
}

let loaded: ProjectCaseModule | undefined;
let pending: Promise<ProjectCaseModule> | undefined;

/**
 * A fulfilled import result whose `then` runs immediately.
 * `React.lazy` suspends on a normal promise even after the module is cached,
 * which paints the route fallback before the case. Calling the resolver now
 * lets the first render include the page.
 */
class ReadyProjectCase extends Promise<ProjectCaseModule> {
  readonly module: ProjectCaseModule;

  constructor(module: ProjectCaseModule) {
    super((resolve) => {
      resolve(module);
    });
    this.module = module;
  }

  override then<TResult1 = ProjectCaseModule, TResult2 = never>(
    onfulfilled?: ((value: ProjectCaseModule) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    void onrejected;
    if (onfulfilled == null) {
      return Promise.resolve(this.module) as Promise<TResult1 | TResult2>;
    }

    try {
      return Promise.resolve(onfulfilled(this.module));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export function loadProjectCasePage(): Promise<ProjectCaseModule> {
  if (loaded !== undefined) {
    return new ReadyProjectCase(loaded);
  }

  pending ??= import("./ProjectCasePage").then((module) => {
    loaded = module;
    return module;
  });
  return pending;
}
