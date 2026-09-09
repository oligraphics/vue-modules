import type { IModule } from './module.interface';
import type { NavigationGuard, NavigationHookAfter, RouteRecordRaw } from 'vue-router';
import type { IModuleCompiler, IModuleValueCompiler } from './module-compiler.interface';
export type IRouterModule = {
    routes?: RouteRecordRaw[];
    beforeEach?: NavigationGuard | NavigationGuard[];
    afterEach?: NavigationHookAfter | NavigationHookAfter[];
} & IModule;
export type IRouterModuleCompiler = IModuleCompiler & {
    props: {
        compiledRoutes: IModuleValueCompiler<IRouterModule, RouteRecordRaw>;
        compiledBeforeEach: IModuleValueCompiler<IRouterModule, NavigationGuard>;
        compiledAfterEach: IModuleValueCompiler<IRouterModule, NavigationHookAfter>;
    };
};
export type ICompiledRouterModule = IRouterModule & {
    compiledRoutes: RouteRecordRaw[];
    compiledBeforeEach: NavigationGuard[];
    compiledAfterEach: NavigationHookAfter[];
};
//# sourceMappingURL=router-module.interface.d.ts.map