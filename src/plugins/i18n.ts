import { App } from "vue";
import { i18n } from "@/locales";
const install = (app: App) => {
  app.use(i18n);
};
export default install;
