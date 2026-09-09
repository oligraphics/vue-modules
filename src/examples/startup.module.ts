import { IModule, IStartupModule } from "../index";

export const StartupModule = new (class StartupModule
  implements IModule, IStartupModule
{
  name = "startup";
  active = true;
  performColdStart = () => {};
  performHotStart = () => {};
  performShutdown = () => {};
})();
