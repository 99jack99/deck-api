import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'Table 1',
        component: () => import('./views/tableOne.vue')
    },
    {
        path: '/table2',
        name: 'Table 2',
        component: () => import('./views/tableTwo.vue')
    }
  ]
})


export default router