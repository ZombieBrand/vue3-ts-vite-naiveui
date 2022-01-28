import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 扩展hidden router受到RouteRecordRaw类型约束
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean;
};

/**
 * @description 公共路由
 */

const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      // meta里是模糊类型所以任意增加自定义属性无需基于RouteRecordRaw扩展
      title: "登录",
      icon: "Home",
      roles: ["admin"],
    },
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
      roles: ["admin"],
    },
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
});
