import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import "@/styles/index.scss";

// 引入鉴权控制
import "@/permission";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./plugins/i18n";
import "./index.css";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(router).use(pinia).use(i18n).mount("#app");
