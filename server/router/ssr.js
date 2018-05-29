// 生产环境的服务端渲染
const SeverRender = require('./server-render')
const KoaRouter = require('koa-router')
const VueServerRender = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)
const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
const pageRouter = new KoaRouter()
pageRouter.get('*', async (ctx) => {
  await SeverRender(ctx, renderer, template)
})

module.exports = pageRouter
