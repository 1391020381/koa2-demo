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
    let postData = await  parsePostData(ctx)
    ctx.body = postData
  }
)

module.exports = Post


// 将POST请求参数字符串解析成JSON

function parseQueryStr (queryStr) {
  console.log('queryStr:' + JSON.stringify(queryStr))
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log(queryStrList)
  // [].entries()   ES6的 提供的新的三个方法 ——entries()，keys()和values() ——用于遍历数组
  // keys()是对键名的遍历  values是对键值的遍历 entries()是对键值对的遍历（比如下面的 [index,queryStr] index 是键 queryStr是值）
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

// 解析上下文里node原生的POST参数    ctx.req （Node 原生 response 的object）  ctx.request (A koa  request  object)   https://github.com/koajs/koa/blob/master/docs/api/context.md

function parsePostData (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ""
      ctx.req.addListener('data', (data) => {
        postData += data
      })
      ctx.req.addListener("end", function () {
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}















