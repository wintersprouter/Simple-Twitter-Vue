import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
export default {
  getCurrentUser() {
    return apiHelper.get('/users/current', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
