import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
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
  if (name !== 'login' && !isLoggedIn) {
    return next({ name: 'login' })
  }
  next()
})

export default router
