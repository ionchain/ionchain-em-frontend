export default function ({ route, redirect, req }) {
  // console.log('$$$', Object.keys(arguments[0]).join(','), 'process.server>>>', process.server)
  if (process.server && req) {
    // console.log('session@@', req.ctx.session.userinfo)
    if (!req.ctx.session.userinfo && (req.ctx.path === '/' || req.ctx.path === '/index')) {
      redirect('/login')
    }
  }
}
