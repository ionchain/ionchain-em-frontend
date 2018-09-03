var Router = require('koa-router')
var _ = require('lodash')
var router = new Router()
const axios = require('axios')

// 全局数据绑定
router.all('*', (ctx, next) => {
	var state = {}
	if (ctx.session.userinfo) {
		Object.assign(ctx.state, {
			userinfo: ctx.session.userinfo
		})
	}
	return next()
})
router.get('/local-api/logout', async (ctx, next) => {
	ctx.session = null
	ctx.body = {
		message: '退出成功',
		success: 0
	}
})
/*--接口代理 start--*/
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
			ctx.response.set({ 'set-cookie': res.headers['set-cookie'] })
		}
		for (let prop in custormHeaders) {
			if (res.headers.hasOwnProperty(prop)) {
				ctx.response.set({ [prop]: res.headers[prop] })
			}
		}
		ctx.response.set({ 'content-type': res.headers['content-type'] })
		ctx.body = res.data
		if (ctx.request.url.indexOf(('/users/login') > -1 && ctx.body.success === 0)) {
			ctx.session.userinfo = res.data.data
		}
	}).catch((err) => {
		ctx.body = err.response.statusText
		ctx.status = err.response.status
	}).then(() => {
	})
})
/*--接口代理 end--*/

// 用户权限
function userAuth() {
	return (ctx, next) => {
		if(!ctx.userinfo.userinfo) {
			ctx.redirect('/login')
		}
		return next()
	}
}

/*--页面路由 start--*/
router.get('/', async (ctx, next) => {
	if (_.isEmpty(ctx.session.userinfo)) {
		ctx.redirect('/login')
	}
	ctx.render('index', {
		currentpage: 'home'
	})
})
// 登录
router.get('/login', async (ctx, next) => {
	ctx.render('login', {
		currentpage: 'login'
	})
})

//找回密码页面
router.get('/retrieve', async (ctx, next) => {
	ctx.render('retrieve', {
		currentpage: 'retrieve'
	})
})
//注册
router.get('/register', async (ctx, next) => {
	ctx.render('register', {
		currentpage: 'register'
	})
})
/*--页面路由 end--*/
module.exports = router