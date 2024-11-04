import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import postcsspxtorem from "postcss-pxtorem"
export default defineConfig({
  plugins: [vue()],
   // 路径别名
   resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  server: {
    port:8888,
    open: false,//运行项目是否自动打开
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 37.5, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
          propList: ["*", "!border"], // 除 border 外所有px 转 rem
        })
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData:`@import "./src/styles/variables.scss";`,
      }
    }
  }
})