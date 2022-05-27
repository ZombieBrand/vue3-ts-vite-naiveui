// @ts-ignore
import print from "vue3-print-nb";
import permission from "@/directives/permission";
import { App } from "vue";
export default (app: App) => {
  app.use(print);
  app.directive("permission", permission);
};
