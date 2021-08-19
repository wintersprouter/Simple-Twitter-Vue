import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
export default {
  getTopUsers() {
    return apiHelper.get('/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser() {
    return apiHelper.get('/users/current', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  users: {
    getProfile(userId) {
      return apiHelper.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    updateProfile({ userId, formData }) {
      return apiHelper.put(
        `/users/${userId}`,
        formData
      )
    },
    getUserTweets(userId) {
      return apiHelper.get(`/users/${userId}/tweets`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
  }
}
