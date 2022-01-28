import { App } from "vue";
// https://vue-i18n.intlify.dev/  vue-i18n
// https://github.com/intlify/bundle-tools vite vue-i18n插件
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { useLocalStorage } from "@vueuse/core";
const storage = useLocalStorage("language", "zh");
const locale = storage.value;
const install = (app: App) => {
  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: "zh",
    globalInjection: true, //这里设置true后全局组件可以直接使用$t无需额外注册组件
    messages,
  });
  app.use(i18n);
};

export default install;
