import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import UserSignUp from '../views/UserSignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: UserSignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: UserSignUp
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
