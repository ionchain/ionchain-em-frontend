const BASE_URL = require('./config.js')
const axios = require('axios')

var _axios = axios.create({
    baseURL: BASE_URL
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

export default {
    GetDevice (params) {
        return _axios.get('/users/1/devices', { params: params });
    },    
    // sendMsg (data, params) {
    //     return _axios.post('/sms/sendMsg', data, {params: params});
    // }
}
