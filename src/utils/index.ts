import { h } from "vue";
import { NIcon } from "naive-ui";
import { i18n } from "@/locales";


/**
 * render 图标
 * */
export function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
/**
 * 获取当前语言
 * */
export function getLanguage() {
  // @ts-ignore
  return i18n.global.locale.value;
}
