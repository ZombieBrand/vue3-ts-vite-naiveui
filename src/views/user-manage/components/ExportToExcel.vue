<template>
  <n-modal
    v-model:show="showValue"
    preset="dialog"
    :title="$t('exportExcel.title')"
    positive-text="确认"
    negative-text="取消"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  >
    <n-input v-model:value="excelName" type="text" />
  </n-modal>
</template>

<script lang="ts">
export default {
  name: "ExportToExcel",
};
</script>
<script setup lang="ts">
import { ref, computed } from "vue";
import { t } from "@/locales";
import { USER_RELATIONS } from "./ExportToExcelConstant";
import type { User } from "@/types/userManage";
import { dateFilter } from "@/filter";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  exportData: {
    type: Array,
    default: () => [],
    required: true,
  },
});
const emits = defineEmits(["update:modelValue"]);
const showValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    console.log(value);
    emits("update:modelValue", value);
  },
});
const exportDefaultName = t("exportExcel.defaultName");
const excelName = ref(exportDefaultName);
const cancelCallback = () => {
  emits("update:modelValue", false);
};
const submitCallback = async () => {
  try {
    const excel = await import("@/utils/Export2Excel");
    const data = formatJson(USER_RELATIONS, props.exportData as User[]);
    excel.export_json_to_excel({
      header: Object.keys(USER_RELATIONS),
      data,
      filename: excelName.value || exportDefaultName,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: ExportToExcel.vue ~ line 45 ~ submitCallback ~ error",
      error
    );
  }
};

/**
 * @param rows 必须转化二维数组 [[张三,管理员],[李四,操作员]] 必须都是字符串不能出现其他数据类型格式
 * @param headers 导出excel文件转换成中文的头信息
 */
function formatJson(headers: any, rows: User[]) {
  return rows.map((item) => {
    return Object.keys(headers).map((keyName) => {
      if (headers[keyName] === "role") {
        // @ts-ignore
        const roles = item[headers[keyName]];
        return JSON.stringify(
          roles.map((role: { id: string; title: string }) => role.title)
        );
      }

      // 时间
      // @ts-ignore
      if (headers[keyName] === "openTime") {
        // @ts-ignore
        return dateFilter(item[headers[keyName]]);
      }

      // @ts-ignore
      return item[headers[keyName]];
    });
  });
}
</script>
