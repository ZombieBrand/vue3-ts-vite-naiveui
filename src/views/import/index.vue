<template>
  <div>
    <UploadExcel :onSuccess="onSuccess"></UploadExcel>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="paginationOptions"
      :bordered="false"
    />
  </div>
</template>

<script setup lang="ts">
import UploadExcel from "@/components/UploadExcel/index.vue";
import type { TExcelData } from "@/types/excel";
import { useRequest } from "vue-request";
import { userBatchImport } from "@/api/user-manage";
import type { DataTableColumns } from "naive-ui";
import { paginationOptions } from "@/components/TableData";
import { ref } from "vue";
const { run, data } = useRequest(userBatchImport);
const columns: any = ref([]);
/**
 * 数据解析成功之后的回调
 */
const onSuccess = (excelData: TExcelData) => {
  run(excelData);
  const createColumns = (): DataTableColumns<string> => {
    const header = data.value.header;
    return header.map((item: string) => {
      return {
        title: item,
        key: item,
      };
    });
  };
  columns.value = createColumns();
};
</script>

<style lang="scss" scoped></style>
