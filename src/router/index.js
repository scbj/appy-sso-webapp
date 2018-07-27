import Vue from 'vue'
import Router from 'vue-router'

// Routes and middlewares
import activateLicenceRoute from './activate-licence'
import mainRoute from './main'
import { requiresAuth } from './middlewares'

// Components
const PageLogin = () => import('@/components/login/PageLogin')
const Page404 = () => import('@/components/app/Page404')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/activate',
      ...activateLicenceRoute
    },
    {
      path: '/login',
      name: 'login',
      component: PageLogin
    },
    {
      path: '/',
      ...mainRoute,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: Page404
    }
  ]
})

router.beforeEach(requiresAuth)

export default router
