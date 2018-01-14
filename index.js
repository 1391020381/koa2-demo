const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaBodyParser = require('koa-bodyparser')
// const static = require('./middleware/static')
const koaStatic = require('koa-static')
app.use(koaBodyParser())

const router = require('./router')

app.use(router.routes(), router.allowedMethods())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(koaStatic(path.join( __dirname,  staticPath)))
// app.use(static())  //中间件必须是函数(static必须返回一个函数)

app.listen(3000, () => {
  console.log(`koa2 is listening 3000`)
})
