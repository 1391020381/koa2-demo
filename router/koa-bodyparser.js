/**
 * 对于POST请求的处理,koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
 *
 * **/

const Router = require('koa-router')
const bodyParser = new Router()

bodyParser.get('/', async (ctx) => {
    let html = `
    <h1>koa2 request post demo</h1>
    <form method="POST" action="/post/form/koaBodyParser">
    <p>userName</p>
    <input name ="userName"><br/>
    <p>nickName</p>
    <input name="nickName"><br/>
    <p>email</p>
    <input name="email"><br/>
    <button type="submit"> submit</button>
  </form>
    `
    ctx.body = html
})

bodyParser.post('/',async (ctx)=>{
let postData =ctx.request.body
let test = ctx.req.body
ctx.body = postData
})

module.exports = bodyParser