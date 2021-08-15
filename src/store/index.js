import Vue from 'vue'
import Vuex from 'vuex'
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
    token: ''
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
      } catch (error) {
        console.log('error', error)
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
