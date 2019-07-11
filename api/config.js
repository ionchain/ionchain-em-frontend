
import axios from 'axios'

const _config = {
  'development': {
    BASE_URL: '/api/v1'
  },
  'production': {
    BASE_URL: '/api/v1'
  }
}
_config.testing = _config.development
export const BASE_URL = _config[process.env.NODE_ENV].BASE_URL

export const _axios = axios.create({
  baseURL: BASE_URL
})

_axios.interceptors.request.use(
  (config) => {
    // if (localStorage.token) {
    //   config.headers.accessToken = localStorage.token
    // }
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
          // localStorage.clear()
          break
        default:
          window.vm.$snotify.error(`${error.response.status} ${error.response.statusText}`)
          break
      }
    }
    return Promise.reject(error)
  }
)
