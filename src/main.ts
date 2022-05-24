import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

import "@/styles/index.scss";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
import "./index.css";

// 引入鉴权控制
import "@/permission";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./plugins/i18n";

import { createPinia } from "pinia";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 全局属性
import { installFilter } from "@/filter";
// 指令
import installDirective from "@/directives";

const app = createApp(App);
installDirective(app);
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(installFilter);

// 最后一步挂载app和相关配置
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);
app.mount("#app");
