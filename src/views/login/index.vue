<template>
  <div
    class="bg-gray-200 min-h-screen font-sans flex flex-col justify-center items-center"
  >
    <div class="max-w-lg mx-auto px-6 h-3/6 w-3/6 relative -top-24">
      <h2
        class="tracking-widest text-xl text-center font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl"
      >
        管理平台
      </h2>
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="mt-6">
            <n-form class="mt-8" :model="loginData" size="large" ref="formRef">
              <n-form-item label="用户名" path="userName">
                <n-input
                  v-model:value="loginData.userName"
                  placeholder="请输入用户名"
                />
              </n-form-item>
              <n-form-item label="密码" path="password" class="relative">
                <n-input
                  v-model:value="loginData.password"
                  :type="showPwd ? 'text' : 'password'"
                  placeholder="请输入密码"
                  @keydown.enter.prevent
                />
                <span
                  class="show-pwd absolute right-0 h-8 cursor-pointer"
                  @click="switchShowPwd"
                >
                  <n-icon size="32" color="#4B5563">
                    <eye-off-outline v-show="!showPwd" />
                    <eye-outline v-show="showPwd" />
                  </n-icon>
                </span>
              </n-form-item>
              <n-form-item>
                <n-button
                  @click="loginSubmit"
                  attr-type="submit"
                  size="large"
                  strong
                  secondary
                  class="w-full"
                  >登录</n-button
                >
              </n-form-item>
            </n-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import { reactive, ref } from "vue";
const loginData = reactive({
  userName: "",
  password: "",
});

const loginSubmit = () => {
  console.log(1);
};
const showPwd = ref(false);
const switchShowPwd = () => {
  showPwd.value = !showPwd.value;
};
</script>
<script lang="ts">
export default {
  name: "Login",
};
</script>
<style scoped lang="scss"></style>
