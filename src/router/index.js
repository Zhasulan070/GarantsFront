import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateOrder from "@/views/CreateOrder";
import OrderDetail from "@/views/OrderDetail";
import OrderList from "@/views/OrderList";

Vue.use(VueRouter)
// import store from '@/store/index'
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
    path: '/order-detail/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrderList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(store.getters['isLoggedIn'])
//   if (store.getters['isLoggedIn']) {
//     console.log(10)
//     return next()
//   }else {
//     console.log(to.fullPath)
//     if (to.fullPath === '/') {
//       next();
//       return
//     }
//     next("/");
//     return;
//   }
// })
export default router
