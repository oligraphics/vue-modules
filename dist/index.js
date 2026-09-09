"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileModule = exports.vueDirectiveModulesCompiler = exports.performModuleShutdown = exports.performModuleHotStart = exports.performModuleColdStart = exports.startupModuleCompiler = exports.routerModuleCompiler = exports.compileRouterFromModule = void 0;
var router_modules_composable_1 = require("./composables/router-modules.composable");
Object.defineProperty(exports, "compileRouterFromModule", { enumerable: true, get: function () { return router_modules_composable_1.compileRouterFromModule; } });
Object.defineProperty(exports, "routerModuleCompiler", { enumerable: true, get: function () { return router_modules_composable_1.routerModuleCompiler; } });
var startup_modules_composable_1 = require("./composables/startup-modules.composable");
Object.defineProperty(exports, "startupModuleCompiler", { enumerable: true, get: function () { return startup_modules_composable_1.startupModuleCompiler; } });
Object.defineProperty(exports, "performModuleColdStart", { enumerable: true, get: function () { return startup_modules_composable_1.performModuleColdStart; } });
Object.defineProperty(exports, "performModuleHotStart", { enumerable: true, get: function () { return startup_modules_composable_1.performModuleHotStart; } });
Object.defineProperty(exports, "performModuleShutdown", { enumerable: true, get: function () { return startup_modules_composable_1.performModuleShutdown; } });
var vue_directive_modules_composable_1 = require("./composables/vue-directive-modules.composable");
Object.defineProperty(exports, "vueDirectiveModulesCompiler", { enumerable: true, get: function () { return vue_directive_modules_composable_1.vueDirectiveModulesCompiler; } });
var modules_composable_1 = require("./composables/modules.composable");
Object.defineProperty(exports, "compileModule", { enumerable: true, get: function () { return modules_composable_1.compileModule; } });
//# sourceMappingURL=index.js.map