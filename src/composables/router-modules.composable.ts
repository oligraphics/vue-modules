import type {
  ICompiledRouterModule,
  IRouterModuleCompiler,
} from "../interfaces/router-module.interface";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type Router,
} from "vue-router";
import type { IModule } from "../interfaces/module.interface";

export function compileRouterFromModule(
  module: IModule,
  options: {
    baseUrl?: string;
  } = {},
): Router {
  const compiledModule = module as ICompiledRouterModule;
  const routes = compiledModule.compiledRoutes ?? [];
  const beforeEach = compiledModule.compiledBeforeEach ?? [];
  const afterEach = compiledModule.compiledAfterEach ?? [];

  const router = createRouter({
    history:
      typeof window !== "undefined"
        ? createWebHistory(options.baseUrl)
        : createMemoryHistory(options.baseUrl),
    routes,
  });

  for (const guard of beforeEach) {
    router.beforeEach(guard);
  }

  for (const hookAfter of afterEach) {
    router.afterEach(hookAfter);
  }

  return router;
}

export const routerModuleCompiler: IRouterModuleCompiler = {
  props: {
    compiledRoutes: (module) => module.routes,
    compiledBeforeEach: (module) => module.beforeEach,
    compiledAfterEach: (module) => module.afterEach,
  },
};
