import Vue from 'vue'
import Vuex from 'vuex'

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
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    actions: {
    },
    modules: {
    }
  }
})
