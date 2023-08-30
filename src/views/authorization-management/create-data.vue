<template>
  <n-modal v-model:show="_visible" preset="dialog" title="Dialog">
    <template #header>
      <div>新增授权</div>
    </template>
    <div>
      <n-upload
        v-if="uploadKey"
        ref="uploadRef"
        :headers="headers"
        directory-dnd
        :action="uploadUrl"
        :default-upload="false"
        v-model:file-list="fileList"
        @finish="uploadFinish"
        @error="uploadError"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px"> 请上传申请授权文件 </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            点击或者拖动文件到该区域来上传
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </div>
    <template #action>
      <div class="w-full flex justify-around">
        <n-button
          :disabled="fileList.length !== 1"
          type="primary"
          :loading="submitLoading"
          @click="$_handleConfirm"
          class="flex-auto mx-1"
        >
          {{ $t("global.confirm") }}</n-button
        >
        <n-button @click="$_handleCancel" class="flex-auto mx-1">
          {{ $t("global.cancel") }}</n-button
        >
      </div>
    </template>
  </n-modal>
</template>
<script lang="ts">
import { computed, ref, watch, nextTick } from "vue";

export default {
  name: "CreateData",
};
</script>
<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { TOKEN } from "@/constant";
import { getItem } from "@/utils/storage";
import { UploadInst } from "naive-ui";
import { useNotification } from "naive-ui";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const notification = useNotification();
const uploadRef = ref<UploadInst | null>(null);
const fileList = ref([]);
const submitLoading = ref(false);
const uploadKey = ref(true);
const emit = defineEmits(["update:visible", "confirm", "cancel"]);
const _visible = computed({
  get: () => props.visible,
  set: (val) => {
    emit("update:visible", val);
  },
});
watch(
  () => props.visible,
  () => {
    fileList.value = [];
  }
);
// 对外抛出 confirm事件
function $_handleConfirm() {
  submitLoading.value = true;
  uploadRef.value?.submit();
}
// 对外抛出cancel事件
function $_handleCancel() {
  emit("cancel");
}
function uploadFinish(options: any) {
  notification.success({
    content: "上传授权文件成功!",
  });
  console.log(options, "uploadFinish");
  submitLoading.value = false;
  $_handleCancel();
}
function uploadError(options: any) {
  const reponse = JSON.parse(options.event.target.response);
  notification.error({
    content: "上传授权文件失败! " + reponse.message,
  });
  console.log(options, "uploadError");
  submitLoading.value = false;
  uploadKey.value = false;
  nextTick(() => {
    fileList.value = [];
    uploadKey.value = true;
  });
}
const uploadUrl =
  import.meta.env.VITE_APP_WEB_URL +
  import.meta.env.VITE_APP_BASE_API +
  "/licenses/upload";
const headers = {
  Authorization: "Bearer " + getItem(TOKEN),
};
</script>

<style scoped>
::v-deep(.n-upload-trigger) {
  width: 100%;
}
</style>
