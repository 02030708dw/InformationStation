let search = new URLSearchParams(window.location.search)
let memberId = search.get('u')||JSON.parse(sessionStorage.getItem("UserState"))?.memberId
import Home from "@/views/Home/index.vue"
import Game from "@/views/Game/index.vue"
import Information from "@/views/Information/index.vue"
import Trend from "@/views/Trend/index.vue"
const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Index/index.vue"),
    redirect: { name: memberId ? 'Game' : 'Home' },
    children: [
      {
        path: memberId ? "Home" : "/",
        name: "Home",
        // component: () => import("@/views/Home/index.vue"),
        component:Home
      },
      {
        path: memberId ? "/" : "Game",
        name: "Game",
        // component: () => import("@/views/Game/index.vue"),
        component:Game
      },
      {
        path: "Information",
        name: "Information",
        // component: () => import("@/views/Information/index.vue"),
        component:Information
      },
      {
        path: "Trend",
        name: "Trend",
        // component: () => import("@/views/Trend/index.vue"),
        component:Trend
      },
      {
        path: ":type",
        name: "Draw",
        component: () => import("@/views/Draw/index.vue"),
      },
      {
        path: "Forecast",
        name: "Forecast",
        component: () => import("@/views/Forecast/index.vue"),
      },
      {
        path: "/InfoDetail",
        name: "InfoDetail",
        component: () => import("@/views/Information/LnformationDetail/index.vue"),
      },
    ],
  },

  // 捕获所有未匹配的路径并重定向到首页
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  }
];


export default routes;