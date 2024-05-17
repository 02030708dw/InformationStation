import { createRouter, createWebHistory } from 'vue-router';
import routes from "./routes"
// 首页
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router