<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <n-button
        :strong="true"
        :secondary="true"
        :loading="loading"
        type="primary"
        @click="handleUpload"
      >
        {{ $t("uploadExcel.upload") }}
      </n-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t("uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UploadExcel",
};
</script>
<script setup lang="ts">
import * as XLSX from "xlsx";
import { Ref, ref } from "vue";
import { getHeaderRow, isExcel } from "./utils";
import type { TExcelData } from "@/types/excel";

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function,
});

/**
 * 点击上传触发
 */
const loading = ref(false);
const excelUploadInput: Ref<HTMLInputElement | null> = ref(null);
const handleUpload = () => {
  excelUploadInput.value?.click();
};
const handleChange = (e: Event) => {
  const _target = e.target as HTMLInputElement;
  const rawFile = _target.files?.[0];
  rawFile && upload(rawFile);
};

/**
 * 拖拽上传
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
 */
const handleDragover = (e: DragEvent) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  e.dataTransfer && (e.dataTransfer.dropEffect = "copy");
};
const handleDrop = (e: DragEvent) => {
  if (!loading.value) {
    const files = e.dataTransfer?.files;
    if (files && files.length !== 1) {
      window.$message("warning", "必须要有一个文件");
      return;
    }
    const rawFile = files?.[0];
    // 检查格式后上传
    if (rawFile) {
      if (isExcel(rawFile)) {
        upload(rawFile);
      } else {
        window.$message("error", "文件必须是,.xlsx,xls,.csv 格式");
      }
    }
  }
};
/**
 * 触发上传事件
 */
const upload = (rawFile: File) => {
  if (excelUploadInput.value) {
    excelUploadInput.value.value = "";
  }
  // 没有指定上传前回调
  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  // 指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile);
  if (before) {
    readerData(rawFile);
  }
};

/**
 * 读取数据（异步）
 */
const readerData = (rawFile: File) => {
  loading.value = true;
  return new Promise<void>((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    const reader = new FileReader();
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target?.result;
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" });
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0];
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName];
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet);
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet);
      // 7. 传入解析之后的数据
      generateData({ header, results });
      // 8. loading 处理
      loading.value = false;
      // 9. 异步完成
      resolve();
    };
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile);
  });
};

/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData: TExcelData) => {
  props.onSuccess && props.onSuccess(excelData);
};
</script>
<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
