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
      path: '/user/profile/:id',
      name: 'profileView',
      component: () => import('@/views/ProfileView.vue')
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
    },
    {
      path: '/rule',
      name: 'rule',
      component: () => import('@/views/RuleView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('@/components/ContestTable.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('@/views/RoomView.vue')
    },
    {
      path: '/roomDetails/:id',
      name: 'roomDetails',
      component: () => import('@/views/RoomDetailsView.vue')
    },
    // {
    //   path: '/backgroundTest',
    //   name: 'backgroundTest',
    //   component: () => import('@/views/BackgroundTest.vue')
    // }
  ]
})

export default router
