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
