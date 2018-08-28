var Router = require('koa-router')
var _ = require('lodash')
var router = new Router()

router.get('/', async (ctx, next) => {
    if (_.isEmpty(ctx.session.userinfo)) {
        ctx.redirect('login')
    }
    ctx.render('index', {
        BASE_URL: '/'
    })
})

router.get('/login', async (ctx, next) => {
    ctx.render('login', {
        BASE_URL: '/'
    })
})

module.exports = router