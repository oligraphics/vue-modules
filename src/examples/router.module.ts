import { IModule, IRouterModule } from "../index";

export const RouterModule = new (class RouterModule
  implements IModule, IRouterModule
{
  name = "router";
  active = true;
  routes = [
    {
      name: "home",
      component: () => {},
    },
  ];
})();
