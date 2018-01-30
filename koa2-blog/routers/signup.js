const Router = require('koa-router')
const userModel = require('../lib/mysql')
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const moment = require('moment')
const fs = require('fs')
const path = require('path')
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
  await userModel.findDataByName(user.name).then(async (result) => {
    if (result.length) {
      try {
        throw Error('用户已存在')
      } catch (error) {
        console.log(error)
      }
      // 用户存在
      ctx.body = {
        data: 1
      }
    } else if (user.pass !== user.repeatpass || user.pass === '') {
      ctx.body = {
        data: 2
      }
    } else {
      let base64Data = user.avator.replace(/^data:image\/\w+;base64,/);
      let dataBuffer = new Buffer(base64Data, 'base64');
      let getName = Number(Math.random().toString().substr(3).toString())
      await fs.writeFile(path.join(__dirname, '/public/images/', getName, '.png'), dataBuffer, err => {
        if (err) throw err
        console.log('头像上传成功')
      })
      await userModel.insertData([user.name,md5(user.pass),getName,moment().format('YYYY-MM')])
    }
  })
})
module.exports = router
