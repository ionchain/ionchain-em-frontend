import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
const session = require('koa-session')
var Router = require('koa-router')
var router = new Router()
const axios = require('axios')
const koaBody = require('koa-body')
const proxy = require('koa-proxies')
var proxyMid = require('http-proxy-middleware')
const koaConnect = require('koa-connect')
const modifyResponse = require('node-http-proxy-json')
const _ = require('lodash')
const path = require('path')

var proxyOption = {
  target: 'http://sendrobot.ionchain.org',
  // target: 'http://localhost:8360',
  changeOrigin: true, // needed for virtual hosted sites
  // ws: true, // proxy websockets
  pathRewrite: {
    // '^/api/old-path': '/api/new-path', // rewrite path
  },
  onProxyReq(proxyReq, req, res) {
    Object.keys(req.headers).forEach(function (key) {
      // proxyReq.headers[key] = req.headers[key]
      // proxyReq.setHeader(key, req.headers[key])
    })
    proxyReq.setHeader('cookie', "sessionid="+_.get(req.headers, 'cookie', ''))
    
    for(let prop in req.headers){
      console.log("onProxyReq #######", prop)
    }
    console.log("onProxyReq <<<", proxyReq.path)
    // proxyReq.headers['cookie'] = _.get(req.headers, 'cookie')
    // _.set()
    
    // add custom header to request
    // proxyReq.setHeader('x-added', 'foobar')
    
    // console.log(req.headers.origin,"@@@@@@@@@@@@@@@@@@@@")
  },
  onProxyRes:function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Credentials'] = true
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    proxyRes.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    // Object.keys(res.headers).forEach(function (key) {
    //   proxyRes.setHeader(key, res.headers[key])
    // });
    // proxyRes.setHeader('set-cookie', _.get(res.headers, 'set-cookie'))
    for(let prop in res){
      console.log("onProxyRes %%%%%%%%%%%%%%%%%%%", prop)
    }
    // console.log('@@@@@@@@@@@###', req.ctx)
    // console.log("onProxyRes", req.headers);
    console.log("----------------------------");
    // console.log("req", req.headers);
    proxyRes.on('data',function(data){
      modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
        
        if (body) {
          console.log('body==>', body)
          if (proxyRes.req.path.indexOf('/users/login')>-1 && body.success == 0) {
            // req.session.userinfo = body.data
            // _.set(req, 'session.userinfo', {test: "yes"})

            // proxyRes.headers['cookie'] = 'JSESSIONID=' + 'xxxxxxxxxxx'
            // if(_.get(req.ctx.request.body, 'loginLong') == 'on' ) {
            //   proxyRes.ctx.session.maxAge = SessionMaxAgeLong
            // }
          }
        }
        return body
      })
    })
    // proxyRes.headers['x-added'] = 'foobar' // add new header to response
    // delete proxyRes.headers['x-removed'] // remove header from response
  },
  
}

var proxyMiddleware = proxy('/api', {
  // target: 'http://192.168.23.164:3001',
  target: 'http://sendrobot.ionchain.org',
  changeOrigin: true,
  // agent: new httpsProxyAgent('http://1.2.3.4:88'), // if you need or just delete this line
  // rewrite: path => path.replace(/^\/api/, ''),
  logs: true,
  events: {
    error (err, req, res) {
      console.log("proxy err", err)
    },
    proxyReq (proxyReq, req, res) {
      console.log();
      Object.keys(req.headers).forEach(function (key) {
        proxyReq.headers[key] = req.headers[key]
      });
      // console.log("proxyReq", req.session)
      // console.log("req", req);
      // console.log("===================================");
    },
    proxyRes (proxyRes, req, res) {
      Object.keys(res.headers).forEach(function (key) {
        // res.append(key, proxyRes.headers[key]);
        proxyRes.headers[key] = res.headers[key]
      });
      // console.log("proxyRes", req.session)
      console.log("===================================");
      // console.log("res 2222", proxyRes.headers.data);
      for(let prop in proxyRes){
        // console.log("}}}}}}}}}}}}}}}}}}", prop)
      }
    }
  }
})

var _proxy = proxyMid('/api', proxyOption)

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
    headersProps.forEach((item) => {
      if (ctx.req.headers.hasOwnProperty(item)) {
        custormHeaders[item] = ctx.req.headers.token
      }
    })

    url = target + ctx.request.url
    console.log('proxy url @@', url, ctx.request.body)

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
      if (ctx.request.url.indexOf('/users/login') != -1 && ctx.body.success === 0) {
        ctx.session.userinfo = res.data.data
        console.log(ctx.request.url, "$$$$$$$$$$$$$$$$$$");
      }
    }).catch((err) => {
      console.log('err===>', err)
      ctx.body = err.response.statusText
      ctx.status = err.response.status
    })
  })

async function before (ctx, next) {
  if(ctx.query.locale){
    ctx.session.locale = ctx.query.locale
  }
  await next();
}

  app
  // .use(proxyMiddleware)
  // .use(koaConnect(_proxy))
  .use(before)
  .use(session(CONFIG, app))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
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
