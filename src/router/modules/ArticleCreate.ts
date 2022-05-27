import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import {
  AddCircle,
  BookOutline as BookIcon
} from "@vicons/ionicons5";

export default {
  path: "/article",
  component: Layout,
  redirect: "/article/ranking",
  name: "articleCreate",
  meta: {
    title: "Article",
    icon: renderIcon(BookIcon),
  },
  children: [
    {
      path: "/article/create",
      component: () => import("@/views/article-create/index.vue"),
      meta: {
        title: "ArticleCreate",
        icon: renderIcon(AddCircle),
      },
    },
    {
      path: "/article/editor/:id",
      component: () => import("@/views/article-create/index.vue"),
      meta: {
        title: "ArticleEditor",
      },
    },
  ],
};
