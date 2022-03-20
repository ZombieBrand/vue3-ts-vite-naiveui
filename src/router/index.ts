import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterOptions,
} from "vue-router";
import Layout from "@/layout/index.vue";
import {
  BookOutline as BookIcon,
  People,
  PersonAdd,
  Accessibility,
  LockClosed,
  InformationCircle,
  Person,
  PersonCircle,
  Flame,
  AddCircle,
} from "@vicons/ionicons5";
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
const privateRouter = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/manage",
    meta: {
      title: "User",
      icon: renderIcon(People),
      breadcrumb: true,
    },
    children: [
      {
        path: "/user/manage",
        name: "UserManage",
        component: () => import("@/views/user-manage/index.vue"),
        meta: {
          title: "UserManage",
          icon: renderIcon(Person),
        },
      },
      {
        path: "/user/role",
        name: "UserRole",
        component: () => import("@/views/role-list/index.vue"),
        meta: {
          title: "UserRole",
          icon: renderIcon(Accessibility),
        },
      },
      {
        path: "/user/permission",
        name: "UserPermission",
        component: () => import("@/views/permission-list/index.vue"),
        meta: {
          title: "UserPermission",
          icon: renderIcon(LockClosed),
        },
      },
      {
        path: "/user/info:id",
        name: "UserInfo",
        component: () => import("@/views/user-info/index.vue"),
        meta: {
          title: "UserInfo",
          icon: renderIcon(InformationCircle),
        },
      },
      {
        path: "/user/import",
        name: "UserImport",
        component: () => import("@/views/import/index.vue"),
        meta: {
          title: "UserImport",
          icon: renderIcon(PersonAdd),
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
      icon: renderIcon(BookIcon),
    },
    children: [
      {
        path: "/article/ranking",
        name: "ArticleRanking",
        component: () => import("@/views/article-ranking/index.vue"),
        meta: {
          title: "ArticleRanking",
          icon: renderIcon(Flame),
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
          icon: renderIcon(AddCircle),
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
  routes: [...publicRoutes, ...privateRouter] as AppRouteRecordRaw[], // 扩展后的ts类型进行断言
});
