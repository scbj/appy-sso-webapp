import multiguard from 'vue-router-multiguard'
import {
  requiresAdmin,
  requiresCompletedProfile
} from '@/router/middlewares/user'

const children = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/app/ViewHome'),
    beforeEnter: requiresCompletedProfile
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/app/ViewNews'),
    beforeEnter: requiresCompletedProfile
  },
  {
    path: '/me',
    name: 'settings',
    component: () => import('@/views/app/ViewSettings')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/app/ViewDashboard'),
    beforeEnter: multiguard([ requiresAdmin, requiresCompletedProfile ]),
    children: [
      {
        path: 'users',
        name: 'dashboardUsers',
        component: () => import('@/views/app/ViewDashboardUsers')
      },
      {
        path: 'groups',
        name: 'dashboardGroups',
        component: () => import('@/views/app/ViewDashboardGroups')
      }
    ]
  }
]

export default {
  name: 'app',
  component: () => import('@/views/app/ViewApp'),
  children
}
