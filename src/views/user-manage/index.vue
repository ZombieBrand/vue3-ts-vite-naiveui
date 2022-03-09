<template>
  <div class="user-manage-container">
    <n-card title="功能">
      <n-space justify="end">
        <n-button :strong="true" :secondary="true" type="primary">
          {{ $t("userManage.importExcel") }}
        </n-button>
        <n-button :strong="true" :secondary="true" type="primary">
          {{ $t("userManage.exportExcel") }}
        </n-button>
      </n-space>
    </n-card>
    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="true"
        :bordered="false"
      />
    </n-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserManage",
};
</script>
<script setup lang="ts">
import { ref, h } from "vue";
import type { Ref } from "vue";
import { getUserManageList } from "@/api/user-manage";
import { useRequest } from "vue-request";
import { NButton, NAvatar, NTag } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { User } from "@/types/userManage";
import { t } from "@/locales";
// 数据相关
const tableData: Ref<User | never[]> = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(0);
// 获取数据方法
const { run: userManageRun } = useRequest(getUserManageList, {
  onSuccess: (data) => {
    const {
      result: { list, page: _page, size: _size, total: _total },
    } = data;
    tableData.value = list;
    total.value = _total;
    page.value = _size;
    size.value = _page;
  },
  onError: (error) => {
    console.log(error);
  },
});
userManageRun({});

const createColumns = ({
  check,
  role,
  remove,
}: {
  check: (row: User) => void;
  role: (row: User) => void;
  remove: (row: User) => void;
}): DataTableColumns<User> => {
  return [
    {
      title: t("userManage.username"),
      key: "username",
    },
    {
      title: t("userManage.avatar"),
      key: "avatar",
      render(row) {
        return h(NAvatar, {
          size: "small",
          src: row.avatar,
        });
      },
    },
    {
      title: t("userManage.contact"),
      key: "mobile",
    },
    {
      title: t("userManage.role"),
      key: "role",
      render(row) {
        return row.role.map((item) => {
          return h(
            NTag,
            {
              type: "info",
            },
            {
              default: () => {
                return item.title;
              },
            }
          );
        });
      },
    },
    {
      title: t("userManage.openTime"),
      key: "openTime",
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => check(row),
            },
            { default: () => t('global.check') }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => role(row),
            },
            { default: () =>  t('userManage.role') }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: "small",
              onClick: () => remove(row),
            },
            { default: () => t('global.remove') }
          ),
        ];
      },
    },
  ];
};
const columns = createColumns({
  check(row) {
    console.log(row);
  },
  role(row) {
    console.log(row);
  },
  remove(row) {
    console.log(row);
  },
});
</script>

<style lang="scss" scoped></style>
