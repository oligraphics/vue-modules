import type { IModule } from './module.interface';
import type { IModuleCompiler, IModuleValueCompiler } from './module-compiler.interface';
export type ProgressHandler = (progress: number) => void;
export type AsyncColdStartHandler<TApp = unknown> = (rootModule: IModule, app: TApp, onProgress?: ProgressHandler) => Promise<void> | void;
export type AsyncHotStartHandler = (rootModule: IModule, onProgress?: ProgressHandler) => Promise<void> | void;
export type ShutdownHandler = () => void;
export type IStartupModule<TApp = unknown> = {
    performColdStart?: AsyncColdStartHandler<TApp>;
    performHotStart?: AsyncHotStartHandler;
    performShutdown?: ShutdownHandler;
} & IModule;
export type IStartupModuleCompiler<TApp = unknown> = IModuleCompiler & {
    props: {
        compiledPerformColdStart: IModuleValueCompiler<IStartupModule<TApp>, AsyncColdStartHandler<TApp>, AsyncColdStartHandler<TApp>>;
        compiledPerformHotStart: IModuleValueCompiler<IStartupModule<TApp>, AsyncHotStartHandler, AsyncHotStartHandler>;
        compiledPerformShutdown: IModuleValueCompiler<IStartupModule<TApp>, ShutdownHandler, ShutdownHandler>;
    };
};
export type ICompiledStartupModule<TApp = unknown> = IStartupModule & {
    compiledPerformColdStart?: AsyncColdStartHandler<TApp>;
    compiledPerformHotStart?: AsyncHotStartHandler;
    compiledPerformShutdown?: ShutdownHandler;
};
//# sourceMappingURL=startup-module.interface.d.ts.map