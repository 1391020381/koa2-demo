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
  console.log('querystring', ctx.request.querystring, ctx.request)
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
    await userModel.findPostByPage(1).then(result => {
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


// 发表文章页面

router.get('/create', async (ctx, next) => {
  await ctx.render('create', {
    session: ctx.session
  })
})

router.post('/create', async (ctx, next) => {
  // 将前端的数据插入数据库
  console.log('createCtx:', ctx)
  console.log('createSession:', ctx.session)
  let title = ctx.request.body.title,
    content = ctx.request.body.content,
    id = ctx.session.id,
    name = ctx.session.user,
    time = moment().format('YYYY-MM-DD HH:mm:ss'),
    avator

  // html的转义
  await userModel.findUserData(ctx.session.user).then(result => {
    avator = result[0].avator
  })
  await userModel.insertPost([name, title, content, md.render(content), id, time, avator]).then(result => {
    ctx.body = true
  }).catch(() => {
    ctx.body = false
  })
})

// post 发表文章
module.exports = router
