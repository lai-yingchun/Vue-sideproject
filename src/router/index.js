// 引入套件及元件
// import ab from "@../components/1a2b_v2.vue";
import { createRouter, createWebHistory } from "vue-router";
// 定義路由表
const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/1a2b",
    name: "1a2b",
    component: () => import("../components/1a2b_v2.vue"),
  },
  {
    path: "/todoList",
    name: "todoList",
    component: () => import("../components/todoList_v2.vue"),
  },
  {
    path: "/lv_eleven",
    name: "lv_eleven",
    component: () => import("../components/lv_eleven.vue"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});
export { router };

// export default router
