import { IModule, IVueDirectivesModule } from "../index";
import { Directive } from "vue";

export const VueDirectivesModule = new (class VueDirectivesModule
  implements IModule, IVueDirectivesModule
{
  name = "vue-directives";
  active = true;
  directives = Object.entries({
    myDirective: <Directive<HTMLElement, { myValue: number }>>{
      mounted(el, binding) {
        console.log(el, binding.value);
      },
    },
  });
})();
