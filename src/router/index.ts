import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: () => import('../views/CryptoView.vue'),
    },
    {
      path: '/english',
      name: 'english',
      component: () => import('../views/EnglishView.vue'),
    },
  ],
})

export default router
