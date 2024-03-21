import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import LogHike from '../views/LogHike.vue';
import ViewHike from '../views/ViewHike.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/loghike",
      name: "LogHike",
      component: LogHike,
    },
    {
      path: "/view-hike/:hikeId", // This is a unique parameter
      name: "View-Hike",
      component: ViewHike,
    },
  ]
})

export default router;
