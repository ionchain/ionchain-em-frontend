import { _axios } from './config'
import _ from 'lodash'

let dict = {
  'zh_CN': 'zh_CN',
  en: 'en'
}

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
// 设备列表
export const getDeviceList = ({userId}) => {
  return _axios.get(`/users/${userId}/devices`)
}
//提交反馈
export const feedbackCode = (data) => {
  return _axios.post(`/feedbacks/create`, data)
}
//收藏
export const collectCode = (data) => {
  return _axios.post(`/favorites/create`, data)
}
//取消收藏
export const cancelCode = (data) => {
  return _axios.post(`/favorites/destroy`, data)
}
//获取设备一级分类列表
export const deviceCats = ({language='en'}) => {
  language = _.get(dict, language, 'en')
  let locale = language=='zh_CN' ? '' :`language=${language}`
  return _axios.get(`/categories?${locale}`)
}
//获取设备子级分类列表
export const deviceSubCats = (pid,language='en') => {
  language = _.get(dict, language, 'en')
  let locale = language=='zh_CN' ? '' :`language=${language}`
  return _axios.get(`/categories/${pid}/sub_categories?${locale}`)
}
// 用户信息 
export const userInfo = ({userId} = {}) =>{
  return _axios.get(`/companies/detail?user_id=${userId}`)
}
// 收藏列表
export const getCollectList = ({userId} = {}) =>{
  return _axios.get(`/users/${userId}/favorites`)
}
// 历史总收益接口
export const getHisProfit = ({txTo} = {})=> {
  var txTo = '0x1ac505f02e6a6aa7abb1b8b99c7c43bc53dba2de'
  return _axios.get(`/equipment/totalIncome?txTo=${txTo}`,{baseURL: 'http://192.168.23.149:3001/v1'})
}
// 设备详情
export const getDeviceDesc = ({deviceId} = {}) =>{
    return _axios.get(`/devices/${deviceId}`)
}
//添加设备
export const deviceAdd = (data) =>{
  return _axios.post('/devices/create', data)
}
//用户信息更新
export const updateUserInfo = (data)=>{
  return _axios.post('/companies/update', data)
}