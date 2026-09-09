"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerModuleCompiler = void 0;
exports.compileRouterFromModule = compileRouterFromModule;
function compileRouterFromModule(module, createRouter) {
    const compiledModule = module;
    const routes = compiledModule.compiledRoutes ?? [];
    const beforeEach = compiledModule.compiledBeforeEach ?? [];
    const afterEach = compiledModule.compiledAfterEach ?? [];
    const router = createRouter(routes);
    for (const guard of beforeEach) {
        router.beforeEach(guard);
    }
    for (const hookAfter of afterEach) {
        router.afterEach(hookAfter);
    }
    return router;
}
exports.routerModuleCompiler = {
    props: {
        compiledRoutes: (module) => module.routes,
        compiledBeforeEach: (module) => module.beforeEach,
        compiledAfterEach: (module) => module.afterEach,
    },
};
//# sourceMappingURL=router-modules.composable.js.map