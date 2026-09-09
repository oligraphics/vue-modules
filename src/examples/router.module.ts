import { IModule, IRouterModule } from "../index";
import { RouteRecordRaw } from "vue-router";

export const RouterModule = new (class RouterModule
  implements IModule, IRouterModule
{
  name = "router";
  active = true;
  routes = <RouteRecordRaw[]>[
    {
      name: "home",
      component: () => {},
    },
  ];
})();
