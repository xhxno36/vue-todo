const Koa = require('koa')
const koaSend = require('koa-send')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const staticRouter = require('./router/static')
// 用koa架设 HTTP 服务
const app = new Koa()

app.use(async (context, next) => {
  try {
    console.log(`request with path ${context.path}`)
    await next()
  } catch (error) {
    console.log(error)
    context.status = 500
    if (isDev) {
      context.body = error.message
    } else {
      context.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await koaSend(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./router/dev-ssr')
} else {
  pageRouter = require('./router/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
// 监听端口
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
