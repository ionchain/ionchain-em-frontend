const Koa = require('koa')
const session = require('koa-session')

// var proxy = require('http-proxy-middleware')
const koaBody = require('koa-body')
const Pug = require('koa-pug')
const koaStatic = require('koa-static')
const router = require('./routers.js')
var createLogger = require('concurrency-logger').default

const logger = createLogger({})

async function start () {
  const app = new Koa()

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
    thousandth: function(num, options){
      num = num * 1
      let [sInt, sFloat] = (Number.isInteger(num) && options.point ? `${num}` : num.toFixed(options.point)).split('.')
      sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,')
      return sFloat ? `${sInt}.${sFloat}` : `${sInt}`
    }
  };

  pug.use(app)

  app
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
