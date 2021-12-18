import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "./index.css";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
createApp(App).use(createPinia()).mount("#app");
