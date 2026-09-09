import type { IStartupModuleCompiler, ProgressHandler } from '../interfaces/startup-module.interface';
import type { IModule } from '../interfaces/module.interface';
export declare const startupModuleCompiler: IStartupModuleCompiler;
export declare function performModuleColdStart<TApp>(rootModule: IModule, app: TApp, onProgress?: ProgressHandler | undefined): Promise<void>;
export declare function performModuleHotStart(rootModule: IModule, onProgress?: ProgressHandler | undefined): Promise<void>;
export declare function performModuleShutdown(rootModule: IModule): void;
//# sourceMappingURL=startup-modules.composable.d.ts.map