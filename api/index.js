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
    return response.data
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
  return _axios.post('/data-test', data, {params: params, baseURL: '/mytest'})
}
// 测试数据
export const DATA_TEST2 = (params) => {
  return _axios.get('/data-test', { params: params })
}
// 登录
export const Login = (data, params) => {
  return _axios.post('/users/login', data, { params: params })
}
// 获取短信验证码
export const getSmsCode = (data, params) => {
  return _axios.post('/users/sms_code', data, {params: params})
}
// 重置密码
export const resetSmsCode = (data, params) => {
  return _axios.post('/users/reset_password', data, {params: params})
}
// 校验短信验证码
export const verifySMScode = (data, params) => {
  return _axios.post('/users/verify_sms_code', data, {params: params})
}
// 创建用户
export const createUser = (data, params) => {
  return _axios.post('/users/create', data, {params: params})
}
// 退出登录---来自渲染服务器
export const Logout = (params) => {
  return _axios.get('/logout', {params: params, baseURL: ''})
}
