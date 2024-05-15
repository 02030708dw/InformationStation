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
  css: {
    postcss: {
      plugins: [
        postcsspxtorem({
          rootValue: 37.5, 
        })
      ],
    },
  }
})