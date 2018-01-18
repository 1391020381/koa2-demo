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

  // 开始解析文件流
  file.on('data', function (data) {
    console.log(`File [${filedname}got${data.length} bytes]`)
  })
  // 解析文件结束
  file.on('end', function () {
    console.log(`File [${filedname}] Finished`)
  })
})

// 监听请求中的字段
busboy.on('filed', (fieldname, val, fieldnameTruncated, varTruncated) => {
  console.log(`Field [${fieldname}]:value:${inspect(val)}`)
})

// 监听结束事件
busboy.on('finish', function () {
  console.log('Done parsing form!')
  res.writeHead(303, {Connection: 'close', Location: '/'})
  res.end()
})
req.pipe(busboy)




