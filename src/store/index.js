import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from '../utils/helpers'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      role: '',
      cover: '',
      introduction: ''
    },
    isAuthenticated: false,
    token: '',
    topUsers: [
      {
        id: -1,
        name: '',
        account: '',
        avatar: '',
        followerCount: 0,
        isFollowed: false
      }
    ]
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    setTopUsers(state, topUsers) {
      state.topUsers = topUsers
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, role, avatar, cover, account, introduction } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          role,
          avatar,
          cover,
          account,
          introduction
        })
        return true
      } catch (error) {
        console.log('error', error)
        console.error(error.message)
        commit('revokeAuthentication')
        return false
      }
    },
    async fetchTopUsers({ commit }) {
      try {
        const { data } = await usersAPI.getTopUsers()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        commit('setTopUsers', data.users)
      } catch (error) {
        console.log('error', error)
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得推薦追隨者名單'
        })
      }
    }
  },
  modules: {
  }
})
