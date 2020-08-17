import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Todo from '../views/TodoPage.vue'
import nprogress from "nprogress"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
