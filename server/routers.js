var Router = require('koa-router')
var _ = require('lodash')
var router = new Router()
const axios = require('axios')
var config = require('./config.js')
var service = require('./service.js')
const utils = require('./utils.js')
const  SessionMaxAge = 3600000
const  SessionMaxAgeLong = 86400000 * 30 // a month

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
	var target = config.target
	// var target = 'http://ionc_stoer.ionchain.org:8001'
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
			ctx.response.set({ 'set-cookie': res.headers['set-cookie'] })
		}
		for (let prop in custormHeaders) {
			if (res.headers.hasOwnProperty(prop)) {
				ctx.response.set({ [prop]: res.headers[prop] })
			}
		}
		ctx.response.set({ 'content-type': res.headers['content-type'] })
		ctx.body = res.data
		if (ctx.request.url.indexOf(('/users/login') > -1 && res.data.success === 0)) {
			ctx.session.userinfo = res.data.data
			if(_.get(ctx.request.body, 'loginLong') == 'on' ) {
				ctx.session.maxAge = SessionMaxAgeLong
			}
		}
	}).catch((err) => {
		try{
			ctx.body = err.response.statusText
			ctx.status = err.response.status
		}catch(e){
			for(let prop in err.response){
				console.log('@@@>>', prop);
			}
		}
		
	}).then(() => {
	})
})
/*--接口代理 end--*/

// 用户权限
function userAuth() {
	return (ctx, next) => {
		console.log('userAuth@@@@@@')
		if(!ctx.session.userinfo) {
			ctx.redirect('/login')
		}
		return next()
	}
}

/*--页面路由 start--*/
router.get('/', async (ctx, next) => {
	// if (_.isEmpty(ctx.session.userinfo)) {
	// 	ctx.redirect('/login')
	// }
	ctx.redirect('/home')
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
// 
router.get("/article", async (ctx, next) => {
	ctx.render('article', {
		currentpage: 'article'
	})
})
//注册
router.get('/register', async (ctx, next) => {
	ctx.render('register', {
		currentpage: 'register'
	})
})

/*--个人中心页面 start--*/

// 我的发布
router.get("/user/release", userAuth(), async (ctx, next) => {
	var deviceList = [];
	await service.getDeviceList({userId: 2}).then((data)=>{
		deviceList = data;
	})
	ctx.render('user/release', {
		currentpage: 'release',
		deviceLists: deviceList
	})
})

// 我的收藏
router.get("/user/collect", userAuth(), async (ctx, next) => {
	var collectList = [];
	await service.getCollectList({collectId: 2}).then((data)=>{
		collectList = data;
	})
	ctx.render('user/collect', {
		currentpage: 'collect',
		collectLists: collectList
	})
})

// 消息中心
router.get("/user/message", userAuth(), async (ctx, next) => {
	ctx.render('user/message', {
		currentpage: 'message'
	})
})

// 投诉与反馈
router.get("/user/comp", userAuth(), async (ctx, next) => {
	ctx.render('user/comp', {
		currentpage: 'comp'
	})
})

// 账号设置
router.get("/user/account", userAuth(), async (ctx, next) => {
	var userinfo = {}
	await service.userInfo({userId: 2}).then((data)=>{
		userinfo = data
	})
	ctx.render('user/account', {
		currentpage: 'account',
		userinfo: userinfo
	})
})

/*--个人中心页面 end*/

// 设备添加/发布设备
router.get('/equipment-add', (ctx, next) => {
	ctx.render('equipment-add', {
		currentpage: 'equipment-add'
	})
})
// 首页
router.get('/home', async (ctx, next) => {
	var deviceList = [],
	totalIncome;
	// await service.getDeviceDesc({deviceId: 8}).then((data)=>{
	// 	console.log('deviceDesc', data);
	// })

	await service.getDeviceList({userId: 2}).then((data)=>{
		deviceList = data;
	})
	await service.getHisProfit({}).then((data)=>{
		console.log('getHisProfit', data);
		totalIncome = data
	})
	
	ctx.render('home', {
		currentpage: 'home',
		totalIncome: utils.thousandth(totalIncome.totalIncomeIonc),
		deviceLists: deviceList
	})
})
//下载调用
router.get('/download_can', (ctx, next) => {
	ctx.render('download_can', {
		currentpage: 'download_can'
	})
})
/*--页面路由 end--*/

//测试api
router.post('/test/getSmsCode', async (ctx, next) => {
	ctx.body = {"success":0,"message":"ok","data":{"msg":"success","code":0}}
})


// router.all(/^\/user/, userAuth());

module.exports = router