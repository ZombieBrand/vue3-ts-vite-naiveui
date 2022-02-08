import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from "vue-router";
import Layout from "@/layout/index.vue";
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
      title: "login",
      icon: "BookIcon",
      roles: ["admin"],
    },
  },
  {
    path: "/",
    component: Layout,
    children: [
      // 个人中心
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
        meta: {
          title: "profile",
          icon: "BookIcon",
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
const privateRouter = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/manage",
    meta: {
      title: "User",
      icon: "BookIcon",
    },
    children: [
      {
        path: "/user/manage",
        name: "UserManage",
        component: () => import("@/views/user-manage/index.vue"),
        meta: {
          title: "UserManage",
          icon: "BookIcon",
        },
      },
      {
        path: "/user/role",
        name: "UserRole",
        component: () => import("@/views/role-list/index.vue"),
        meta: {
          title: "UserRole",
          icon: "BookIcon",
        },
      },
      {
        path: "/user/permission",
        name: "UserPermission",
        component: () => import("@/views/permission-list/index.vue"),
        meta: {
          title: "UserPermission",
          icon: "BookIcon",
        },
      },
      {
        path: "/user/info:id",
        name: "UserInfo",
        component: () => import("@/views/user-info/index.vue"),
        meta: {
          title: "UserInfo",
          icon: "BookIcon",
        },
      },
      {
        path: "/user/import",
        name: "UserImport",
        component: () => import("@/views/import/index.vue"),
        meta: {
          title: "UserImport",
          icon: "BookIcon",
        },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/ranking",
    meta: {
      title: "Article",
      icon: "BookIcon",
    },
    children: [
      {
        path: "/article/ranking",
        name: "ArticleRanking",
        component: () => import("@/views/article-ranking/index.vue"),
        meta: {
          title: "ArticleRanking",
          icon: "BookIcon",
        },
      },
      {
        path: "/article/:id",
        name: "ArticleDetail",
        component: () => import("@/views/article-detail/index.vue"),
        meta: {
          title: "ArticleDetail",
        },
      },
      {
        path: "/article/create",
        name: "ArticleCreate",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "ArticleCreate",
          icon: "BookIcon",
        },
      },
      {
        path: "/article/editor/:id",
        name: "ArticleEditor",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "ArticleEditor",
        },
      },
    ],
  },
];

export default createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: [...publicRoutes,...privateRouter] as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
});
