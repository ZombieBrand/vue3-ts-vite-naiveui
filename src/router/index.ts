import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from "vue-router";
import { useUserStore } from "@/store/modules/user";
import UserManage from "@/router/modules/UserManage";
import RoleList from "@/router/modules/RoleList";
import PermissionList from "@/router/modules/PermissionList";
import Article from "@/router/modules/Article";
import ArticleCreate from "@/router/modules/ArticleCreate";

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

export const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/profile",
    children: [
      // 个人中心
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
        meta: {
          title: "profile",
          icon: renderIcon(PersonCircle),
          noCache: true,
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
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate,
];
/**
 * 初始化路由表
 */
export function resetRouter() {
  const userStore = useUserStore();
  if (
    userStore.userInfo &&
    userStore.userInfo.permission &&
    userStore.userInfo.permission.menus
  ) {
    const menus = userStore.userInfo.permission.menus;
    menus.forEach((menu) => {
      router.removeRoute(menu);
    });
  }
}

const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: publicRoutes as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
});
export default router;
