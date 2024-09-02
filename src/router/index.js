import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Routes from '../data/routes.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/Calendar/CalendarView.vue')
  },
  {
    path: '/calendar/login',
    name: 'calendar-login',
    component: () => import('../views/Calendar/CalendarLoginView.vue')
  },
  {
    path: '/calendar/rigister',
    name: 'calendar-rigister',
    component: () => import('../views/Calendar/CalendarRigisterView.vue')
  }
]
Routes.forEach((route) => {
  routes.push(route)
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
