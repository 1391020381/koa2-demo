const Router = require('koa-router')
const router = new Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const moment = require('moment')
const fs = require('fs')

//注册页面

router.get('/signup', async (ctx, next) => {
  // await checkNotLogin(ctx)
  await ctx.render('signup')
})

module.exports = router
