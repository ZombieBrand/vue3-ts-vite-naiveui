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
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10239,
        algorithm: "gzip",
        ext: ".gz",
      }),
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
          additionalData: '@import "@/style/index.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      host: "localhost",
      port: 8997,
      open: true,
      https: false,
      cors: true,
      // proxy: {
      //   [ENV.VITE_APP_BASE_API]: {
      //     target: ENV.VITE_APP_WEB_URL,
      //     changeOrigin: true,
      //     rewrite: (path) =>
      //       path.replace(new RegExp(`^${ENV.VITE_APP_BASE_API}`), ""),
      //   },
      // },
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      sourcemap: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
