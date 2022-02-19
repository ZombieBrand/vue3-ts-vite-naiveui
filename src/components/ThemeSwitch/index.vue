<template>
  <div class="center">
    <label class="switch">
      <input type="checkbox" @click="themeSwitch" />
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
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const darkTheme = computed(() => appStore.darkTheme);
const themeSwitch = () => {
  appStore.setDarkTheme(!darkTheme.value);
};
const bgColor = computed(() => (darkTheme.value ? "#f0f0f0" : "#27173a"));
const outlineColor = computed(() => (darkTheme.value ? "#27173a" : "#f0f0f0"));
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
