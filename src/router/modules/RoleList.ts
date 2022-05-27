import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import {
  Accessibility,
  People,
} from "@vicons/ionicons5";

export default {
  path: "/user",
  component: Layout,
  redirect: "/user/manage",
  name: "roleList",
  meta: {
    title: "User",
    icon: renderIcon(People),
    breadcrumb: true,
  },
  children: [
    {
      path: "/user/role",
      component: () => import("@/views/role-list/index.vue"),
      meta: {
        title: "UserRole",
        icon: renderIcon(Accessibility),
      },
    },
  ],
};
