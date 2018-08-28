const Koa = require('koa')
const session = require('koa-session')

// var proxy = require('http-proxy-middleware')
const axios = require('axios')
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
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  }

  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 2018

  router.get('/local-api/logout', async (ctx, next) => {
    ctx.session = null
    ctx.body = {
      message: '退出成功',
      success: 0
    }
  })
  router.all(/^\/api/, async (ctx, next) => {
    var url = ''
    var custormHeaders = {}
    var headersProps = ['token']
    var target = 'http://sendrobot.ionchain.org'
    // var target = 'http://ionc_stoer.ionchain.org:8001'
    headersProps.forEach((item) => {
      if (ctx.req.headers.hasOwnProperty(item)) {
        custormHeaders[item] = ctx.req.headers.token
      }
    })

    url = target + ctx.request.url
    // console.log('proxy url @@', url, ctx.request.body)

    var options = {
      url: url,
      method: ctx.req.method,
      headers: {
        cookie: ctx.req.headers.cookie ? ctx.req.headers.cookie : '',
        'content-type': ctx.req.headers['content-type'],
        'connection': ctx.req.headers['connection'],
        ...custormHeaders
      },
      params: ctx.request.params,
      data: ctx.request.body
    }
    await axios(options).then((res) => {
      if (res.headers.hasOwnProperty('set-cookie')) {
        ctx.response.set({'set-cookie': res.headers['set-cookie']})
      }
      for (let prop in custormHeaders) {
        if (res.headers.hasOwnProperty(prop)) {
          ctx.response.set({[prop]: res.headers[prop]})
        }
      }
      ctx.response.set({'content-type': res.headers['content-type']})
      ctx.body = res.data
      if (ctx.request.url.indexOf(('/users/login') > -1 && ctx.body.success === 0)) {
        ctx.session.userinfo = res.data.data
      }
    }).catch((err) => {
      // console.log('err===>', err)
      ctx.body = err.response.statusText
      ctx.status = err.response.status
    }).then(() => {
    })
  })

  const pug = new Pug({
    viewPath: './views'
  })
  pug.use(app)

  app
  .use(logger)
  .use(koaStatic('./static',{}))
  .use(koaBody())
  .use(session(CONFIG, app))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, host)

  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
