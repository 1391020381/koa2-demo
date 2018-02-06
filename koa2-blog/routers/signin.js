const router = require('koa-router')()
const userModel = require('../lib/mysql')
const md5 = require('md5')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin


router.get('/signin', async (ctx, next) => {
  // await checkNotLogin(ctx)
  await ctx.render('signin', {
    session: ctx.session
  })
})

router.post('/signin', async (ctx, next) => {
  console.log('req:', ctx.req.body, 'request:', ctx.request.body)
  let name = ctx.request.body.name
  let pass = ctx.request.body.password
  await userModel.findDataByName(name).then(result => {
    let res = result
    if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
      ctx.body = true
      ctx.session.user = res[0]['name']
      ctx.session.id = res[0]['id']
    } else {
      ctx.body = false
    }
  }).catch(err => {
    console.log(err)
  })
})
module.exports = router