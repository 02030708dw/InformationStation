import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import autoprefixer from "autoprefixer"
import postcsspxtorem from "postcss-pxtorem"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
   // 路径别名
   resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  server: {
    client: {
      overlay: false,
    },
    open: false,//运行项目是否自动打开
  },
  // proxy: {
  //   '/api1': {
  //     // 后台地址
  //     target: 'http://127.0.0.1:8990/',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api1/, '')
  //   },
  //   '/api2': {
  //     // 后台地址
  //     target: 'http://127.0.0.1:8956/',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api2/, '')
  //   }
  // },
  // 适配方案
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "last 10 versions", // 所有主流浏览器最近10版本用
          ],
          grid: true
        }),
        postcsspxtorem({
          rootValue: 37.5, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
          propList: ["*", "!border"], // 除 border 外所有px 转 rem
          selectorBlackList: [".a-"], // 过滤掉.a-开头的class，不进行rem转换
        })
      ],
    },
  }
})