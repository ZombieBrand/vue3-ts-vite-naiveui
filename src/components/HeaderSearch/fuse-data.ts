import type { RouteRecordRaw } from "vue-router";
import path from "path-browserify"; // 解决vite客户端无法使用nodejs->path功能问题
import { t } from "@/locales";

export interface TResult {
  value: string;
  label: string[];
}

/**
 * 筛选出可以供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径,默认 /
 * @param prefixTitle
 */
export const generateRoutes = (
  routes: RouteRecordRaw[],
  basePath = "/",
  prefixTitle: string[] = []
) => {
  // 创建result数据
  let res: TResult[] = [];
  for (const route of routes) {
    // 创建包含path和title的item
    const data: TResult = {
      value: path.resolve(basePath, route.path),
      label: [...prefixTitle],
    };
    // 当前存在meta时,使用i18n进行国际化解析,组合成新的title
    // 动态路由是不允许被检索的
    // 匹配动态路由的正则
    const re = /.*\/:.*/;
    if (
      route.meta &&
      route.meta.title &&
      !re.exec(route.path) &&
      !res.find((item) => item.value === data.value)
    ) {
      const i18nTitle = t(`route.${route.meta.title}`);
      data.label = [...data.label, i18nTitle];
      res.push(data);
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.value, data.label);
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes];
      }
    }
  }
  return res;
};
