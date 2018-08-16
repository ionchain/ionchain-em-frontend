const merge = require('webpack-merge')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // '~assets/css/main.css',
    { src: '~less/public.less', lang: 'less' },
    { src: '~less/login.less', lang: 'less' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config = merge(config, {
          resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': resolve('./')
            }
          }        
        })
      }
    }
  },
  plugins: ['~plugins/pretty-checkbox-vue', '~plugins/plugins-all'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /* proxy: {
    '/api': {
      target: 'http://192.168.1.124:3000', 
      ws: false, 
      pathRewrite: {
        '^/api': ''
      }
    }
  } */
  proxy: [
    [
      '/api', 
      { 
        target: 'http://192.168.21.146:3000' // api主机
        // pathRewrite: { '/api' : '' }
      }
    ]
  ]
}

