const Router = require('koa-router')
const uploadImage = new Router()
const path = require('path')
const _uploadImage = require('./uploadFile')

uploadImage.get('/', async (ctx, next) => {
  await  ctx.render('imgage')
})
uploadImage.post('/', async (ctx, next) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, '../static/image')

  result = await _uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})
