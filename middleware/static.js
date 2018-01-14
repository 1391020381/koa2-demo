/**
 * koa原生的静态资源中间件(接受 ctx参数,处理的函数s)
 * 
 */

// function static(ctx){  // 返回一个async函数
//     return async (ctx)=>{

//     }
// }

const path = require('path')
const content = require('../util/content')
const mimes = require('../util/mimes')

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '../static'
console.log('__dirname:' + path.join(__dirname,staticPath))
function static(ctx){
   return async (ctx)=>{
        // 静态资源目录在本地的绝地路径
    let fullStaticPath = path.join(__dirname,staticPath)
    // 获取静态资源内容,有可能是文件内容,目录 或者404
    let _content = await content(ctx,fullStaticPath)
    let _mime = parseMime(ctx.url)
    // 如果有对应的文件类型,就配置上下文的类型
    if(_mime){
        ctx.type = _mime
    }
    // 输出静态资源内容
    if(_mime&&_mime.indexOf('image/')>=0){
        // 如果是图片,则用node原生的res,输出二进制数据
        ctx.res.writeHead(200)
        ctx.res.write(_content,'binary')
        ctx.res.end()
    }else{
        // 其他则输出文本
        ctx.body = _content
    }
   }
}

// 解析资源类型

function parseMime(url){
    let extName = path.extname(url)
    extName = extName?extName.slice(1):'unknown'
    return mimes[extName]
}

module.exports = static