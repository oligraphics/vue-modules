import type { IModule } from './module.interface'

type ModuleValueExtractor<TModule extends IModule, TValue = unknown> = (
  module: TModule,
) => TValue | TValue[] | undefined

export type IModuleValueCompiler<
  TModule extends IModule = IModule,
  TValue = unknown,
  TCompiled = TValue[],
> =
  | ModuleValueExtractor<TModule>
  | {
      value: ModuleValueExtractor<TModule>
      compile?: (values: TValue[], moduleName: string) => TCompiled
    }

export type IModuleCompiler =
  | {
      props: { [key: string]: unknown }
    }
  | ((module: IModule & { compiledDependencies: IModule[] }) => void)
