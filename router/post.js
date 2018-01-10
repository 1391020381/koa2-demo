const router = require('koa-router')
const Post = new router()
Post.get('/', async (ctx) => {
  let html = `
  <h1>koa2 request post demo</h1>
  <form method="POST" action="/post/form">
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
Post.post('/', async (ctx) => {   // 注意中间件都是async的形式,否则不会响应
    ctx.body = 'success'
  }
)

module.exports = Post


// 将POST请求参数字符串解析成JSON