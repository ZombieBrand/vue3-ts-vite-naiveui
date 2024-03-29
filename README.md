# Vue 3 + Typescript + Vite + Naive UI

项目主要个人开发学习,主要使用最新技术栈开发

Vue 3 + Typescript + Vite + Naive UI + VueRouter + pinia + axios

## 其他主要安装依赖

- [tailwindcss](https://www.tailwindcss.cn/) Tailwind CSS 是一个功能类优先的 CSS 框架

  !注意:需要`tailwind.config.js`配置中增加`preflight: false` 才不会和其他 UI 库冲突

- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 按需组件自动导入 Vue。

- prettier + eslint

- [VueUse](https://vueuse.org/)

- [一个 Vue 请求库 | VueRequest (attojs.org)](https://cn.attojs.org/)

- axios

- [vue-i18n](https://vue-i18n.intlify.dev/) ,还使用了对应的 vite 插件 [vite-plugin-vue-i18n](https://github.com/intlify/bundle-tools)
  在 SFC 开发中要使用还需要`const { t, d, n, tm, locale } = useI18n()`
- [vite-mock](https://github.com/anncwb/vite-plugin-mock) 使用基于 mockjs 的 vite 插件,支持 Mock 数据

## i18n 国际化

`src/locales/index.ts` 初始化设置 i18n

`src/plugins/i18n.ts`注册国际化插件

`src/components/SwitchLanguage.vue` 语言切换组件

```typescript
// src/locales/index.ts

import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
import { useLocalStorage } from "@vueuse/core";
import en from "./en.json";
// ts配置
type MessageSchema = typeof en;
const storage = useLocalStorage("language", "zh");
const locale = storage.value;
export const i18n = createI18n<[MessageSchema], "en" | "zh">({
  legacy: false,
  locale,
  fallbackLocale: "zh",
  globalInjection: true, //这里设置true后全局组件可以直接使用$t无需额外注册组件 set
  messages,
});
export const { t } = i18n.global; //这里导出主要是为了在其他ts文件中使用
```

在 html 模版语言里可以使用`$t('route.home')`和指令`v-t`

在 setup 里使用方法如下:

```vue
<script setup>
import { getCurrentInstance } from "vue";
// 这种方式ts环境下提示类型错误 可以使用 @ts-ignore  js推荐使用方法
// const { proxy } = getCurrentInstance();

// 这种写法不会有ts提示类型错误问题  ts推荐使用方法
const appInstance = getCurrentInstance();
const proxy = appInstance?.proxy;

proxy.$t("route.home");
</script>
```

在其他 ts 文件用法

```ts
import { t } from "@/locales";
const i18n = t("route.home"); // 首页文字
```

还可以在组件.vue 文件中直接用 i18n 标签声明语言变量

```vue
<template>
  <!-- .... -->
</template>
<script setup>
/* .... */
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
```

## tailwindcss 和 NaiveUI 冲突解决

在`tailwind.config.js`中增加如下配置

```js
 corePlugins: {
    preflight: false,
  },
```

## vite 插件市场(以上 vite 插件都是从这里找到)

https://github.com/vitejs/awesome-vite#plugins

## vite 中 scss 导出变量如何 js 中使用

首先创建一个`export.module.scss`这个文件只导出 scss 变量，并且不能在其他`<style/>`中引入使用也就是只能在 js/ts 环境中引入使用，否则 vite 报错`[plugin:vite:css] This file is already being loaded.` 提示这个文件已经存在。

注意文件名必须使用`*.module.scss`

```scss
// https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass
// JS 与 scss 共享变量，在 scss 中通过 :export 进行导出，在 js 中可通过 ESM 进行导入
// export.module.scss
:export {
  menuText: $menuText;
}
```

```vue
<script lang="ts" setup>
import exportScss from "./src/styles/export.module.scss";
console.log(exportScss); // 对应的变量值
</script>
```

还有一个小技巧，如果`vite.config.js`中配置了全局注入 scss 样式文件,其他`*.scss`文件使用`index.scss`文件中的 sass 特性无需在`*scss`中@import，vue 中的`<style/>`中也无需@import

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: '@import "@/styles/index.scss";';
    }
  }
}
```

## this.$\* 使用替代方案

挂载方法: `window.$message = useMessage()`
使用方法: `window.$message('error',response.data.message)`

## vue 模版中使用全局方法

通过`app.config.globalProperties.$xxxx = xxxx`实现模版中直接使用`$xxx`

```typescript
import dayjs from "dayjs";
import { App } from "vue";
export const dateFilter = (val: string | number, format = "YYYY-MM-DD") => {
  if (Number.isFinite(val)) {
    val = parseInt(val as string);
  }
  return dayjs(val).format(format);
};

export const installFilter = (app: App) => {
  app.config.globalProperties.$filters = {
    dateFilter,
  };
};
```

```typescript
// 全局属性
import { installFilter } from "@/filter";
createApp(App).use(installFilter).mount("#app");
```

vue - html 模版中使用

```typescript
// xxx.vue
<div>$filters.dateFilter(Date.now())</div>
```

vue - setup 中使用

```typescript
const appInstance = getCurrentInstance();
const proxy = appInstance?.proxy;

console.log(proxy.$filters.dateFilter(Date.now()));
```

## Token

采用 JWT 鉴权,处理方式包含(动态 token,刷新 token,时效 token),此项目采用时效 Token.

## 全屏幕控制

`Element.requestFullscreen()` 方法用于发出异步请求使元素进入全屏模式。
`Document.exitFullscreen()` 方法用于让当前文档退出全屏模式

## 开发问题解决方案

axios 结合 useRequest 使用 reuslt 警告:
`TS2339: Property 'result' does not exist on type 'AxiosResponse '.`

```typescript
// 获取数据方法
const { run: userManageRun } = useRequest(getUserManageList, {
  onSuccess: (data) => {
    const {
      result: { list, page: _page, size: _size, total: _total },
    } = data;
  },
  onError: (error) => {
    console.log(error);
  },
});
```

解决方法:

```typescript
// src/axios.d.ts
import * as axios from "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}
```

`pnpm build:pro` 打包报错:
`Cannot access ambient const enums when the '--isolatedModules' flag is provided.`

解决方法:

```typescript
// tsconfig.json

"compilerOptions": {
  "skipLibCheck": true
}
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
