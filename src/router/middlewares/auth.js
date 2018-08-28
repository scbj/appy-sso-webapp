import store from '@/store'

export function requiresAuth (to, _, next) {
  // We must redirect users to the homepage if they try to
  // access the root of the domain name.
  if (to.path === '/') {
    return next({ name: 'home' })
  }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth === true)
  const isLoggedIn = !!store.get('auth/isLoggedIn')

  // Redirects the user to the login page if it's not authenticated
  if (requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }
  next()
}
