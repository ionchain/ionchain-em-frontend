const _config = {
  'development': {
    BASE_URL: '/api/v1'
  },
  'production': {
    BASE_URL: '/api'
  }
}
_config.testing = _config.development

export const BASE_URL = _config[process.env.NODE_ENV].BASE_URL
