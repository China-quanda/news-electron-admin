import axios from 'axios'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'
const userStore = useUserStore(createPinia())

const request = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8'
  }
})

request.interceptors.request.use(
  (config) => {
    const token = userStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    if (code === 0) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
