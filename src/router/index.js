import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Routes from '../../public/routes.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
]
Routes.forEach(route => {
  routes.push(route);
});
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
