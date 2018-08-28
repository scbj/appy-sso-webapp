import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { requiresAuth } from './middlewares/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  // Imperative when the root of the web application is not the root of the domain name.
  // Ex: domain.com/webapp/ requires to have the BASE_URL variable at "/webapp".
  base: process.env.BASE_URL,

  // Automatically adds the specified class when a route matches that of a router-link
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',

  // The mode is "history" to remove the # in the url and use a normal url.
  // However, this requires adding a catch-all fallback route to your server (cf README).
  mode: 'history',
  routes
})

// We add the middleware so that all routes without exception go through the verification of authentication
router.beforeEach(requiresAuth)

export default router
