import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import { LockClosed, People } from "@vicons/ionicons5";

export default {
  path: "/user",
  component: Layout,
  redirect: "/user/manage",
  name: "permissionList",
  meta: {
    title: "User",
    icon: renderIcon(People),
    breadcrumb: true,
  },
  children: [
    {
      path: "/user/permission",
      component: () => import("@/views/permission-list/index.vue"),
      meta: {
        title: "UserPermission",
        icon: renderIcon(LockClosed),
      },
    },
  ],
};
