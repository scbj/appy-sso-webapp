import store from '@/store'

export function requiresAdmin (to, from, next) {
  const admin = store.get('user/isAdmin')
  if (!admin) {
    return next({ name: 'home' })
  }
  next()
}

export function requiresCompletedProfile (to, from, next) {
  const mustFillProfileInfos = store.get('user/mustFillProfileInfos')
  if (mustFillProfileInfos && to.name !== 'settings') {
    return next({ name: 'settings' })
  }
  next()
}
