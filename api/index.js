import { _axios } from './config'

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
export const resetPwd = (data, params) => {
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
