import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import { BookOutline as BookIcon, Flame } from "@vicons/ionicons5";

export default {
  path: "/article",
  component: Layout,
  redirect: "/article/ranking",
  name: "articleRanking",
  meta: {
    title: "Article",
    icon: renderIcon(BookIcon),
  },
  children: [
    {
      path: "/article/ranking",
      component: () => import("@/views/article-ranking/index.vue"),
      meta: {
        title: "ArticleRanking",
        icon: renderIcon(Flame),
      },
    },
    {
      path: "/article/:id",
      component: () => import("@/views/article-detail/index.vue"),
      meta: {
        title: "ArticleDetail",
      },
    },
  ],
};
