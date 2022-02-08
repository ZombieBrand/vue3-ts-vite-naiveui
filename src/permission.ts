import router from "@/router";
import { useStore } from "@/store";
import { useUserStore } from "@/store/modules/user";
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
      if (!hasUserInfo) {
        const userStore = useUserStore();
        const result = await userStore.getUserInfo();
        // TODO:路由前置守卫获取用户信息结果未处理
        console.log({ result },11111);
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
