import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from "vue-router";
import Layout from "@/layout/index.vue";
import { PersonCircle } from "@vicons/ionicons5";
import { renderIcon } from "@/utils";
// 扩展hidden router受到RouteRecordRaw类型约束
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean;
};

/**
 *
 *  meta:{
 *    noCache: false   是否使用keep-alive缓存默认缓存 设置true时则不会缓存
 *    breadcrumb: false  面包屑组件是否可以点击跳转默认是可以点击跳转路由 设置true时则不可点击跳转路由
 *  }
 */

/**
 * @description 公共路由
 */

const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/authorization_management",
    children: [
      {
        path: "/authorization_management",
        name: "AuthorizationManagement",
        component: () => import("@/views/authorization-management/index.vue"),
        meta: {
          title: "AuthorizationManagement",
          icon: renderIcon(PersonCircle),
        },
      },
      // 404
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404.vue"),
      },
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401.vue"),
      },
    ],
  },
];
/**
 * @description 私有路由表
 */
const privateRouter: never[] = [];

export default createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRouter] as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
});
