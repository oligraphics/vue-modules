import type { IRouterModuleCompiler } from "../interfaces/router-module.interface";
import { type Router } from "vue-router";
import type { IModule } from "../interfaces/module.interface";
export declare function compileRouterFromModule(module: IModule, options?: {
    baseUrl?: string;
}): Router;
export declare const routerModuleCompiler: IRouterModuleCompiler;
//# sourceMappingURL=router-modules.composable.d.ts.map