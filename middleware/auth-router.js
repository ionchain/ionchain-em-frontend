import _ from 'lodash'
export default function ({ route, redirect, req }) {
  // console.log('$$$', Object.keys(arguments[0]).join(','), 'process.server>>>', process.server)
  if (process.server && req) {
    let userinfo = _.get(req.ctx.session,'userinfo',{})
    if (_.isEmpty(userinfo) && (req.ctx.path.indexOf('/user')==0 )) {
      redirect('/login')
    }
  }
}
