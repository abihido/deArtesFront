import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import File from '../views/Files.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/file',
    name: 'File',
    component: File
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
