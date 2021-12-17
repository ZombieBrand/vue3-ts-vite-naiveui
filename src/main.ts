import { createApp } from "vue";
import App from "./App.vue";
import './index.css'
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";
import naive from "./naive-ui";
createApp(App).use(naive).mount("#app");
