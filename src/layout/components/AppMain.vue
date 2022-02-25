<template>
  <n-layout :embedded="true" content-style="padding: 12px;">
    <TagsView class="absolute top-0 left-0" />
    <router-view v-slot="{ Component }">
      <transition name="zoom-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </n-layout>
</template>

<script lang="ts">
export default {
  name: "AppMain",
};
</script>

<script lang="ts" setup>
import TagsView from "@/components/TagsView.vue";

</script>
