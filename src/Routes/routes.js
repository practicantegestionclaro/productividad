import Login from "../components/Login.vue";
import Report from "../components/Report.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/report", 
    name: "Report",
    component: Report,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;