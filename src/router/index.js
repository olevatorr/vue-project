import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: () => import('../views/TodoListView.vue')
    },
    {
      path: '/WeatherApi',
      name: 'WeatherApi',
      component: () => import('../views/WeatherApiView.vue')
    },
    {
      path: '/TaskControl',
      name: 'TaskControl',
      component: () => import('../views/TaskControlView.vue')
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: () => import('../views/ShopView.vue')
    },
  ]
})

export default router
