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
    {
      path: '/auth/register',
      name: 'registerView',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainView_test.vue')
    },
    {
      path: '/codeInput',
      name: 'codeInput',
      component: () => import('@/views/CodeInputView.vue')
    },
    {
      path: '/contest',
      name: 'contest',
      component: () => import('@/views/ContestView.vue')
    }
  ]
})

export default router
