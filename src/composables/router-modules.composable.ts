import type {
  ICompiledRouterModule,
  IRouterModuleCompiler,
} from "../interfaces/router-module.interface";
import type { IModule } from "../interfaces/module.interface";

export function compileRouterFromModule<
  TRouter extends {
    beforeEach(hook: TNavigationGuard): void;
    afterEach(hook: TNavigationHookAfter): void;
  },
  TRouteRecord,
  TNavigationGuard,
  TNavigationHookAfter,
>(module: IModule, createRouter: (routes: TRouteRecord[]) => TRouter): TRouter {
  const compiledModule = module as ICompiledRouterModule<
    TRouteRecord,
    TNavigationGuard,
    TNavigationHookAfter
  >;
  const routes = compiledModule.compiledRoutes ?? [];
  const beforeEach = compiledModule.compiledBeforeEach ?? [];
  const afterEach = compiledModule.compiledAfterEach ?? [];

  const router = createRouter(routes);

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
