// https://vue-i18n.intlify.dev/  vue-i18n
// https://github.com/intlify/bundle-tools vite vue-i18n插件
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { useLocalStorage } from "@vueuse/core";
import en from "./en.json";

type MessageSchema = typeof en;
const storage = useLocalStorage("language", "zh");
const locale = storage.value;
export const i18n = createI18n<[MessageSchema], "en" | "zh">({
  legacy: false,
  locale,
  fallbackLocale: "zh",
  globalInjection: true, //这里设置true后全局组件可以直接使用$t无需额外注册组件 set
  messages,
});
export const { t } = i18n.global;
