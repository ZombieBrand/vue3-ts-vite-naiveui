<template>
  <div class="user-manage-container">
    <n-space vertical>
      <n-card title="功能">
        <n-space justify="end">
          <n-button type="primary" @click="createVisible = true">
            {{ $t("license.addLicense") }}
          </n-button>
        </n-space>
      </n-card>
      <n-card>
        <n-data-table
          remote
          ref="table"
          :columns="columns"
          :loading="loading"
          :pagination="pagination"
          :row-key="(rowData) => rowData.id"
          :data="tableData"
        />
      </n-card>
    </n-space>
    <MyDrawer
      :title="textMap[dialogStatus]"
      :loading="submitLoading"
      v-model:visible="editVisible"
      @cancel="editVisible = false"
      @confirm="handleConfirm"
    >
      <n-form
        ref="formRef"
        label-width="auto"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item label="公司名称" path="company">
          <n-input v-model:value="formValue.company" />
        </n-form-item>
        <n-form-item label="产品型号" path="model">
          <n-input v-model:value="formValue.model" />
        </n-form-item>
        <n-form-item label="mac地址" path="macAddress">
          <n-input v-model:value="formValue.macAddress" />
        </n-form-item>
        <n-form-item label="管理设备数量" path="manageDeviceNum">
          <n-input-number
            v-model:value="formValue.manageDeviceNum"
            class="w-full"
            clearable
          />
        </n-form-item>
        <n-form-item label="CPUID" path="CPUID">
          <n-input v-model:value="formValue.CPUID" />
        </n-form-item>
        <n-form-item label="申请时间" path="applyTime">
          <n-date-picker
            class="w-full"
            v-model:value="formValue.applyTime"
            value-format="yyyy-MM-dd"
            clearable
          />
        </n-form-item>
        <n-form-item label="到期时间" path="deadline">
          <n-date-picker
            class="w-full"
            v-model:value="formValue.deadline"
            value-format="yyyy-MM-dd"
            clearable
          />
        </n-form-item>
        <n-form-item label="手机号码" path="telphone">
          <n-input v-model:value="formValue.telphone" type="text" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input v-model:value="formValue.address" type="text" />
        </n-form-item>
        <n-form-item label="备注" path="reason">
          <n-input v-model:value="formValue.reason" type="textarea" />
        </n-form-item>
      </n-form>
    </MyDrawer>
    <CreateData v-model:visible="createVisible" @cancel="createCancel" />
  </div>
</template>

<script lang="ts">
export default {
  name: "AuthorizationManagement",
};
</script>
<script setup lang="ts">
import { ref, h, onActivated, reactive } from "vue";
import type { Ref } from "vue";
import { DataTableColumns, FormInst } from "naive-ui";
import type { TLicense } from "@/types/license";
import {
  getLicenseData,
  removeLicense,
  updateLicense,
  downloadLicense,
} from "@/api/license";
import { NButton, NSpace } from "naive-ui";
import { t } from "@/locales";
import { dateFilter } from "@/filter";
import MyDrawer from "@/components/MyDrawer/index.vue";
import CreateData from "./create-data.vue";
import { saveAs } from "file-saver";
// 数据相关
const tableData: Ref<TLicense[] | never[]> = ref([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  itemCount: 0,
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    getData(pagination.page);
  },
  onUpdatePage: (currentPage: number) => {
    pagination.page = currentPage;
    getData(pagination.page);
  },
});
const editVisible = ref(false);
const submitLoading = ref(false);
const createVisible = ref(false);
interface TTextMap {
  [key: string]: string;
}
const textMap: TTextMap = reactive({
  update: "编辑授权",
  create: "新增授权",
});
const dialogStatus: Ref<string> = ref("create");

