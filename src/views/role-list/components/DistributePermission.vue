<template>
  <n-drawer
    v-model:show="visible"
    v-bind="drawerOptions"
    @after-enter="drawerShow"
  >
    <n-drawer-content :title="$t('role.assignRoles')">
      <n-tree-select
        key-field="id"
        label-field="permissionName"
        multiple
        cascade
        checkable
        :loading="loading"
        :default-expand-all="true"
        :options="allPermission"
        :value="rolePermission"
        @update:value="updateRolePermission"
      />
      <template #footer>
        <n-button type="primary" @click="onConfirm">{{
          $t("global.confirm")
        }}</n-button>
        <n-button @click="onClosed">{{ $t("global.cancel") }}</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
export default {
  name: "DistributePermission",
};
</script>
<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import drawerOptions from "@/utils/naiveui/drawer";
import type { TRoleList } from "@/types/role-list";
import {
  permissionList as apiPermissionList,
  updateRolePermission as apiUpdateRolePermission,
} from "@/api/permission";
import { TPermission } from "@/types/permission";
import { rolePermission as apiRolePermission } from "@/api/role";
const props = defineProps<{
  show: boolean;
  roleInfo: TRoleList;
}>();
const visible = computed({
  get: () => props.show,
  set: (val) => {
    emit("update:show", val);
  },
});
const loading = ref(false);
const allPermission: Ref<TPermission[]> = ref([]);
const rolePermission: Ref<string[]> = ref([]);
const getPermissionList = async () => {
  const { result } = await apiPermissionList();
  allPermission.value = result;
};
const getRolePermission = async () => {
  const { result } = await apiRolePermission(props.roleInfo.id);
  rolePermission.value = result;
};

const emit = defineEmits(["update:show"]);

async function onConfirm() {
  await apiUpdateRolePermission({
    roleId: props.roleInfo.id,
    permissionId: rolePermission.value,
  });
  onClosed();
}
function onClosed() {
  emit("update:show", false);
}

const drawerShow = async () => {
  loading.value = true;
  await Promise.all([getPermissionList(), getRolePermission()]);
  loading.value = false;
};

const updateRolePermission = (value: string[]) => {
  rolePermission.value = value;
};
</script>
<style scoped></style>
