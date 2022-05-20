<template>
  <n-space vertical>
    <n-card title="功能">
      <n-space justify="end" />
    </n-card>
    <n-card>
      <n-data-table
        :columns="columns"
        :data="allRoles"
        :pagination="paginationOptions"
      />
    </n-card>
  </n-space>
</template>

<script lang="ts">
export default {
  name: "RoleList",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { TRoleList } from "@/types/role-list";
import { roleList } from "@/api/role";
import { t } from "@/locales";
import { paginationOptions } from "@/components/TableData";
const allRoles: Ref<TRoleList[]> = ref([]);
const getRoleList = async () => {
  const { result } = await roleList();
  allRoles.value = result;
};
getRoleList();

const createColumns = () => {
  return [
    {
      title: t("role.title"),
      key: "title",
    },
    {
      title: t("role.describe"),
      key: "describe",
    },
  ];
};
const columns = createColumns();
</script>

<style lang="scss" scoped></style>
