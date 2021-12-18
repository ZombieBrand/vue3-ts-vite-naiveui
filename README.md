# Vue 3 + Typescript + Vite + Naive UI

项目主要个人开发学习,主要使用最新技术栈开发

Vue 3 + Typescript + Vite + Naive UI + VueRouter + pinia + axios

## 其他主要安装依赖

- [tailwindcss](https://www.tailwindcss.cn/)  Tailwind CSS 是一个功能类优先的 CSS 框架
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 按需组件自动导入Vue。
- prettier + eslint
- vueuse
-  [一个 Vue 请求库 | VueRequest (attojs.org)](https://cn.attojs.org/)
-  axios

## tailwindcss和NaiveUI冲突解决
在`tailwind.config.js`中增加如下配置
```
 corePlugins: {
    preflight: false,
  },
```

## vite插件市场(以上vite插件都是从这里找到)

https://github.com/vitejs/awesome-vite#plugins



## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

