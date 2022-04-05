<template>
  <div class="user-manage-container">
    <n-space vertical>
      <n-card title="功能">
        <n-space justify="end">
          <n-button
            :strong="true"
            :secondary="true"
            type="primary"
            @click="importExcel"
          >
            {{ $t("userManage.importExcel") }}
          </n-button>
          <n-button
            :strong="true"
            :secondary="true"
            type="primary"
            @click="exportExcel"
          >
            {{ $t("userManage.exportExcel") }}
          </n-button>
        </n-space>
      </n-card>
      <n-card>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :pagination="paginationOptions"
          @update:page-size="changePageSize"
          @update:page="changePage"
        />
      </n-card>
    </n-space>
    <ExportToExcel v-model="showExport" :exportData="tableData" />
  </div>
</template>

<script lang="ts">
export default {
  name: "UserManage",
};
</script>
<script setup lang="ts">
import { ref, h, onActivated } from "vue";
import type { Ref } from "vue";
import { getUserManageList } from "@/api/user-manage";
import { useRequest } from "vue-request";
import { NButton, NAvatar, NTag, NSpace } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { User } from "@/types/userManage";
import { t } from "@/locales";
import { paginationOptions } from "@/components/TableData";
import { dateFilter } from "@/filter";
import { useRouter } from "vue-router";
import ExportToExcel from "./components/ExportToExcel.vue";
// 数据相关
const tableData: Ref<User[] | never[]> = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);
// 获取数据方法
const { run: userManageRun } = useRequest(
  getUserManageList({ page: page.value, size: size.value }),
  {
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
  }
);
userManageRun({});
onActivated(() => {
  userManageRun({});
});
const createColumns = ({
  check,
  role,
  remove,
}: {
  check: (row: User) => void;
  role: (row: User) => void;
  remove: (row: User, index: number) => void;
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
      render(row) {
        return dateFilter(row.openTime);
      },
    },
    {
      title: t("global.action"),
      key: "actions",
      render(row, index) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  type: "primary",
                  onClick: () => check(row),
                },
                { default: () => t("global.check") }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  type: "primary",
                  onClick: () => role(row),
                },
                { default: () => t("userManage.role") }
              ),
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: "small",
                  type: "error",
                  onClick: () => remove(row, index),
                },
                { default: () => t("global.remove") }
              ),
            ],
          }
        );
      },
    },
  ];
};
const columns = createColumns({
  // 查看用户详情
  check(row) {
    router.push({
      name: "UserInfo",
      params: {
        id: row.id,
      },
    });
  },
  role(row) {
    console.log(row);
  },
  remove(row, index) {
    tableData.value.splice(index, 1);
  },
});

function changePageSize(pageSize: number) {
  size.value = pageSize;
}
function changePage(pageNum: number) {
  page.value = pageNum;
}

const router = useRouter();
function importExcel() {
  router.push({ name: "UserImport" });
}
const showExport = ref(false);
function exportExcel() {
  showExport.value = true;
}
</script>

<style lang="scss" scoped></style>
