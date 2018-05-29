const KoaRouter = require('koa-router')
const KoaSend = require('koa-send')

const staticRouter = new KoaRouter({ prefix: '/public' })
staticRouter.get('/*', async (ctx) => {
  await KoaSend(ctx, ctx.path)
})
module.exports = staticRouter
