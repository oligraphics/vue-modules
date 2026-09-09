import type { IVueDirectivesModuleCompiler } from '../interfaces/vue-directives-module.interface'

export const vueDirectiveModulesCompiler: IVueDirectivesModuleCompiler = {
  props: {
    compiledDirectives: (module) => module.directives,
  },
}
