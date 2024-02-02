import { createRouter, createWebHistory } from 'vue-router';
// 首页
import Home from '../views/Home/index.vue'
import Game from '../views/Game/index.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 首页
        {
            path:'/:id',
            name:'home',
            component:Home,
            children:[
                // 赛事
                {
                    path:'/:id',
                    name: 'game',
                    component:Game
                },
                //体育资讯
                {
                    path:'/:id/Information',
                    name: 'information',
                    component: () => import('../views/Information/index.vue')
                },
                //赛事分析
                {
                    path:'/:id/Analysis',
                    name: 'analysis',
                    component: () => import('../views/Analysis/index.vue')
                }
            ]
        },
        // 赛事详情
        {
            path:'/GameInfo/:id',
            name:'gameinfo',
            component:() => import('../views/GameInfo/index.vue')
        },
        // 资讯详情
        {
            path:'/Informationinfo',
            name:'Informationinfo',
            component:() => import('../views/Informationinfo/index.vue')
        },
        {
            path:'/AnalysisInfo',
            name:'AnalysisInfo',
            component:() => import('../views/AnalysisInfo/index.vue')
        }
    ]
})


export default router