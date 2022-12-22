import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolio',
      component: PortfolioView
    },
    {
      path: '/login',
      name: 'inloggning',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      /*Control if user is logged in
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }*/
    }
  ]
})

export default router