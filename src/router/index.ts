import { createRouter, createWebHistory } from 'vue-router'
import LoanList from '@/views/LoanList.vue'
import LoanListDetail from '@/views/LoanListDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/loans',
      name: 'home',
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
