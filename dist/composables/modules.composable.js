"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileModule = compileModule;
const router_modules_composable_1 = require("./router-modules.composable");
const startup_modules_composable_1 = require("./startup-modules.composable");
const vue_directive_modules_composable_1 = require("./vue-directive-modules.composable");
function collectCompilers(module) {
    const ownCompilers = module.compilers ? module.compilers : [];
    const submoduleCompilers = module.modules?.flatMap(collectCompilers) ?? [];
    return [...ownCompilers, ...submoduleCompilers];
}
function runModuleCompiler(module, property, handler) {
    const valueExtractor = typeof handler === "function" ? handler : handler.value;
    if (valueExtractor === undefined) {
        throw new Error(`Invalid module compiler provided for property ${property}. Make sure the compiler extends IModuleValueCompiler!`);
    }
    const ownValue = valueExtractor(module);
    const ownValues = ownValue !== undefined
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
    }
    else if (handler.compile) {
        module[property] = handler.compile(allValues, module.name);
    }
}
function _compileModule(module, compilers = undefined, alreadyCompiled = new Set()) {
    const compiledDependencies = new Set();
    for (const submodule of (module.modules ?? []).filter((m) => m.active)) {
        if (alreadyCompiled.has(submodule)) {
            throw new Error(`Module ${submodule.constructor.name} is declared as a submodule of ${module.constructor.name} but is already compiled by another module!`);
        }
        const compiledSubmodule = _compileModule(submodule, compilers, alreadyCompiled);
        alreadyCompiled.add(compiledSubmodule);
        compiledDependencies.add(compiledSubmodule);
        for (const dependencyModule of compiledSubmodule.compiledDependencies ??
            []) {
            compiledDependencies.add(dependencyModule);
        }
    }
    for (const dependencyModule of (module.depends ?? []).filter((m) => m.active)) {
        if (!alreadyCompiled.has(dependencyModule)) {
            throw new Error(`Module ${module.constructor.name} depends on unknown module ${dependencyModule.constructor.name}! To fix this, include ${dependencyModule.constructor.name} as a submodule.`);
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
    const compiledModule = module;
    compiledModule.compiledDependencies = [...compiledDependencies];
    for (const compiler of compilers ?? []) {
        if (typeof compiler === "function") {
            compiler(compiledModule);
        }
        else {
            for (const [property, handler] of Object.entries(compiler.props)) {
                runModuleCompiler(compiledModule, property, handler);
            }
        }
    }
    return compiledModule;
}
function compileModule(module, options = {}) {
    const compilers = [...new Set(collectCompilers(module))];
    if (!options.omitBuiltinCompilers) {
        compilers.push(router_modules_composable_1.routerModuleCompiler, startup_modules_composable_1.startupModuleCompiler, vue_directive_modules_composable_1.vueDirectiveModulesCompiler);
    }
    return _compileModule(module, compilers);
}
//# sourceMappingURL=modules.composable.js.map