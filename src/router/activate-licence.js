import { checkContinuityBetweenSteps } from './middlewares'

const PageActivateLicence = () => import('@/components/licence/PageActivateLicence')
const ActivateLicenceKey = () => import('@/components/licence/ActivateLicenceKey')
const ActivateLicenceCompany = () => import('@/components/licence/ActivateLicenceCompany')
const ActivateLicenceOwner = () => import('@/components/licence/ActivateLicenceOwner')
const ActivateLicenceCompleted = () => import('@/components/licence/ActivateLicenceCompleted')

const stepRoutes = [
  {
    path: 'key',
    alias: '/',
    name: 'activateLicenceKey',
    component: ActivateLicenceKey
  },
  {
    path: 'company',
    name: 'activateLicenceCompany',
    component: ActivateLicenceCompany
  },
  {
    path: 'owner',
    name: 'activateLicenceOwner',
    component: ActivateLicenceOwner
  },
  {
    path: 'completed',
    name: 'activateLicenceCompleted',
    component: ActivateLicenceCompleted
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
  component: PageActivateLicence,
  children: stepRoutes
}
