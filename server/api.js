/* 服务端api */
const config = require('./config.js')
const axios = require('axios')

var _axios = axios.create({
    baseURL: config.target + config.BASE_URL
})
_axios.interceptors.request.use(
    (config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    }
);

_axios.interceptors.response.use(
    (response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    }
)

module.exports = {
    // 用户信息 
    userInfo ({userId} = {}) {
        return _axios.get(`/companies/detail?user_id=${userId}`)
    },
    // 设备列表
    getDeviceList ({userId} = {}) {
        return _axios.get(`/users/${userId}/devices`)
    },
    // 设备详情
    getDeviceDesc ({deviceId} = {}) {
        return _axios.get(`/devices/${deviceId}`)
    },
    // 收藏列表
    getCollectList ({userId} = {}) {
        return _axios.get(`/users/${userId}/favorites`)
    },
    // 历史总收益接口
    getHisProfit ({txTo} = {}) {
        var txTo = '0x1ac505f02e6a6aa7abb1b8b99c7c43bc53dba2de'
        return _axios.get(`/equipment/totalIncome?txTo=${txTo}`,{baseURL: 'http://192.168.23.149:3001/v1'})
    }
    // sendMsg (data, params) {
    //     return _axios.post('/sms/sendMsg', data, {params: params});
    // }
}
