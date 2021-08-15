import axios from 'axios'

const baseURL = 'https://simpletwitter-api.herokuapp.com/api/'

export const apiHelper = axios.create({
  baseURL
})
