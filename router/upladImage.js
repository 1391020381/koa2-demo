const Router = require('koa-router')
const uploadImage = new Router()
const path = require('path')
const _uploadImage = require('../util/uploadImage')

uploadImage.get('/', async (ctx, next) => {
  await  ctx.render('image')
})
uploadImage.post('/api/picture/upload.json', async (ctx, next) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, '../static/image')

  result = await _uploadImage(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  await console.log(result)
  ctx.body = result
})

module.exports = uploadImage