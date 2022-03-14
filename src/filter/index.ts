import dayjs from "dayjs";

const dateFilter = (val: string, format = "YYYY-MM-DD") => {
  if (Number.isFinite(val)) {
    val = parseInt(val);
  }
  return dayjs(val).format(format);
};

export default (app) => {
  app.config.globalProperties.$filters = {};
};
