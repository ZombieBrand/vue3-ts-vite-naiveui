<template>
  <n-drawer
    v-model:show="show"
    v-bind="drawerOptions"
    @after-enter="drawerShow"
  >
    <n-drawer-content :title="$t('role.assignRoles')">
      <n-checkbox-group v-model:value="userRoleList">
        <n-space item-style="display: flex;">
          <n-checkbox
            v-for="item of allRoles"
            :value="item.id"
            :label="item.title"
          />
        </n-space>
      </n-checkbox-group>
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
  name: "Roles",
};
</script>
<script setup lang="ts">
import { Ref, ref } from "vue";
import drawerOptions from "@/utils/naiveui/drawer";
import type { User } from "@/types/userManage";
import { roleList } from "@/api/role";
import { TRoleList } from "@/types/role-list";
import { updateRole } from "@/api/user-manage";
const props = defineProps<{
  show: boolean;
  roleData: User;
}>();

const emit = defineEmits(["update:show"]);
const allRoles: Ref<TRoleList[]> = ref([]);

async function onConfirm() {
  const result = await updateRole({
    id: props.roleData.id,
    roleId: userRoleList.value ?? [],
  });
  onClosed();
}
function onClosed() {
  emit("update:show", false);
}

// 所有角色
const getRoleList = async () => {
  const { result } = await roleList();
  allRoles.value = result;
  userRoleList.value = props.roleData.role.map((item) => item.id);
};

const drawerShow = () => {
  getRoleList();
};

// 当前用户角色
const userRoleList: Ref<string[] | null> = ref(null);
</script>
<style scoped></style>
