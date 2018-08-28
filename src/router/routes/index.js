/**
 * Informations :
 * The components are lazy loaded ⚡ thanks to the import() function of webpack.
 * https://router.vuejs.org/guide/advanced/lazy-loading.html
 */
import app from './app'
import licence from './licence'

export default [
  // User login and logout
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/ViewAuthLogin')
  },

  // Activation of a license and creation of the company
  {
    path: '/activate',
    ...licence
  },

  // App
  {
    path: '/',
    ...app,
    meta: {
      requiresAuth: true
    }
  },

  // Support for errors and non-existent route
  {
    path: '*',
    name: 'error404',
    //  TODO: Utiliser la fonction import() avec webpackChunkName afin d'identifier facilement les vues dans l'inspecteur de réseau du navigateu
    component: () => import('@/views/ViewError404')
  }
]
