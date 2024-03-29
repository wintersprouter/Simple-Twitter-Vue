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
      return apiHelper.put(`/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    updateAccount(userId, payload) {
      return apiHelper.put(`/users/${userId}/account`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getUserTweets(userId) {
      return apiHelper.get(`/users/${userId}/tweets`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getUserRepliedTweets(userId) {
      return apiHelper.get(`/users/${userId}/replied_tweets`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getUserLikedTweets(userId) {
      return apiHelper.get(`/users/${userId}/likes`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getUserFollowings(userId) {
      return apiHelper.get(`/users/${userId}/followings`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    getUserFollowers(userId) {
      return apiHelper.get(`/users/${userId}/followers`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}
