import router from "@/router";
import { useStore } from "@/store";
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";
// 白名单路由
const whiteList = ["/login", "/404"];

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  const { token, hasUserInfo } = store;
  if (token) {
    // 已登陆
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断用户资料是否存在,如果不存在,则获取用户信息
      const userStore = useUserStore();
      if (!hasUserInfo) {
        const { permission } = await userStore.getUserInfo();
        addPrivateRoutes(permission.menus);
      } else {
        const { permission } = userStore.userInfo;
        addPrivateRoutes(permission.menus);
      }
      if (to.matched.length === 0) {
        next({ ...to, replace: true });
      }
      next();
    }
  } else {
    // 未登陆
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});

/**
 * 根据用户路由权限信息,动态添加路由
 * @param permissionMenus 路由name
 */
function addPrivateRoutes(permissionMenus: string[]) {
  // 处理权限,筛选有权限的路由
  const permissionStore = usePermissionStore();
  const filterRoutes = permissionStore.filterRoutes(permissionMenus);
  // 添加动态路由
  filterRoutes.forEach((item) => {
    router.addRoute(item);
  });
}
