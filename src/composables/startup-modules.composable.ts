import type {
  AsyncColdStartHandler,
  AsyncHotStartHandler,
  ICompiledStartupModule,
  IStartupModuleCompiler,
  ProgressHandler,
} from '../interfaces/startup-module.interface'
import type { IModule } from '../interfaces/module.interface'

const compileColdStartupHandler = (handlers: AsyncColdStartHandler[]): AsyncColdStartHandler => {
  return async <TApp = unknown>(
    rootModule: IModule,
    app: TApp,
    onProgress: ProgressHandler | undefined = undefined,
  ) => {
    const stepSize = 1 / handlers.length
    const createInnerProgressHandler = (baseProgress: number) => {
      return onProgress
        ? (progress: number) => onProgress(baseProgress + progress * stepSize)
        : undefined
    }
    for (let i = 0; i < handlers.length; i++) {
      const step = handlers[i]
      const innerOnProgress = createInnerProgressHandler(i * stepSize)
      await step(rootModule, app, innerOnProgress)
      if (innerOnProgress) {
        innerOnProgress(1)
      }
    }
    if (onProgress) {
      onProgress(1)
    }
  }
}

const compileHotStartupHandler = (handlers: AsyncHotStartHandler[]): AsyncHotStartHandler => {
  return async (rootModule: IModule, onProgress: ProgressHandler | undefined = undefined) => {
    const stepSize = 1 / handlers.length
    const createInnerProgressHandler = (baseProgress: number) => {
      return onProgress
        ? (progress: number) => onProgress(baseProgress + progress * stepSize)
        : undefined
    }
    for (let i = 0; i < handlers.length; i++) {
      const step = handlers[i]
      const innerOnProgress = createInnerProgressHandler(i * stepSize)
      await step(rootModule, innerOnProgress)
      if (innerOnProgress) {
        innerOnProgress(1)
      }
    }
    if (onProgress) {
      onProgress(1)
    }
  }
}

const compileShutdownHandler = (handlers: (() => void)[]): (() => void) => {
  return () => {
    for (const handler of handlers) {
      try {
        handler()
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const startupModuleCompiler: IStartupModuleCompiler = {
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
}

export async function performModuleColdStart<TApp>(
  rootModule: IModule,
  app: TApp,
  onProgress: ProgressHandler | undefined = undefined,
) {
  const compiledModule = rootModule as ICompiledStartupModule
  if (compiledModule.compiledPerformColdStart) {
    await compiledModule.compiledPerformColdStart(rootModule, app, onProgress)
  }
}

export async function performModuleHotStart(
  rootModule: IModule,
  onProgress: ProgressHandler | undefined = undefined,
) {
  const compiledModule = rootModule as ICompiledStartupModule
  if (compiledModule.compiledPerformHotStart) {
    await compiledModule.compiledPerformHotStart(rootModule, onProgress)
  }
}

export function performModuleShutdown(rootModule: IModule) {
  const compiledModule = rootModule as ICompiledStartupModule
  if (compiledModule.performShutdown) {
    compiledModule.performShutdown()
  }
}
