export default function ({ route, redirect, req }) {
  // console.log('$$$', Object.keys(arguments[0]).join(','), 'process.server>>>', process.server)
  // console.log('@@##', req.ctx.path, env, isServer)
  if (process.server && req) {
    if (!req.ctx.session.hasOwnProperty('userinfo') && (req.ctx.path === '/' || req.ctx.path === '/index' || req.ctx.path === '')) {
      redirect('/login')
    }
  }
}
