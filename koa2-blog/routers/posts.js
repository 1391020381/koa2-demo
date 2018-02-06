const router = require('koa-router')()
const userModel = require('../lib/mysql')
const moment = require('moment')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const md = require('markdown-it')()   // markdown语法

router.get('/', async (ctx, next) => {
  ctx.redirect('/posts')
})


router.get('/posts', async (ctx, next) => {   // Get raw query string void of ?.
  console.log('querystring', ctx.request.querystring)
  let res,
    postsLength,
    name = decodeURIComponent(ctx.request.querystring.split('=')[1])
  if (ctx.request.querystring) {   // 个人的文章
    await userModel.findDataByName(name).then(result => {
      postsLength = result.length
    })
    await userModel.findPostByUserPage(name, 1).then(result => {
      res = result
    })
    await ctx.render('selfPosts', {
      session: ctx.session,
      posts: res,
      postPageLength: Math.ceil(postsLength / 10)
    })
  } else {  // 所有的文章
    await userModel.findPostByUserPage(1).then(result => {
      res = result
    })
    await userModel.findAllPost().then(result => {
      postsLength = result.length
    })
    await  ctx.render('posts', {
      session: ctx.session,
      posts: res,
      postsLength: postsLength,
      postsPageLength: Math.ceil(postsLength / 10)
    })

  }
})


// 首页分页,每次输出10条
router.post('/posts/page', async (ctx, next) => {
  let page = ctx.request.body.page
  await userModel.findPostByPage(page).then(result => {
    ctx.body = result
  }).catch(() => {
    ctx.body = 'error'
  })
})

// 个人文章分页,每次输出10条
router.post('/posts/self/page', async (ctx, next) => {
  let data = ctx.request.body
  await userModel.findPostByUserPage(data.name, data.page).then(result => {
    ctx.body = result
  }).catch(error => {
    console.log(error)
  })
})
