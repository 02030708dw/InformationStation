const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/Index/index.vue"),
    redirect: { name: "Home" },
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
      },
      {
        path: "Infomation",
        name: "Infomation",
        component: () => import("@/views/Infomation/index.vue"),
      },
      {
        path: "Trend",
        name: "Trend",
        component: () => import("@/views/Trend/index.vue"),
      },
      {
        path:"Draw",
        name:"Draw",
        component: () => import("@/views/Draw/index.vue"),
      }
    ],
  },
];
export default routes;