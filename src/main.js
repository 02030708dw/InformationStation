import '@/styles/style.scss'
import 'vant/lib/index.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import pinia from '@/stores/index'
import router from '@/router/index'
import vant from 'vant' 
const app=createApp(App)
app.use(pinia)
app.use(router)
app.use(vant)
app.mount('#app')