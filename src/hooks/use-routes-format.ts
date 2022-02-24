import type { RouteRecordRaw } from "vue-router";
import { useRouter } from "vue-router";
import { filterRouters, generateMenus } from "@/utils/route";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { TMenuRoutes } from "@/types/route";

export default function useRoutsFormat() {
  const { t } = useI18n();
  const router = useRouter();
  const routes = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes());
    return generateMenus(filterRoutes);
  });
  // 格式化处理menuOptions
  const formatMenuOptions = (route: RouteRecordRaw[]) => {
    return route.map((item) => {
      const routeTemplate: TMenuRoutes = {
        label: item.meta ? t(`route.${item.meta.title}`) : "",
        key: item.path,
        icon: item.meta?.icon,
      };
      if (item.children && item.children.length > 0) {
        routeTemplate.children = formatMenuOptions(item.children);
      }
      return routeTemplate;
    });
  };

  return {
    formatMenuOptions: computed(() => {
      return formatMenuOptions(routes.value);
    }),
    routes,
  };
}
