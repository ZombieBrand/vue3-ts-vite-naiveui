import { h } from "vue";
import { NIcon } from "naive-ui";
import { i18n } from "@/locales";
import dayjs from "dayjs";

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

export function timeFormat(payload: string, schema = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(payload).format(schema);
}
