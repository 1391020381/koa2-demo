const Router = require('koa-router')
const home = new Router()
// 子路由1
home.get('/', async (ctx) => {
  let html = `
  <ul>
  <li><a href="/page/helloworld">/page/helloworld</a></li>
  <li><a href="/page/404">/page/404</a></li>
  <li><a href="/post/form">/post/form</a></li>
  <li><a href="/post/form/koaBodyParser">/post/form/bodyParser</a></li>
    <li><a href="/template/index">/template/index</a></li>
     <li><a href="/busboy/uploadFile">/busboy/uploadFile</a></li>
      <li><a href="/busboy/uploadImage">/busboy/uploadFile</a></li>
</ul>
  `
  ctx.body = html
})

module.exports = home