/**
 * 读取目录内容
 */

 const url = require('url')
 const fs = require('fs')
 const path = require('path')

 // 遍历读取目录内容方法

 const walk = require('./walk')

 /**
  * 封装目录内容
  @params {string}URL当前请求的上下文中的URL,即 ctx.url
  @ params {string} reqPath 请求静态资源的完整本地路径
  @parms {string} 返回目录内容  封装程html
  */

  function  dir(url ,reqPath) {
      // 遍历读取当前目录下的文件、子目录
        let contentList = walk(reqPath)
        let html = `<ul>`
        for(let [index,item] of contentList.entries()){
          html = `${html}<li><a href="${url === '/'?'':url}/${item}">${item}</a>`  
        }
        html =`${html}</ul>`
        
        return html
  }

  module.exports = dir