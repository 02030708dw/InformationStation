import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入pinia
import pinia from './stores/index'
// 导入vue-router
import router from './router/index'
// 屏幕适配
import "amfe-flexible/index.js";
//导入vant
import vant from 'vant' 
//导入vant样式
import 'vant/lib/index.css' 
// 挂载
createApp(App).use(pinia).use(router).use(vant).mount('#app')
