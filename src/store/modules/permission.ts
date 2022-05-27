import { defineStore } from "pinia";
import { publicRoutes, privateRoutes } from "@/router";
import type { AppRouteRecordRaw } from "@/router";

interface TState {
  routes: AppRouteRecordRaw[];
}
export const usePermissionStore = defineStore("permission", {
  state: (): TState => ({
    // 路由表:初始时所拥有的路由表
    routes: publicRoutes,
  }),
  actions: {
    setRoutes(newRoutes: AppRouteRecordRaw[]) {
      this.routes = [...publicRoutes, ...newRoutes];
    },
    /**
     * 根据权限数据过滤路由
     * @param menus 权限数据
     */
    filterRoutes(menus: string[]) {
      // 筛选之后, 获取到的需要通过addRoute进行添加的路由表数组
      const routes = [];
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key));
      });
      // 所有不匹配路由跳转404, 必须添加到所有路由最后
      routes.push({
        path: "/:catchAll(.*)",
        redirect: "/404",
      });
      this.setRoutes(routes);
      return routes;
    },
  },
  persist: true,
});
