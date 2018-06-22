import store from '@/store'

export function requiresAuth (to, from, next) {
  // We must redirect users to the homepage if they try to
  // access the root of the domain name.
  if (to.path === '/') {
    return next({ name: 'home' })
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth === true)
  const isLoggedIn = store.getters['auth/isLoggedIn'] === true

  // Redirects the user to the login page if it's not authenticated
  if (requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }
  next()
}

/** Middleware to prevent the user from skipping steps on activate licence action. */
export function checkContinuityBetweenSteps (to, from, next) {
  const completedStepCount = store.state.licence.completedStepCount
  const step = to.meta.step
  if (step > completedStepCount + 1) {
    return next({ name: 'activate-licence' })
  }
  next()
}
