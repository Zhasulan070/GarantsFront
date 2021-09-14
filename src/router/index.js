import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateOrder from "@/views/CreateOrder";
import Main from "@/views/Main";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: CreateOrder
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
