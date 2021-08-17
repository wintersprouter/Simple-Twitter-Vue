import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
export default {
  follow({ followingId }) {
    return apiHelper.post(`/followships`, { id: followingId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  unfollow({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
