<template>
  <div>
    <UploadExcel :onSuccess="onSuccess" />
    <n-data-table
      v-if="data.length > 0"
      :columns="columns"
      :data="data"
      :pagination="paginationOptions"
      :bordered="false"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "UserImport",
};
</script>

<script setup lang="ts">
import UploadExcel from "@/components/UploadExcel/index.vue";
import type { TExcelData } from "@/types/excel";
import { userBatchImport } from "@/api/user-manage";
import type { DataTableColumns } from "naive-ui";
import { paginationOptions } from "@/components/TableData";
import { ref } from "vue";
import type { Ref } from "vue";
import { USER_RELATIONS } from "./utils";
import { formatDate } from "@/components/UploadExcel/utils";
import type { TResults, TUserInfo } from "@/types/user-import";

const columns: any = ref([]);
const data: Ref<TUserInfo[]> = ref([]);
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async (excelData: TExcelData) => {
  try {
    const { result = {} } = await userBatchImport(excelData);
    data.value = generateData(result.results);
    const createColumns = (): DataTableColumns<string> => {
      const results = result.header;
      return results.map((item: string) => {
        return {
          title: item,
          // @ts-ignore
          key: USER_RELATIONS[item],
        };
      });
    };
    columns.value = createColumns();
    window.$message("success", "批量上传成功");
  } catch (error) {
    console.log("🚀 ~ file: index.vue ~ line 28 ~ onSuccess ~ error", error);
    window.$message("error", "批量上传失败");
  }
};

/**
 * 过滤数据转换英文
 */
function generateData(results: TResults[]) {
  const arr: TUserInfo[] = [];
  results.forEach((item) => {
    const userInfo: TUserInfo = {
      username: "",
      mobile: "",
      role: "",
      openTime: "",
    };
    Object.keys(item).forEach((keyName) => {
      // @ts-ignore
      const userInfoKey: string = USER_RELATIONS[keyName];
      if (userInfoKey === "openTime") {
         // @ts-ignore
        userInfo[userInfoKey] = formatDate(item[keyName]);
      } else {
         // @ts-ignore
        userInfo[userInfoKey] = item[keyName];
      }
    });
    arr.push(userInfo);
  });
  return arr;
}
</script>

<style lang="scss" scoped></style>
