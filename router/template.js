const Router = require('koa-router')
const views = require('koa-views')
const template = new Router()
const path = require('path')
const path_dirname = require('../path')

// 加载模板引擎
// Must be used before any router is used
// app.use(views(path.join(__dirname, './views'), {
//   extensions: 'ejs'
// }))
template.use(views(path.join(path_dirname, './views'), {extensions: 'ejs'}))    // 路由中间件
console.log('path_dirname', path.join(path_dirname, './views'))
template.get('/index', async (ctx) => {
  console.log(ctx, ctx.render)
  let title = 'justdoit'
  await ctx.render('index', {
    title
  })
})

module.exports = template