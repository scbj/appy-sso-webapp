import { requiresAdmin } from '@/router/middlewares/user'

const children = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/app/ViewHome')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/app/ViewNews')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/app/ViewDashboard'),
    beforeEnter: requiresAdmin,
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
