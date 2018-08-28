import { checkContinuityBetweenSteps } from '@/router/middlewares/licence'

const stepRoutes = [
  {
    path: 'key',
    alias: '/',
    name: 'activateLicenceKey',
    component: () => import('@/views/licence/ViewActivateLicenceKey')
  },
  {
    path: 'company',
    name: 'activateLicenceCompany',
    component: () => import('@/views/licence/ViewActivateLicenceCompany')
  },
  {
    path: 'owner',
    name: 'activateLicenceOwner',
    component: () => import('@/views/licence/ViewActivateLicenceOwner')
  },
  {
    path: 'completed',
    name: 'activateLicenceCompleted',
    component: () => import('@/views/licence/ViewActivateLicenceCompleted')
  }
]

// We need to add the step number and also add a middleware
// to prevent the user from skipping steps.
stepRoutes.forEach((route, index) => {
  const step = index + 1
  Object.assign(route, {
    meta: { step },
    beforeEnter: checkContinuityBetweenSteps
  })
})

export default {
  name: 'activate-licence',
  component: () => import('@/views/licence/ViewActivateLicence'),
  children: stepRoutes
}
