const PageMain = () => import('@/components/main/PageMain')
const ViewHome = () => import('@/components/home/ViewHome')
const ViewNews = () => import('@/components/news/ViewNews')
const ViewDashboard = () => import('@/components/dashboard/ViewDashboard')

const stepRoutes = [
  {
    path: '/home',
    name: 'home',
    component: ViewHome
  },
  {
    path: '/news',
    component: ViewNews
  },
  {
    path: '/dashboard',
    component: ViewDashboard
  }
]

export default {
  name: 'main',
  component: PageMain,
  children: stepRoutes
}
