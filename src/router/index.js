import Vue from 'vue'
import Router from 'vue-router'
import ActivateLicencePage from '@/components/activateLicence/ActivateLicencePage'
import ActivateLicenceKey from '@/components/activateLicence/ActivateLicenceKey'
import ActivateLicenceCompany from '@/components/activateLicence/ActivateLicenceCompany'
import ActivateLicenceOwner from '@/components/activateLicence/ActivateLicenceOwner'
import LoginPage from '@/components/login/LoginPage'
import DashboardPage from '@/components/Dashboard/DashboardPage'
import PageNotFound from '@/components/error/NotFound'
import store from '@/store'

/**
 * Middleware for activate/ routes. Check that the step can be loaded.
 */
function beforeEnter (to, from, next) {
  const completedStepCount = store.state.licence.completedStepCount
  const step = to.meta.step
  if (step > completedStepCount + 1) {
    return next({ name: 'activate' })
  }
  next()
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/activate',
      component: ActivateLicencePage,
      children: [
        {
          path: '/',
          name: 'activate',
          component: ActivateLicenceKey,
          meta: { step: 1 },
          beforeEnter
        },
        {
          path: 'company',
          name: 'activateCompany',
          component: ActivateLicenceCompany,
          meta: { step: 2 },
          beforeEnter
        },
        {
          path: 'owner',
          name: 'activateOwner',
          component: ActivateLicenceOwner,
          meta: { step: 3 },
          beforeEnter
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})

router.beforeEach(({ name, path }, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'] === true
  if (path === '/') {
    return next({
      name: isLoggedIn ? 'dashboard' : 'login'
    })
  }
  // redirects the user to the login page if it's not authenticated
  if (name === 'dashboard' && !isLoggedIn) {
    return next({ name: 'login' })
  }
  next()
})

export default router
