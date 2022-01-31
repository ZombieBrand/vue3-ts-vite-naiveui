import router from "@/router";
import { useStore } from "@/store";
// 白名单路由
const whiteList = ["/login", "/404"];

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  const store = useStore();
  const { token } = store;
  if (token) {
    // 已登陆
    if (to.path === "/login") {
      next("/");
    } else {
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
