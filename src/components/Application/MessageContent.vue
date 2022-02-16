<template>
  <slot></slot>
</template>
<script lang="ts">
import {
  useMessage,
  MessageType,
  MessageReactive,
  MessageOptions,
} from "naive-ui";
import AsyncQueue from "@/utils/asyncQueue";

/**
 * 使用说明
 *  window.$message(MessageType,显示内容,MessageOptions)
 */
export default {
  name: "MessageContent",
  setup() {
    //挂载在 window 方便与在js中使用
    const message = useMessage();
    let msgReactive: MessageReactive | null = null;
    const removeMessage = () => {
      if (msgReactive) {
        msgReactive.destroy();
        msgReactive = null;
      }
    };
    let timer: NodeJS.Timeout | null = null;
    const notifyQueue = new AsyncQueue();
    window.$message = (
      type: MessageType,
      content: string,
      options: MessageOptions = {}
    ) => {
      const duration = options.duration || 3000;
      notifyQueue
        .push(
          () => {
            if (msgReactive) {
              msgReactive.type = type;
              msgReactive.content = content;
            } else {
              options.duration = 0;
              msgReactive = message[type](content, options);
            }
          },
          duration,
          true
        )
        .finally(() => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            removeMessage();
            timer = null;
          }, duration);
          return msgReactive;
        });
    };
  },
};
</script>
