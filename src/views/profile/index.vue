<template>
  <div class="my-container">
    <n-grid :x-gap="12" :cols="4">
      <n-gi :span="1">
        <ProjectCard :features="features"></ProjectCard>
      </n-gi>
      <n-gi :span="3">
        <n-card style="margin-bottom: 16px">
          <feature :features="features"/>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
export default {
  name: "Profile",
};
</script>
<script lang="ts" setup>
import { useRequest } from "vue-request";
import { feature } from "@/api/user";
import ProjectCard from "./components/ProjectCard.vue";
import Feature from "./components/Feature.vue";
import { computed } from "vue";
const {
  run: featureRun,
  data: featureData,
  loading: featureLoading,
} = useRequest(feature);

// @ts-ignore
const features = computed(()=> featureData.value ? featureData.value['result']: [])
featureRun();
</script>
<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
