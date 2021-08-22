import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'admin') {
    next('/404')
    return
  }
  next()
}

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
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Home,
    beforeEnter: authorizeIsUser
  },
  {
    path: '/tweets/:id',
    name: 'tweets-detail',
    component: () => import('../views/TweetDetail.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import('../views/UserProfile.vue'),
    redirect: '/users/:id/tweets',
    beforeEnter: authorizeIsUser,
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
    beforeEnter: authorizeIsUser,
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
  const token = localStorage.getItem('token')
  let isAuthenticated = false
  if (token) {
    isAuthenticated = store.dispatch('fetchCurrentUser')
    store.dispatch('fetchTopUsers')
  }
  const pathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin']
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/tweets')
    return
  }

  next()
})

export default router
