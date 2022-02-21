<template>
  <n-checkbox v-model:checked="autoDark">{{
    $t("global.followSystem")
  }}</n-checkbox>
  <div class="center">
    <label class="switch">
      <input type="checkbox" @click="themeSwitch" ref="themeSwitchEl" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: "ThemeSwitch",
};
</script>
<script setup lang="ts">
import { usePreferredDark } from "@vueuse/core";
import { ref, computed, watchEffect } from "vue";
import type { Ref } from "vue";
import { useAppStore } from "@/store/modules/app";
const autoDark = ref(false); //是否开启跟随系统
const isDark = usePreferredDark(); //系统黑暗主题是否开启
const appStore = useAppStore();

const darkTheme = computed(() => appStore.darkTheme); //黑暗主题状态

const themeSwitchEl: Ref<HTMLInputElement | null> = ref(null);

// 点击切换黑暗主题
const themeSwitch = () => {
  // 是否开启跟随系统
  if (!autoDark.value) {
    appStore.setDarkTheme(!darkTheme.value);
  }
};
// 开启跟随系统主题则自动设置 darkTheme状态,并且switch.disabled = true
watchEffect(() => {
  if (autoDark.value) {
    themeSwitchEl.value !== null && (themeSwitchEl.value.disabled = true);
    if (isDark.value) {
      themeSwitchEl.value !== null && (themeSwitchEl.value.checked = true);
      appStore.setDarkTheme(true);
    } else {
      themeSwitchEl.value !== null && (themeSwitchEl.value.checked = false);
      appStore.setDarkTheme(false);
    }
  } else {
    themeSwitchEl.value !== null && (themeSwitchEl.value.disabled = false);
  }
});

// 根据黑暗主题状态设置对应颜色样式
const bgColor = computed(() => (!darkTheme.value ? "#f0f0f0" : "#27173a"));
const outlineColor = computed(() => (!darkTheme.value ? "#27173a" : "#f0f0f0"));
</script>
<style lang="scss" scoped>
$backgroundColor: v-bind(bgColor);

.center {
  text-align: center;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  -webkit-tap-highlight-color: transparent;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $backgroundColor;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #ffc207;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $backgroundColor;
}

input:focus + .slider {
  box-shadow: 0 0 2px $backgroundColor;
}

input:checked + .slider:before {
  transform: translateX(26px);
  box-shadow: inset -7px 0 0 2px #ffc207;
  background-color: $backgroundColor;
}

.slider.round {
  border-radius: 17px;
  outline: 3px solid v-bind(outlineColor);
}

.slider.round:before {
  border-radius: 50%;
}
</style>
