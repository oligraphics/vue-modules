"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerModuleCompiler = void 0;
exports.compileRouterFromModule = compileRouterFromModule;
const vue_router_1 = require("vue-router");
function compileRouterFromModule(module, options = {}) {
    const compiledModule = module;
    const routes = compiledModule.compiledRoutes ?? [];
    const beforeEach = compiledModule.compiledBeforeEach ?? [];
    const afterEach = compiledModule.compiledAfterEach ?? [];
    const router = (0, vue_router_1.createRouter)({
        history: typeof window !== "undefined"
            ? (0, vue_router_1.createWebHistory)(options.baseUrl)
            : (0, vue_router_1.createMemoryHistory)(options.baseUrl),
        routes,
    });
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