import type { IRouterModuleCompiler } from "../interfaces/router-module.interface";
import type { IModule } from "../interfaces/module.interface";
export declare function compileRouterFromModule<TRouter extends {
    beforeEach(hook: TNavigationGuard): void;
    afterEach(hook: TNavigationHookAfter): void;
}, TRouteRecord, TNavigationGuard, TNavigationHookAfter>(module: IModule, createRouter: (routes: TRouteRecord[]) => TRouter): TRouter;
export declare const routerModuleCompiler: IRouterModuleCompiler;
//# sourceMappingURL=router-modules.composable.d.ts.map