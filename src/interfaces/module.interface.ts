import type { IModuleCompiler } from "./module-compiler.interface";

export type IModule = {
  readonly name: string;
  readonly active: boolean;
  compilers?: IModuleCompiler[];
  /**
   * Submodules of this module. These modules expected to not be submodules of any other module.
   */
  modules?: IModule[];
  /**
   * Dependencies of this module. These modules can be attached to any other module.
   */
  depends?: IModule[];
  /**
   * All modules, submodules and submodules of submodules referenced in <code>modules</code> and <code>depends</code>
   */
  compiledDependencies?: IModule[];
};

export type ICompiledModule = {
  /**
   * All modules, submodules and submodules of submodules referenced in <code>modules</code> and <code>depends</code>
   */
  compiledDependencies: IModule[];
  [key: string]: unknown;
} & IModule;
