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
  getUserProfileInfo(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
