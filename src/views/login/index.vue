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
              <n-form-item :label="$t('user.username')" path="username">
                <n-input
                  v-model:value="loginData.username"
                  :placeholder="$t('placeholder.username')"
                />
              </n-form-item>
              <n-form-item
                :label="$t('user.password')"
                path="password"
                class="relative"
              >
                <n-input
                  v-model:value="loginData.password"
                  type="password"
                  :placeholder="$t('placeholder.password')"
                  @keydown.enter.prevent
                />
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
import { reactive, ref, computed,onMounted } from "vue";
import { useI18n } from "vue-i18n";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import { useUserStore } from "@/store/modules/user";
import {removeAllItem} from "@/utils/storage";
const userStore = useUserStore();
const { t } = useI18n();
const formRef = ref();
const loginData = reactive({
  username: "",
  password: "",
});
const rules = ref({
  username: {
    required: true,
    message: computed(() => t("placeholder.username")),
    trigger: "blur",
  },
  password: [
    {
      required: true,
      message: computed(() => t("placeholder.password")),
      trigger: ["input", "blur"],
    },
    {
      min: 6,
      message: computed(() => t("placeholder.minLength", { len: 6 })),
      trigger: ["input", "blur"],
    },
  ],
});
onMounted(()=>{
  removeAllItem()
})
// 登录动作
const loginSubmit = () => {
  formRef.value.validate(async (errors: boolean) => {
    if (!errors) {
      try {
        await userStore.login(loginData);
        window.$message('success',`${t("message.user.successLogin")}`)
      } catch (e) {
        console.log(e)
        window.$message('error',`${t("message.user.errorLogin")}`)
      }
    } else {
      console.log(errors);
    }
  });
};
</script>
<script lang="ts">
export default {
  name: "Login",
};
</script>
<style scoped lang="scss"></style>
