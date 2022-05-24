<template>
  <n-space :vertical="true">
    <n-card title="功能">
      <n-space justify="end" />
    </n-card>
    <n-card>
      <n-data-table
        :columns="columns"
        :data="allRoles"
        :pagination="paginationOptions"
        :row-key="rowKey"
        :remote="true"
      />
    </n-card>
  </n-space>
</template>

<script lang="ts">
export default {
  name: "PermissionList",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { TPermission } from "@/types/permission";
import { permissionList } from "@/api/permission";
import { t } from "@/locales";
import { paginationOptions } from "@/components/TableData";
import { NSpace } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
const allRoles: Ref<TPermission[]> = ref([]);
const getList = async () => {
  const { result } = await permissionList();
  allRoles.value = result;
};
getList();

const columns: DataTableColumns<TPermission> = [
  {
    title: t("permission.name"),
    key: "permissionName",
  },
  {
    title: t("permission.tag"),
    key: "permissionMark",
  },
  {
    title: t("permission.remark"),
    key: "permissionDesc",
  },
];
const rowKey = (row: TPermission) => row.id;
</script>

<style lang="scss" scoped></style>
