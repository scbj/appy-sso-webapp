import store from '@/store'

export function requiresAdmin (to, from, next) {
  const admin = store.get('user/isAdmin')
  if (!admin) {
    return next({ name: 'home' })
  }
  next()
}
