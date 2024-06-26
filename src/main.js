import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app=createApp(App)
import pinia from './stores/index'
import router from '@/router/index'
import "amfe-flexible/index.js";
import vant from 'vant' 
import 'vant/lib/index.css'

app.use(pinia)
app.use(router)
app.use(vant)
app.mount('#app')