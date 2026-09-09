import type { IModule } from "./module.interface";
import type { IModuleCompiler, IModuleValueCompiler } from "./module-compiler.interface";
export type IRouterModule<TRouteRecord = unknown, TNavigationGuard = unknown, TNavigationHookAfter = unknown> = {
    routes?: TRouteRecord[];
    beforeEach?: TNavigationGuard | TNavigationGuard[];
    afterEach?: TNavigationHookAfter | TNavigationHookAfter[];
} & IModule;
export type IRouterModuleCompiler<TRouteRecord = unknown, TNavigationGuard = unknown, TNavigationHookAfter = unknown> = IModuleCompiler & {
    props: {
        compiledRoutes: IModuleValueCompiler<IRouterModule<TRouteRecord, TNavigationGuard, TNavigationHookAfter>, TRouteRecord>;
        compiledBeforeEach: IModuleValueCompiler<IRouterModule<TRouteRecord, TNavigationGuard, TNavigationHookAfter>, TNavigationGuard>;
        compiledAfterEach: IModuleValueCompiler<IRouterModule<TRouteRecord, TNavigationGuard, TNavigationHookAfter>, TNavigationHookAfter>;
    };
};
export type ICompiledRouterModule<TRouteRecord = unknown, TNavigationGuard = unknown, TNavigationHookAfter = unknown> = IRouterModule<TRouteRecord, TNavigationGuard, TNavigationHookAfter> & {
    compiledRoutes: TRouteRecord[];
    compiledBeforeEach: TNavigationGuard[];
    compiledAfterEach: TNavigationHookAfter[];
};
//# sourceMappingURL=router-module.interface.d.ts.map