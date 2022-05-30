<template>
  <div>
    <n-space :vertical="true">
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
    <DistributePermission
      v-model:show="showPermission"
      :roleInfo="selectRoleInfo"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "RoleList",
};
</script>
<script setup lang="ts">
import { ref, h, withDirectives } from "vue";
import type { Ref } from "vue";
import type { TRoleList } from "@/types/role-list";
import { roleList } from "@/api/role";
import { t } from "@/locales";
import { paginationOptions } from "@/components/TableData";
import { NButton, NSpace } from "naive-ui";
import DistributePermission from "@/views/role-list/components/DistributePermission.vue";
import { permissionDirective } from "@/hooks/useDirectives";
const allRoles: Ref<TRoleList[]> = ref([]);
const getRoleList = async () => {
  const { result } = await roleList();
  allRoles.value = result;
};
getRoleList();

const createColumns = ({
  assignPermissions,
}: {
  assignPermissions: (row: TRoleList) => void;
}) => {
  return [
    {
      title: t("role.title"),
      key: "title",
    },
    {
      title: t("role.describe"),
      key: "describe",
    },
    {
      title: t("global.action"),
      key: "actions",
      render(row: TRoleList) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              withDirectives(
                h(
                  NButton,
                  {
                    size: "small",
                    type: "primary",
                    onClick: () => assignPermissions(row),
                  },
                  { default: () => t("role.assignPermissions") }
                ),
                [[permissionDirective(), ["distributePermission"]]]
              ),
            ],
          }
        );
      },
    },
  ];
};
const columns = createColumns({
  assignPermissions(row) {
    showPermission.value = true;
    selectRoleInfo.value = row;
  },
});

const showPermission = ref(false);
const selectRoleInfo: Ref<TRoleList> = ref({
  id: "",
  title: "",
  describe: "",
});
</script>

<style lang="scss" scoped></style>
