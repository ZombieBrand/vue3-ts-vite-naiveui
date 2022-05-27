import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import {
  InformationCircle,
  People,
  Person,
  PersonAdd,
} from "@vicons/ionicons5";

export default {
  path: "/user",
  component: Layout,
  redirect: "/user/manage",
  name: "userManage",
  meta: {
    title: "User",
    icon: renderIcon(People),
    breadcrumb: true,
  },
  children: [
    {
      path: "/user/manage",
      component: () => import("@/views/user-manage/index.vue"),
      meta: {
        title: "UserManage",
        icon: renderIcon(Person),
      },
    },
    {
      path: "/user/info:id",
      name: "UserInfo",
      component: () => import("@/views/user-info/index.vue"),
      props: true,
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
};
