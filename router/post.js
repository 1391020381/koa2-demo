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
  console.log('queryStr:' + JSON.stringify(queryStr))    // queryStr:"userName=justdoit&nickName=12321&email=000000"
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
        //  data:{"type":"Buffer","data":[117,115,101,114,78,97,109,101,61,106,117,115,116,100,111,105,116,38,110,105,99,107,78,97,109,101,61,49,50,51,50,49,38,101,109,97,105,108,61,48,48,48,48,48,48]}
        console.log('data:' + JSON.stringify(data))
        // dataString:"userName=justdoit&nickName=12321&email=000000"
        console.log('dataString:' + JSON.stringify(data.toString()))
        postData += data
      })
      // form表单使用原生的事件拼接后 queryStr:"userName=justdoit&nickName=12321&email=000000"
      ctx.req.addListener("end", function () {
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}















