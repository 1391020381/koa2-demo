/**
 * busboy模块是用来解析POST请求,node原生req中的文件流
 * **/


const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

// req为node 原生请求

const busboy = new Busboy({header: req.header})

// 监听文件解析事件
busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
  console.log(`File [${fieldname}]:filename:${filename}`)
  //文件保存特定路径
  file.pipe(fs.createWriteStream('./upload'))
})





