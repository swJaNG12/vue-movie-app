import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // hash mode
  // /#/ 으로 접근
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  routes: [
    // home
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    // /about
    {
      path: '/about',
      component: About
    },
    {
      path: '/:NotFound(.*)',
      component: NotFound
    }
  ]
})