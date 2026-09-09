import type { IModuleCompiler } from "./module-compiler.interface";
export type IModule = {
    readonly name: string;
    readonly active: boolean;
    compilers?: IModuleCompiler[];
    modules?: IModule[];
    depends?: IModule[];
    compiledDependencies?: IModule[];
};
export type ICompiledModule = {
    compiledDependencies: IModule[];
    [key: string]: unknown;
} & IModule;
//# sourceMappingURL=module.interface.d.ts.map