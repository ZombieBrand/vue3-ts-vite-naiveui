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
import { reactive, ref,computed } from "vue";
import { useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import {getUserInfo} from "@/api/user";

getUserInfo({test:1}).then(res=>{
  console.log(res)
}).catch(error=>{
  console.log(error)
})

const { t } = useI18n();
const formRef = ref();
const message = useMessage();
const loginData = reactive({
  userName: "",
  password: "",
});
const rules = ref({
  userName: {
    required: true,
    message: computed(()=>t("placeholder.userName")),
    trigger: "blur",
  },
  password: [
    {
      required: true,
      message: computed(()=>t("placeholder.password")),
      trigger: ["input", "blur"],
    },
    {
      min: 6,
      message: computed(()=>t("placeholder.minLength",{len:6})),
      trigger: ["input", "blur"],
    },
  ],
})

const loginSubmit = () => {
  formRef.value.validate((errors: any) => {
    if (!errors) {
      message.success("Valid");
    } else {
      console.log(errors);
      message.error("Invalid");
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
