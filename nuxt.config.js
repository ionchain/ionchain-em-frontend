const merge = require('webpack-merge')
const path = require('path')
// import _ from 'lodash'
import modifyResponse from 'node-http-proxy-json'

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
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy'
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
  proxy: [ // 代理配置
    [
      '/api', 
      { 
        target: 'http://sendrobot.ionchain.org', // api主机
        // pathRewrite: { '/api' : '' }
        // cookieDomainRewrite: '',
        changeOrigin: true,
        onProxyRes(proxyRes, req, res) {
          console.log('statusCode', proxyRes.statusCode)
          // console.log('session:', req.ctx.session)
          modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
            if (body) {
              console.log('body==>', body)
              if (proxyRes.req.path.indexOf('/users/login')>-1 && body.success == 0) {
                console.log('set session @@@@@@@@@@@@')
                req.ctx.session.userinfo = body.data
                req.session = body.data
                // proxyRes.headers['cookie'] = 'JSESSIONID=' + 'xxxxxxxxxxx'
              }
            }
            return body
          })
        },
        onClose(res, socket, head) {
          console.log('onCLose -->', res)
        },
        onProxyReq: function (proxyReq, req, res) {
        }
      }
    ],
    [
      '/mytest',
      { 
        target: 'http://localhost:3000', // api主机
        pathRewrite: { '/mytest' : '' }
      }
    ]
  ],
  router: {
    routes: [
    ]
  },
  serverMiddleware: ['~/middleware/auth']
}
