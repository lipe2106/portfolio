// Created by Lina Petersson 2023
import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'
import AdminView from '../views/AdminView.vue'
import BlogItView from '../views/BlogItView.vue'
import RawView from '../views/RawView.vue'
import HaciendaView from '../views/HaciendaView.vue'
import FardtjanstView from '../views/FardtjanstView.vue'
import IntranetView from '../views/IntranetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/blogit/:id',
      name: 'blogit',
      component: BlogItView
    },
    {
      path: '/raw/:id',
      name: 'raw',
      component: RawView
    },
    {
      path: '/hacienda/:id',
      name: 'hacienda',
      component: HaciendaView
    },
    {
      path: '/intranet/:id',
      name: 'intranet',
      component: IntranetView
    },
    {
      path: '/fardtjanst/:id',
      name: 'fardtjanst',
      component: FardtjanstView
    },
  ]
})

export default router
