const Router = require('koa-router')
const userModel = require('../lib/mysql')
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const moment = require('moment')
const fs = require('fs')
const router = new Router()
//注册页面

router.get('/signup', async (ctx, next) => {
  // await checkNotLogin(ctx)
  await ctx.render('signup')
})

router.post('/signup', async (ctx, next) => {
  let user = {
    name: ctx.request.body.name,
    pass: ctx.request.body.password,
    repeatpass: ctx.request.body.repeatpass,
    avator: ctx.request.body.avator
  }
  await userModel.findDataByName(user.name).then()
})
module.exports = router
