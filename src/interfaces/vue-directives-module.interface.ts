import type { Directive } from 'vue'
import type { IModule } from './module.interface'
import type {
  IModuleCompiler,
  IModuleValueCompiler,
} from './module-compiler.interface'

export type IVueDirectivesModule = {
  directives?: [string, Directive][]
} & IModule

export type IVueDirectivesModuleCompiler = IModuleCompiler & {
  props: {
    compiledDirectives: IModuleValueCompiler<IVueDirectivesModule, [string, Directive]>
  }
}

export type ICompiledVueDirectivesModule = IVueDirectivesModule & {
  compiledDirectives: [string, Directive][]
}
