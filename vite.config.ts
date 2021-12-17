import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//@ts-ignore
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import ViteComponents, {
  NaiveUiResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  base: './', //打包路径
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()]
    }),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/mian.scss";',
      },
    },
  },
  //启动服务配置
  server: {
    host: 'localhost',
    port: 8998,
    open: true,
    https: false,
    proxy: {

    },
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
