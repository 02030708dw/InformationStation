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
            // redirect: '/:id/Match',
            children:[
                // 赛事
                {
                    path:'/:id',
                    name: 'Match',
                    component:()=>import('@/views/Match/index.vue')
                },
                {
                    path:'Draw',
                    name:'Draw',
                    component:()=>import('@/views/Draw/index.vue')
                },
                {
                    path:'Sports',
                    name: 'Sports',
                    component:()=>import('@/views/Sports/index.vue')
                },
                {
                    path:'Analysis',
                    name:'Analysis',
                    component:()=>import('@/views/Analysis/index.vue')
                }
            ]
        },
        {
            path:'/MatchDetail',
            name:'MatchDetail',
            component:()=>import('@/views/MatchDetail/index.vue')
        }
    ]
})
export default router