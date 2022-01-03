<template>
  <n-loading-bar-provider>
    <LoadingContent></LoadingContent>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <MessageContent></MessageContent>
          <slot slot="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
export default {
  name: "Application",
};
</script>
<script setup lang="ts">
import LoadingContent from "@/components/Application/LoadingContent.vue";
import MessageContent from "@/components/Application/MessageContent.vue";
</script>
