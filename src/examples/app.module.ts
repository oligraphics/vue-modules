import { compileModule, IModule } from "../index";
import { RouterModule } from "./router.module";
import { StartupModule } from "./startup.module";
import { VueDirectivesModule } from "./vue-directives.module";

export const AppModule = compileModule(
  new (class AppModule implements IModule {
    name = "app";
    active = true;
    modules = <IModule[]>[RouterModule, StartupModule, VueDirectivesModule];
  })(),
);
