import type { RouteRecordRaw } from "vue-router";
import path from "path-browserify"; // 解决vite客户端无法使用nodejs->path功能问题
/**
 * 所有的子集路由
 * @param routes
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  let result: RouteRecordRaw[] = [];
  for (const route of routes) {
    if (route.children && route.children.length > 0) {
      result = [...result, ...route.children];
    }
  }
  return result;
};
/**
 * 处理脱离层级的路由
 */
export const filterRouters = (routes: RouteRecordRaw[]) => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes);
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    // 根据route在childrenRoutes中进行查重,把所有重复路由表,剔除
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

const isNull = (data: RouteRecordRaw["children"] | RouteRecordRaw["meta"]) => {
  if (!data) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
};

/**
 * 根据routes(filterRouters)数据,返回对应的menu规则的数据
 */
export const generateMenus = (routes: RouteRecordRaw[], basePath = "") => {
  let result: RouteRecordRaw[] = [];
  // 遍历路由表
  for (const item of routes) {
    // 不存在children 不存在meta 直接return
    if (isNull(item.children) && isNull(item.meta)) {
      continue;
    }
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      const nextResult = generateMenus(item.children as RouteRecordRaw[]);
      result = [...result, ...nextResult];
    }
    // 因为最终的menu需要跳转,需要合并path
    const routePath = path.resolve(basePath, item.path);
    // 路由分离之后,可能存在同名父路由的情况
    let route = result.find((item) => item.path === routePath);
    // 当前路由尚未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };
      // icon && title
      if (route.meta && route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route);
      }
    }
    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children?.push(
        ...generateMenus(item.children as RouteRecordRaw[], route.path)
      );
    }
  }
  return result;
};
