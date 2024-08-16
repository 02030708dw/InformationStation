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
        path: "Information",
        name: "Information",
        component: () => import("@/views/Information/index.vue"),
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
  {
    path: "/InfoDetail",
    name: "InfoDetail",
    component: () => import("@/views/Information/InfoDetail.vue"),
  },
];
export default routes;