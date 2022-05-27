import type { DirectiveBinding } from "vue";
import { useUserStore } from "@/store/modules/user";
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding.value);
  },
};
function checkPermission(el: HTMLElement, permission: string[]) {
  const userStore = useUserStore();
  const points = userStore.userInfo.permission.points;
  if (permission && Array.isArray(permission)) {
    const hasPermission = points.some((point) => {
      return permission.includes(point);
    });
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el); // 关键代码, 没有权限则删除元素
    }
  } else {
    throw new Error("v-permission value is string[]");
  }
}
