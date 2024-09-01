import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoanList from '@/views/LoanList.vue'
import LoanListDetail from '@/views/LoanListDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/loans',
      name: 'loans',
      component: LoanList,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/loan/:id',
      name: 'loan-detail',
      component: LoanListDetail,
      meta: { layout: 'DefaultLayout' },
    }
  ]
})

export default router
