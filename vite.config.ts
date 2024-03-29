import { viteMockServe } from "vite-plugin-mock";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/

export default defineConfig(({ mode, command }) => {
  const ENV = loadEnv(mode, process.cwd());
  const prodMock = false;
  console.log(ENV, mode);
  return {
    base: "./", //打包路径
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && prodMock,
        supportTs: true,
        watchFiles: true,
      }),
      vueI18n({
        include: path.resolve(__dirname, "./src/locales/**"),
      }),
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression(),
    ],
    // 配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/styles/_variables.scss"; @import "@/styles/_mixin.scss"; @import "@/styles/_sidebar.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      host: "0.0.0.0",
      port: 8997,
      open: true,
      https: false,
      cors: true,
      // proxy: {
      //   [ENV.VITE_APP_BASE_API]: {
      //     target: ENV.VITE_APP_WEB_URL,
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) =>
      //       path.replace(new RegExp(`^${ENV.VITE_APP_BASE_API}`), ""),
      //   },
      // },
    },
    esbuild: {
      pure: mode === "production" ? ["console.log", "debugger"] : [], // 去除日志和debugger
    },
    // 生产环境打包配置
    build: {
      sourcemap: true,
    },
  };
});
