const Router = require('koa-router')
const uploadFile = new Router()
const _uploadFile = require('../util/uploadFile')
const path = require('path')
uploadFile.get('/', async (ctx, next) => {
  let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/busboy/uploadFile/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
  ctx.body = html
})
uploadFile.post('/upload.json', async (ctx, next) => {
  let result = {success: false}
  let serverFilePath = path.join(__dirname, '../upload-files')

  result = await _uploadFile(ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})
module.exports = uploadFile