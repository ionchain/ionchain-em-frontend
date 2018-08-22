module.exports = function (req, res, next) {
  console.log('path>>>', req.ctx.path)
  console.log('session@@@', req.ctx.session)
  next()
}