onActivated(() => {
  getData(pagination.page);
});
// 获取数据方法
async function getData(currentPage: number) {
  loading.value = true;
  try {
    const result = await getLicenseData({
      page: currentPage,
      size: pagination.pageSize,
    });
    const {
      data: { list, count },
    } = result;
    tableData.value = list;
    pagination.itemCount = count;
  } catch (error) {
    console.log(error, "getData");
  } finally {
    loading.value = false;
  }
}
// table数据
const createColumns = ({
  edit,
  remove,
  download,
}: {
  edit: (row: TLicense) => void;
  remove: (row: TLicense, index: number) => void;
  download: (row: TLicense) => void;
}): DataTableColumns<TLicense> => {
  return [
    {
      title: t("license.company"),
      key: "company",
      minWidth: 110,
    },
    {
      title: t("license.model"),
      key: "model",
      minWidth: 100,
    },
    {
      title: t("license.macAddress"),
      key: "macAddress",
      minWidth: 170,
    },
    {
      title: t("license.manageDeviceNum"),
      key: "manageDeviceNum",
      minWidth: 110,
    },
    {
      title: t("license.CPUID"),
      key: "CPUID",
      minWidth: 320,
    },
    {
      title: t("license.applyTime"),
      key: "applyTime",
      minWidth: 110,
      render(row) {
        return dateFilter(row.applyTime as string);
      },
    },
    {
      title: t("license.deadline"),
      key: "deadline",
      minWidth: 110,
      render(row) {
        return dateFilter(row.deadline as string);
      },
    },
    {
      title: "手机号码",
      key: "telphone",
      minWidth: 120,
    },
    {
      title: "地址",
      key: "address",
      minWidth: 110,
    },
    {
      title: "备注",
      key: "reason",
      minWidth: 100,
    },
    {
      title: t("global.action"),
      key: "actions",
      width: 240,
      render(row, index) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  size: "small",
                  type: "primary",
                  onClick: () => edit(row),
                },
                { default: () => t("global.edit") }
              ),
              h(
                NButton,
                {
                  size: "small",
                  type: "error",
                  onClick: () => remove(row, index),
                },
                { default: () => t("global.remove") }
              ),
              h(
                NButton,
                {
                  size: "small",
                  type: "info",
                  onClick: () => download(row),
                },
                { default: () => "下载授权" }
              ),
            ],
          }
        );
      },
    },
  ];
};

// table操作
const columns = createColumns({
  edit(row) {
    dialogStatus.value = "update";
    formValueReset(row);
    editVisible.value = true;
  },
  async remove(row) {
    const { id } = row;
    try {
      await removeLicense(id as string);
      window.$message("success", "删除成功");
    } catch (error) {
      console.log(error);
      window.$message("error", "删除失败");
    } finally {
      getData(pagination.page);
    }
  },
  async download(row) {
    const { id } = row;
    try {
      const result = await downloadLicense(id as string);
      var blob = new Blob([result.data], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "authorization.txt");
      window.$message("success", "授权文件下载成功!");
    } catch (error: any) {
      console.log(error);
      window.$message("error", "授权文件下载失败!");
    }
  },
});

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  id: "",
  company: "",
  model: "",
  macAddress: "",
  manageDeviceNum: 0,
  CPUID: "",
  applyTime: null,
  deadline: null,
  telphone: "",
  address: "",
  reason: "",
});
const rules = {
  company: {
    required: true,
    message: "请输入公司名称",
    trigger: ["input", "blur"],
  },
  model: {
    required: true,
    message: "请输入产品型号",
    trigger: ["input", "blur"],
  },
  macAddress: {
    required: true,
    message: "请输入mac地址",
    trigger: ["input", "blur"],
  },
  manageDeviceNum: {
    required: true,
    type: "number",
    message: "请输入管理设备数量",
    trigger: ["input", "blur"],
  },
  CPUID: {
    required: true,
    message: "请输入CPUID",
    trigger: ["input", "blur"],
  },
  applyTime: {
    required: true,
    type: "number",
    message: "请选择申请日期",
    trigger: ["input", "blur"],
  },
  deadline: {
    required: true,
    type: "number",
    message: "请输入到期日期",
    trigger: ["input", "blur"],
  },
};
function handleConfirm() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      submitLoading.value = true;
      updateLicense(formValue.value.id, formValue.value)
        .then(() => {
          window.$message("success", "修改成功");
          submitLoading.value = false;
          editVisible.value = false;
          getData(pagination.page);
        })
        .catch((error) => {
          console.log(error);
          window.$message("error", "修改失败!");
          submitLoading.value = false;
        });
    } else {
      console.log(errors);
    }
  });
}
function formValueReset(row: TLicense | undefined = undefined) {
  formValue.value = {
    id: "",
    company: "",
    model: "",
    macAddress: "",
    manageDeviceNum: 0,
    CPUID: "",
    applyTime: null,
    deadline: null,
    telphone: "",
    address: "",
    reason: "",
  };
  if (row) {
    formValue.value = JSON.parse(JSON.stringify(row));
    //@ts-ignore
    formValue.value.applyTime = new Date(row.applyTime).getTime();
    //@ts-ignore
    formValue.value.deadline = new Date(row.deadline).getTime();
  }
}
function createCancel() {
  createVisible.value = false;
  getData(pagination.page);
}
</script>

<style lang="scss" scoped></style>
