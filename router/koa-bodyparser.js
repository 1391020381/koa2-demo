/**
 * 对于POST请求的处理,koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
 *
 * **/

const Router = require('koa-router')
const koaBodyParser = require('koa-bodyparser')

const bodyParser = new Router()

bodyParser.get('/', async (ctx) => {

})

bodyParser.post('/',async (ctx)=>{

})