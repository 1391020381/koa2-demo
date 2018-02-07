const router = require('koa-router')()
const userModel = require('../lib/mysql')
const moment = require('moment')
const checkNotLogin = require('../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const md = require('markdown-it')()   // markdown语法

router.get('/', async (ctx, next) => {
  ctx.redirect('/posts')
})

// 发表文章页面
router.get('/create', async (ctx, next) => {
  await ctx.render('create', {
    session: ctx.session
  })
})

router.post('/create', async (ctx, next) => {
  // 将前端的数据插入数据库
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

// 文章列表

router.get('/posts', async (ctx, next) => {   // Get raw query string void of ?.
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


// 单篇文章页
// req.params  另一种方法传参数给服务器,但是这不算是传统标准的做法,是属于 HTTP Routing的延伸应用
// req.params：解析URL中占位符,如/:name,访问/haha ,req.params的值为{name:'haha'}
router.get('/posts/:postId', async (ctx, next) => {
  let comment_res,
    res,
    pageOne,
    res_pv
  await userModel.findDataById(ctx.params.postId).then(result => {
    res = result
    res_pv = parseInt((result[0]['pv']))
    res_pv += 1
  })
  await userModel.updatePostPv([res_pv, ctx.params.postId])
  await userModel.findCommentByPage(1, ctx.params.postId).then(result => {
    pageOne = result
  })
  await  userModel.findCommentById(ctx.params.postId).then(result => {
    comment_res = result
  })
  await ctx.render('sPost', {
    session: ctx.session,
    posts: res[0] || [],
    commentLength: comment_res.length,
    commentPageLength: Math.ceil(comment_res.length / 10),
    pageOne: pageOne || []
  })
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


// 发表评论

router.post('/:postId', async (ctx, next) => {
  let name = ctx.session.user,
    content = ctx.request.body.content,
    postId = ctx.params.postId,
    res_comments,
    time = moment().format('YYYY-MM-DD HH:mm:ss'),
    avator
  await userModel.findUserData(ctx.session.user).then(res => {
    avator = res[0].avator
  })
  await  userModel.insertComment([name, md.render(content), time, postId, avator])
  await userModel.findCommentById(postId).then(result => {
    res_comments = parseInt(result[0].comments)
    res_comments += 1
  })
  await userModel.updatePostComment([res_comments, postId]).then((res) => {
    ctx.body = true
  }).catch(err => {
    ctx.body = false
  })
})

// 评论分页
router.post('/posts/:postId/commentPage', async function (ctx) {
  let postId = ctx.params.postId
  page = ctx.reques.body.page
  await userModel.findCommentByPage(page, postId).then(res => {
    ctx.body = res
  }).catch(() => {
    ctx.body = 'error'
  })
})
module.exports = router
