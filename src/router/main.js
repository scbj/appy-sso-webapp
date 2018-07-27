import { requiresAdmin } from '@/router/middlewares'

const PageMain = () => import('@/components/main/PageMain')
const ViewHome = () => import('@/components/home/ViewHome')
const ViewNews = () => import('@/components/news/ViewNews')
const ViewDashboard = () => import('@/components/dashboard/ViewDashboard')
const DashboardUsers = () => import('@/components/dashboard/DashboardUsers')
const DashboardGroups = () => import('@/components/dashboard/DashboardGroups')

const stepRoutes = [
  {
    path: '/home',
    name: 'home',
    component: ViewHome
  },
  {
    path: '/news',
    name: 'news',
    component: ViewNews
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: ViewDashboard,
    beforeEnter: requiresAdmin,
    children: [
      {
        path: 'users',
        name: 'dashboardUsers',
        component: DashboardUsers
      },
      {
        path: 'groups',
        name: 'dashboardGroups',
        component: DashboardGroups
      }
    ]
  }
]

export default {
  name: 'main',
  component: PageMain,
  children: stepRoutes
}
