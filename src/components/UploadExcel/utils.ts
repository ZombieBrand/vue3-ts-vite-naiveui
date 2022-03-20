import * as XLSX from "xlsx";
import type { WorkSheet } from "xlsx";
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = (sheet: WorkSheet) => {
  const headers = [];
  const range = XLSX.utils.decode_range(<string>sheet["!ref"]);
  let C;
  const R = range.s.r;
  /* 从第一行开始 */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* 走遍范围内的每一列 */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    /* 找到第一行中的单元格 */
    let hdr = "UNKNOWN " + C; // <-- 用所需的默认值替换
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
};

export const isExcel = (file: File) => {
  return /\.(xlsx|xls|csv)$/.test(file.name);
};

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb: number) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1);
  console.dir(time);
  // @ts-ignore
  time.setYear(time.getFullYear() - 70);
  const year = time.getFullYear() + "";
  const month = time.getMonth() + 1 + "";
  const date = time.getDate() - 1 + "";
  return (
    year +
    "-" +
    (+month < 10 ? "0" + month : month) +
    "-" +
    (+date < 10 ? "0" + date : date)
  );
};
