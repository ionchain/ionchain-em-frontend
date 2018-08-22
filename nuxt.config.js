const merge = require('webpack-merge')
const path = require('path')
// import _ from 'lodash'
// import modifyResponse from 'node-http-proxy-json'

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
    },
    vendor: ['axios', 'moment']
  },
  plugins: ['~plugins/pretty-checkbox-vue', '~plugins/plugins-other', {src: '~plugins/plugins-client', ssr: false}],
  modules: [
  ],
  router: {
    routes: [
    ],
    middleware: 'auth-router'
  },
  serverMiddleware: ['~/middleware/server-middleware']
}
