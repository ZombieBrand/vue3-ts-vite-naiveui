import dayjs from "dayjs";
import { App } from "vue";
export const dateFilter = (val: string | number, format = "YYYY-MM-DD") => {
  if (Number.isFinite(val)) {
    val = parseInt(val as string);
  }
  return dayjs(new Date(val)).format(format);
};
export const installFilter = (app: App) => {
  app.config.globalProperties.$filters = {
    dateFilter,
  };
};
