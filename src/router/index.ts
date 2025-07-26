import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Login', component: () => import('@/views/Login.vue')  },
  { path: '/home', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/profile', name: 'Profile', component: () => import('@/views/User.vue') },
  { path: '/settings', name: 'Settings', component: () => import('@/views/Settings.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const session = useSessionStore()
  if (!session.isLoggedIn() && to.path !== '/') {
    next('/')
  } else if(to.path === '/' && session.isLoggedIn()) {
    next('/home')
  } else if (!routes.some(route => route.path === to.path)) {
    next('/')
  } else {
    next()
  }
})

export default router
