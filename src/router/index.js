import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
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
    path: '/tweets',
    name: 'tweets',
    component: Home
  },
  {
    path: '/tweets/:id',
    name: 'tweets-detail',
    component: () => import('../views/TweetDetail.vue')
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import('../views/UserProfile.vue'),
    redirect: '/users/:id/tweets',
    children: [{
      path: 'tweets',
      component: () => import('../components/UserProfileTweets.vue')
    },
    {
      path: 'repliedTweets',
      component: () => import('../components/UserRepliedTweets.vue')
    },
    {
      path: 'likedTweets',
      component: () => import('../components/UserLikedTweets.vue')
    }]
  },
  {
    path: '/users/:id/followship',
    name: 'user-followship',
    component: () => import('../views/Followship.vue'),
    redirect: '/users/:id/followship/following',
    children: [{
      path: 'following',
      component: () => import('../components/Following.vue')
    },
    {
      path: 'follower',
      component: () => import('../components/Follower.vue')
    },
    ]
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignIn.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweetsList.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsersList.vue')
  },

  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active-class',
  routes
})
router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  store.dispatch('fetchTopUsers')
  next()
})

export default router
