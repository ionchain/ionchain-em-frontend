module.exports = function (req, res, next) {
  if (req.ctx.session.hasOwnProperty('userinfo')) {
    // req.ctx.session.userinfo = req.ctx.session.userinfo
  }
  next()
}
