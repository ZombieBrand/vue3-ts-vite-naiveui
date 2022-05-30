import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import rt from "dayjs/plugin/relativeTime";
import { App } from "vue";
import { useI18n } from "vue-i18n";

export const dateFilter = (val: string | number, format = "YYYY-MM-DD") => {
  if (Number.isFinite(val)) {
    val = parseInt(val as string);
  }
  return dayjs(val).format(format);
};

// 相对时间
export function relativeTime(value: string | number) {
  const { locale } = useI18n();
  if (!isNaN(+value)) {
    value = typeof value === "number" ? value : parseInt(value);
  }
  return dayjs()
    .locale(locale.value === "zh" ? "zh-cn" : "en")
    .to(dayjs(value));
}
dayjs.extend(rt);
export const installFilter = (app: App) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime,
  };
};
