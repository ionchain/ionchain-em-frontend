import axios from 'axios'
import { BASE_URL } from './config.js'

var _axios = axios.create({
  baseURL: BASE_URL
})

_axios.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers.accessToken = localStorage.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.clear()
          break
      }
    }
    return Promise.reject(error)
  }
)

// 测试数据
export const DATA_TEST = (data, params) => {
  return _axios.post('/data-test', data, { params: params })
}
// 测试数据
export const DATA_TEST2 = (params) => {
  return _axios.get('/data-test', { params: params })
}
// 登录
export const Login = (data, params) => {
  return _axios.post('/login', data, { params: params })
}
// 获取短信验证码
export const getSmsCode = (params) => {
  return _axios.get('/getSmsCode', { params: params })
}
