const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaBodyParser = require('koa-bodyparser')
// const static = require('./middleware/static')
const koaStatic = require('koa-static')
app.use(koaBodyParser())

const router = require('./router')

app.use(async (ctx, next) => {
  console.log('ctx.url:', ctx.url)
  if (ctx.url === '/page/helloworld') {
    ctx.cookies.set('cid', 'hello,world', {  //
      domain: 'localhost',// 写cookie所在的域名
      path: '/',     // 写cookie所在的路径
      maxAge: 10 * 60 * 1000,  // cookie有效时长
      expires: new Date('2018-2-15'),  // cookie失效时间
      httpOnly: false,   // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    })
  }
  next()
})
app.use(router.routes(), router.allowedMethods())

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(koaStatic(path.join(__dirname, staticPath)))
// app.use(static())  //中间件必须是函数(static必须返回一个函数)

app.listen(3000, () => {
  console.log(`koa2 is listening 3000`)
})

// koa2使用cookie





