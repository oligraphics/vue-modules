import type { ICompiledModule, IModule } from "../interfaces/module.interface";
import type {
  IModuleCompiler,
  IModuleValueCompiler,
} from "../interfaces/module-compiler.interface";
import { routerModuleCompiler } from "./router-modules.composable";
import { startupModuleCompiler } from "./startup-modules.composable";
import { vueDirectiveModulesCompiler } from "./vue-directive-modules.composable";

function collectCompilers(module: IModule): IModuleCompiler[] {
  const ownCompilers = module.compilers ? module.compilers : [];
  const submoduleCompilers = module.modules?.flatMap(collectCompilers) ?? [];
  return [...ownCompilers, ...submoduleCompilers];
}

function runModuleCompiler(
  module: ICompiledModule,
  property: string,
  handler: IModuleValueCompiler,
) {
  const valueExtractor =
    typeof handler === "function" ? handler : handler.value;
  if (valueExtractor === undefined) {
    throw new Error(
      `Invalid module compiler provided for property ${property}. Make sure the compiler extends IModuleValueCompiler!`,
    );
  }
  const ownValue = valueExtractor(module);
  const ownValues =
    ownValue !== undefined
      ? Array.isArray(ownValue)
        ? ownValue
        : [ownValue]
      : [];
  const submoduleValues = module.compiledDependencies
    .map((d) => valueExtractor(d))
    .filter((v) => v !== undefined)
    .flatMap((v) => (Array.isArray(v) ? v : [v]));
  const allValues = [...ownValues, ...submoduleValues];
  if (typeof handler === "function") {
    module[property] = allValues.length > 0 ? allValues : undefined;
  } else if (handler.compile) {
    module[property] = handler.compile(allValues, module.name);
  }
}

/**
 * @returns The same module
 */
function _compileModule<TModule extends IModule = IModule>(
  module: TModule,
  compilers: IModuleCompiler[] | undefined = undefined,
  alreadyCompiled: Set<IModule> = new Set(),
): TModule {
  const compiledDependencies = new Set<IModule>();

  // Compile submodules
  for (const submodule of (module.modules ?? []).filter((m) => m.active)) {
    if (alreadyCompiled.has(submodule)) {
      throw new Error(
        `Module ${submodule.constructor.name} is declared as a submodule of ${module.constructor.name} but is already compiled by another module!`,
      );
    }
    const compiledSubmodule = _compileModule(
      submodule,
      compilers,
      alreadyCompiled,
    );
    alreadyCompiled.add(compiledSubmodule);
    compiledDependencies.add(compiledSubmodule);
    for (const dependencyModule of compiledSubmodule.compiledDependencies ??
      []) {
      compiledDependencies.add(dependencyModule);
    }
  }

  // Collect dependencies
  for (const dependencyModule of (module.depends ?? []).filter(
    (m) => m.active,
  )) {
    if (!alreadyCompiled.has(dependencyModule)) {
      throw new Error(
        `Module ${module.constructor.name} depends on unknown module ${dependencyModule.constructor.name}! To fix this, include ${dependencyModule.constructor.name} as a submodule.`,
      );
    }
    if (compiledDependencies.has(dependencyModule)) {
      continue;
    }
    compiledDependencies.add(dependencyModule);
    for (const deepDependencyModule of dependencyModule.compiledDependencies ??
      []) {
      compiledDependencies.add(deepDependencyModule);
    }
  }

  const compiledModule = module as ICompiledModule;
  compiledModule.compiledDependencies = [...compiledDependencies];
  for (const compiler of compilers ?? []) {
    if (typeof compiler === "function") {
      compiler(compiledModule);
    } else {
      for (const [property, handler] of Object.entries(compiler.props)) {
        runModuleCompiler(
          compiledModule,
          property,
          handler as IModuleValueCompiler,
        );
      }
    }
  }
  return compiledModule as TModule;
}

/**
 * @returns The same module
 */
export function compileModule<TModule extends IModule = IModule>(
  module: TModule,
  options: {
    omitBuiltinCompilers?: boolean;
  } = {},
): TModule {
  const compilers = [...new Set(collectCompilers(module))];
  if (!options.omitBuiltinCompilers) {
    compilers.push(
      routerModuleCompiler,
      startupModuleCompiler,
      vueDirectiveModulesCompiler,
    );
  }
  return _compileModule(module, compilers);
}
