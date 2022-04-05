<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
      <div class="w-40">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ $t("userInfo.title") }}
        </h3>
      </div>
      <n-button type="primary" :loading="printLoading" v-print="printObj">
        <template #icon>
          <n-icon>
            <Print />
          </n-icon>
        </template>
        {{ $t("userInfo.print") }}
      </n-button>
    </div>
    <div class="border-t border-gray-200" id="printBox">
      <dl>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userManage.avatar") }}</dt>
          <dd class="describe-content">
            <n-image height="50" width="50" :src="detailData.avatar" />
          </dd>
        </div>

        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.name") }}</dt>
          <dd class="describe-content">{{ detailData.username }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.sex") }}</dt>
          <dd class="describe-content">{{ detailData.gender }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.nation") }}</dt>
          <dd class="describe-content">{{ detailData.nationality }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.mobile") }}</dt>
          <dd class="describe-content">{{ detailData.mobile }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.address") }}</dt>
          <dd class="describe-content">{{ detailData.address }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.date") }}</dt>
          <dd class="describe-content">{{ detailData.openTime }}</dd>
        </div>
        <div class="describe-item">
          <dt class="describe-title">{{ $t("userInfo.remark") }}</dt>
          <dd class="describe-content">
            <n-space>
              <n-tag
                v-for="item of detailData.remark"
                :key="item"
                type="info"
                >{{ item }}</n-tag
              >
            </n-space>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserInfo",
};
</script>

<script setup lang="ts">
import type { TUserDetailData } from "@/types/api/user";
import { ref, Ref } from "vue";
import { useRequest } from "vue-request";
import { getUserDetail } from "@/api/user-manage";
import { Print } from "@vicons/ionicons5";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const detailData: Ref<TUserDetailData> = ref({
  role: [],
  remark: [],
  experience: [],
  id: "",
  openTime: "",
  username: "",
  title: "",
  mobile: "",
  avatar: "",
  gender: "",
  nationality: "",
  address: "",
  major: "",
  glory: "",
});

// 获取数据方法
const { run: runGetUserDetail } = useRequest(getUserDetail(props.id), {
  onSuccess: (res) => {
    detailData.value = res.result;
  },
  onError: (error) => {
    console.log(error);
  },
});
runGetUserDetail();

// 打印
const printLoading = ref(false);
const printObj = {
  // 打印的区域
  id: "printBox",
  // 打印的标题
  popTitle: "员工信息",
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true;
  },
  // 执行了打印
  openCallback() {
    printLoading.value = false;
  },
};
</script>

<style scoped>
.describe-item {
  @apply px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
}
.describe-item:nth-child(odd) {
  @apply bg-gray-50;
}
.describe-item:nth-child(even) {
  @apply bg-white;
}
.describe-title {
  @apply text-sm font-medium text-gray-500 flex items-center;
}
.describe-content {
  @apply mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2;
}
</style>
