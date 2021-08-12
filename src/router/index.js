import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/tweet',
    name: 'tweet',
    component: () => import('../views/TweetDetail.vue')
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: UserSignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/UserSignUp.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
