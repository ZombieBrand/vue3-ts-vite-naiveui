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

## i18n国际化
`src/plugins/i18n.ts`注册国际化插件
`src/components/SwitchLanguage.vue` 语言切换组件

在html模版语言里可以使用`$t('route.home')`

在setup里使用方法如下:

```vue
<script setup>
  import { getCurrentInstance } from 'vue'
  const { proxy } = getCurrentInstance()
  proxy.$t('route.home')
</script>
```
还可以在组件.vue文件中直接用i18n标签声明语言变量
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
          additionalData: '@import "@/styles/index.scss";'
        }
      }
    }
```
## this.$* 使用替代方案

挂载方法: `window.$message = useMessage()`
使用方法: `window.$message('error',response.data.message)`

## Token 
采用JWT鉴权,处理方式包含(动态token,刷新token,时效token),此项目采用时效Token.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
