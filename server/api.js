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
    getDeviceList ({userId} = {}) {
        return _axios.get(`/users/${userId}/devices`);
    },
    getDeviceDesc ({deviceId} = {}) {
        return _axios.get(`/devices/${deviceId}`);
    },
    // sendMsg (data, params) {
    //     return _axios.post('/sms/sendMsg', data, {params: params});
    // }
}
