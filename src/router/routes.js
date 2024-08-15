const routes = [
  {
    path: "/:id",
    name: "index",
    component: () => import("@/views/Index/index.vue"),
    redirect: { name: "Home" },
    children: [
      {
        path: "/:id",
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
    ],
  },
];
export default routes;