import { createRouter, createWebHistory } from 'vue-router';
// 首页
const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 首页
        {
            path:'/:id',
            name:'Home',
            component:()=>import('@/views/Home/index.vue'),
            children:[
                // 赛事
                {
                    path:'/:id',
                    name: 'Match',
                    component:()=>import('@/views/Match/index.vue')
                },
            ]
        },
        // 赛事详情
        {
            path:'/MatchDetail/:id',
            name:'MatchDetail',
            component:() => import('@/views/MatchDetail/index.vue')
        },
    ]
})


export default router