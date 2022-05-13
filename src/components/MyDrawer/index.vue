<template>
  <n-drawer v-model:show="visibleDrawer" :width="width" v-bind="$attrs">
    <n-drawer-content :title="$attrs.title">
      <slot></slot>
      <template #footer>
        <slot name="footer">
          <div class="w-full flex justify-around">
            <n-button
              type="primary"
              :loading="$attrs.loading"
              @click="$_handleConfirm"
              class="flex-auto mx-1"
            >
              {{ $t("global.confirm") }}</n-button
            >
            <n-button @click="$_handleCancel" class="flex-auto mx-1">
              {{ $t("global.cancel") }}</n-button
            >
          </div>
        </slot>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
export default {
  name: "MyDrawer",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 600,
  },
});
const emit = defineEmits(["update:visible", "confirm", "cancel"]);
const visibleDrawer = computed({
  get: () => props.visible,
  set: (val) => {
    emit("update:visible", val);
  },
});
// 对外抛出 confirm事件
function $_handleConfirm() {
  emit("confirm");
}
// 对外抛出cancel事件
function $_handleCancel() {
  emit("cancel");
}
</script>
<style scoped></style>
