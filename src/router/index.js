import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import UserSignIn from '../views/UserSignIn.vue'
import store from './../store'
import AdminMain from './../views/AdminMain.vue'
import AdminSignIn from './../views/AdminSignIn.vue'

Vue.use(VueRouter)

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'admin') {
    next('/404')
    return
  }
  next()
}
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role === 'user') {
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
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/UserSignUp.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminSignIn
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminMain,
    beforeEnter: authorizeIsAdmin,
    redirect: '/dashboard/tweets',
    children: [
      {
        path: 'tweets',
        name: 'adminTweets',
        component: () => import('../components/AdminTweetsList.vue')
      },
      {
        path: 'users',
        name: 'adminUsers',
        component: () => import('../components/AdminUsersList.vue')
      }
    ]
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
    component: () => import('../views/UserProfile.vue'),
    redirect: '/users/:id/tweets',
    beforeEnter: authorizeIsUser,
    children: [{
      path: 'tweets',
      component: () => import('../components/UserProfileTweets.vue'),
      name: 'users'
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
    }
    ]
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
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  let isAuthenticated
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
    store.dispatch('fetchTopUsers')
  }
  const userPathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin', 'dashboard']
  const adminPathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin', 'tweets']

  if (!isAuthenticated && !userPathsWithoutAuthentication.includes(to.name) && !adminPathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  if (isAuthenticated === 'user' && userPathsWithoutAuthentication.includes(to.name)) {
    next('/tweets')
    return
  }
  if (isAuthenticated === 'admin' && adminPathsWithoutAuthentication.includes(to.name)) {
    next('/dashboard')
    return
  }
  next()
})

export default router
