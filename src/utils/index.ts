import { h } from "vue";
import { NIcon } from "naive-ui";
/**
 * render 图标
 * */
export function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
