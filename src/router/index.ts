import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    }, 
    {
      path: '/auth/login',
      name: 'loginView',
      component: () => import('@/views/LoginView.vue')
    },
    // {
    //   path: '/test',
    //   name: 'testView',
    //   component: () => import('@/views/TestView.vue')
    // }
    {
      path: '/auth/register',
      name: 'registerView',
      component: () => import('@/views/RegisterView.vue')
    },
  ]
})

export default router
