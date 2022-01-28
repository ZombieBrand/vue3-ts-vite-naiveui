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

## tailwindcss 和 NaiveUI 冲突解决

在`tailwind.config.js`中增加如下配置

```
 corePlugins: {
    preflight: false,
  },
```

## vite 插件市场(以上 vite 插件都是从这里找到)

https://github.com/vitejs/awesome-vite#plugins

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
