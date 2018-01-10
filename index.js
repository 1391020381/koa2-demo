const Koa = require('koa')
const app = new Koa()
const router = require('./router')
app.use(router.routes(), router.allowedMethods())
app.listen(3000, () => {
  console.log(`koa2 is listening 3000`)
})
