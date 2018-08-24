import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
const session = require('koa-session')
var Router = require('koa-router')
var router = new Router()
var proxy = require('http-proxy-middleware')
const axios = require('axios')
const koaBody = require('koa-body')

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

  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  router.get('/logout', async (ctx, next) => {
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

  app
  .use(koaBody())
  .use(session(CONFIG, app))
  .use(router.routes())
  // .use(router.allowedMethods())
  .use(ctx => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  .listen(port, host)

  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
