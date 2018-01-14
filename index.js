const Koa = require('koa')
const app = new Koa()
const koaBodyParser = require('koa-bodyparser')
const static = require('./middleware/static')

app.use(koaBodyParser())

const router = require('./router')

app.use(router.routes(), router.allowedMethods())

app.use(static())  //中间件必须是函数(static必须返回一个函数)

app.listen(3000, () => {
  console.log(`koa2 is listening 3000`)
})
