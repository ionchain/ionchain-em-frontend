const Koa = require('koa')
const session = require('koa-session')

const koaBody = require('koa-body')
const Pug = require('koa-pug')
const koaStatic = require('koa-static')
const router = require('./routers.js')
var createLogger = require('concurrency-logger').default
const locale = require('koa-locale')
const i18n = require('koa-i18n')
const proxy = require('koa-proxies')
// const httpsProxyAgent = require('https-proxy-agent'))

const logger = createLogger({})

async function start () {
  const app = new Koa()
  locale(app, 'language')
  app.keys = ['some_secret_hurr']


  const CONFIG = {
    key: 'koa-sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    // maxAge: 86400000, //24小时
    maxAge:3600000, //一小时
    // maxAge: 2000, // 2秒
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  }

  const host = process.env.HOST || 'localhost'
  const port = process.env.PORT || 2018

  const pug = new Pug({
    viewPath: './views',
    noCache: true
  })

  pug.options.filters = {
  };


  var proxyMiddleware = proxy('/browser-api', {
    target: 'http://192.168.23.164:3001',
    changeOrigin: true,
    // agent: new httpsProxyAgent('http://1.2.3.4:88'), // if you need or just delete this line
    rewrite: path => path.replace(/^\/browser-api/, ''),
    logs: true,
    events: {
      error (err, req, res) {
        console.log("proxy err", err)
      },
      proxyReq (proxyReq, req, res) { 
      },
      proxyRes (proxyRes, req, res) {
      }
    }
  })

  pug.use(app)

  app  
  .use(proxyMiddleware)
  .use(i18n(app, {
    directory: __dirname + '/locales',
    locales: ['zh-CN', 'en'], //  `zh-CN` defualtLocale, must match the locales to the filenames
    modes: [
      'query',                //  optional detect querystring - `/?locale=en-US`
      'subdomain',            //  optional detect subdomain   - `zh-CN.koajs.com`
      'cookie',               //  optional detect cookie      - `Cookie: locale=zh-TW`
      'header',               //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
      'url',                  //  optional detect url         - `/en`
      'tld',                  //  optional detect tld(the last domain) - `koajs.cn`
      function() {
      }           //  optional custom function (will be bound to the koa context)
    ]
  }))
  .use(logger)
  .use(koaStatic('./static',{maxage: 0}))
  .use(koaBody())
  .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, host)

  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
