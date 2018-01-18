const home = require('./home')
const page = require('./page')
const post = require('./post')
const template = require('./template')
const uploadFile = require('./uploadFile')
const uploadImage = require('./upladImage')
const koaBodyParser = require('./koa-bodyparser')
const Router = require('koa-router')

let router = new Router()
router.use('/template', template.routes(), template.allowedMethods())
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/post/form', post.routes(), page.allowedMethods())
router.use('/busboy/uploadFile', uploadFile.routes(), uploadFile.allowedMethods())
router.use('/busboy/uploadImage', uploadImage.routes(), uploadImage.allowedMethods())
router.use('/post/form/koaBodyParser', koaBodyParser.routes(), koaBodyParser.allowedMethods())
// home(home.js),page(page.js) 都是单个自路由, router(index.js)是路由的入口。 router.use('/page',page.routes,page.allowedMethods())  /page是为所有page.js中的路由加上/page前缀
module.exports = router