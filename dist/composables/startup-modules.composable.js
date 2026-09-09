"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupModuleCompiler = void 0;
exports.performModuleColdStart = performModuleColdStart;
exports.performModuleHotStart = performModuleHotStart;
exports.performModuleShutdown = performModuleShutdown;
const compileColdStartupHandler = (handlers) => {
    return async (rootModule, app, onProgress = undefined) => {
        const stepSize = 1 / handlers.length;
        const createInnerProgressHandler = (baseProgress) => {
            return onProgress
                ? (progress) => onProgress(baseProgress + progress * stepSize)
                : undefined;
        };
        for (let i = 0; i < handlers.length; i++) {
            const step = handlers[i];
            const innerOnProgress = createInnerProgressHandler(i * stepSize);
            await step(rootModule, app, innerOnProgress);
            if (innerOnProgress) {
                innerOnProgress(1);
            }
        }
        if (onProgress) {
            onProgress(1);
        }
    };
};
const compileHotStartupHandler = (handlers) => {
    return async (rootModule, onProgress = undefined) => {
        const stepSize = 1 / handlers.length;
        const createInnerProgressHandler = (baseProgress) => {
            return onProgress
                ? (progress) => onProgress(baseProgress + progress * stepSize)
                : undefined;
        };
        for (let i = 0; i < handlers.length; i++) {
            const step = handlers[i];
            const innerOnProgress = createInnerProgressHandler(i * stepSize);
            await step(rootModule, innerOnProgress);
            if (innerOnProgress) {
                innerOnProgress(1);
            }
        }
        if (onProgress) {
            onProgress(1);
        }
    };
};
const compileShutdownHandler = (handlers) => {
    return () => {
        for (const handler of handlers) {
            try {
                handler();
            }
            catch (e) {
                console.error(e);
            }
        }
    };
};
exports.startupModuleCompiler = {
    props: {
        compiledPerformColdStart: {
            value: (module) => module.performColdStart,
            compile: compileColdStartupHandler,
        },
        compiledPerformHotStart: {
            value: (module) => module.performHotStart,
            compile: compileHotStartupHandler,
        },
        compiledPerformShutdown: {
            value: (module) => module.performShutdown,
            compile: compileShutdownHandler,
        },
    },
};
async function performModuleColdStart(rootModule, app, onProgress = undefined) {
    const compiledModule = rootModule;
    if (compiledModule.compiledPerformColdStart) {
        await compiledModule.compiledPerformColdStart(rootModule, app, onProgress);
    }
}
async function performModuleHotStart(rootModule, onProgress = undefined) {
    const compiledModule = rootModule;
    if (compiledModule.compiledPerformHotStart) {
        await compiledModule.compiledPerformHotStart(rootModule, onProgress);
    }
}
function performModuleShutdown(rootModule) {
    const compiledModule = rootModule;
    if (compiledModule.performShutdown) {
        compiledModule.performShutdown();
    }
}
//# sourceMappingURL=startup-modules.composable.js.map