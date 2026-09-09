import type { IRouterModuleCompiler } from "../interfaces/router-module.interface";
import { type Router, RouteRecordRaw } from "vue-router";
import type { IModule } from "../interfaces/module.interface";
export declare function compileRouterFromModule(module: IModule, createRouter: (routes: RouteRecordRaw[]) => Router): Router;
export declare const routerModuleCompiler: IRouterModuleCompiler;
//# sourceMappingURL=router-modules.composable.d.ts.map