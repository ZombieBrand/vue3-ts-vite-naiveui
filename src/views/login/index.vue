<template>
  <div
    class="bg-gray-200 min-h-screen font-sans flex flex-col justify-center items-center"
  >
    <div class="max-w-lg mx-auto px-6 h-3/6 w-3/6 relative -top-24">
      <h2
        class="tracking-widest text-xl text-center font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl"
      >
        {{ $t("login.title") }}
      </h2>
      <div class="relative flex flex-wrap">
        <div class="w-full relative">
          <div class="mt-6">
            <n-form
              class="mt-8"
              :model="loginData"
              size="large"
              ref="formRef"
              :rules="rules"
            >
              <n-form-item :label="$t('user.userName')" path="userName">
                <n-input
                  v-model:value="loginData.userName"
                  :placeholder="$t('placeholder.userName')"
                />
              </n-form-item>
              <n-form-item
                :label="$t('user.password')"
                path="password"
                class="relative"
              >
                <n-input
                  v-model:value="loginData.password"
                  :type="showPwd ? 'text' : 'password'"
                  :placeholder="$t('placeholder.password')"
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
                  >{{ $t("login.logIn") }}</n-button
                >
              </n-form-item>
            </n-form>
            <switch-language />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import SwitchLanguage from "@/components/SwitchLanguage.vue";

const { t } = useI18n();
const formRef = ref(null);
const loginData = reactive({
  userName: "",
  password: "",
});

const rules = {
  userName: {
    required: true,
    message: t("placeholder.userName"),
    trigger: "blur",
  },
  password: {
    required: true,
    message: t("placeholder.password"),
    trigger: ["input", "blur"],
  },
};
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
