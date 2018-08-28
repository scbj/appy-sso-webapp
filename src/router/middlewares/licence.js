import store from '@/store'

/** Middleware to prevent the user from skipping steps on activate licence action. */
export function checkContinuityBetweenSteps (to, from, next) {
  const completedStepCount = store.get('ui/licence/completedStepCount') || 0
  const step = to.meta.step
  if (step > completedStepCount + 1) {
    return next({ name: 'activateLicenceKey' })
  }
  next()
}
