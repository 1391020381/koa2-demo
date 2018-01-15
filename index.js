const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaBodyParser = require('koa-bodyparser')
// const static = require('./middleware/static')
const koaStatic = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const router = require('./router')
app.use(koaBodyParser())

// 配置存储session信息的mysql

let store = new MysqlSession({
  user: 'root',
  password: 'abc123',
  database: 'koa_demo',
  host: 'localhost'
})

// 存放sessionId的cookie配置

let cookie = {
  maxAge: '',//
  expires: '',
  path: '',
  domain: '',
  httpOnly: '',
  overwrite: '',
  secure: '',
  sameSite: '',
  signed: ''
}
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

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
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
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


/**
 * koa2原生功能只提供了cookie的操作,但是没有提供session操作。session就只用自己实现或者通过第三方中间件实现。在koa2中实现session的方案有以下几种
 * 如果session数据量很小,可以直接存在内存中
 * 如果session数据量很大,则需要存储介质存放session数据
 *
 * 数据库存储方案
 * 将session存放在MySQL数据库中
 * 需要用到中间件
 *    koa-session-mininal 适用于koa2的session中间件,提供存储介质的读写接口
 *    koa-mysql-session为koa-session-minimal中间件提供MySQL数据库的seesion数据读写操作
 *
 *    将sessionId和对应的数据存到数据库
 *
 *    将数据库的存储的sessionId存到页面的cookie中
 *    根据cookie的sessionId出获取对应的session信息
 *
 * **/



