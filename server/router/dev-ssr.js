const KoaRouter = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRender = require('vue-server-renderer')
const ServerConfig = require('../../build/webpack.config.server')
const path = require('path')
const serverRender = require('./server-render')
const ServerCompiler = webpack(ServerConfig)
const mfs = new MemoryFS()
ServerCompiler.outputFileSystem = mfs

let bundle
// 监听 webpack.config.server.js文件改动
ServerCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => {
    console.warn(warn)
  })

  const bundlePath = path.join(ServerConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle created')
})

const handleSSR = async (context) => {
  if (!bundle) {
    context.body = 'wait a second, process...'
    return
  }
  const clientManifestRsp = await axios.get('http://127.0.0.1:9000/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestRsp.data
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRender.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(context, renderer, template)
}

const router = new KoaRouter()
router.get('*', handleSSR)
module.exports = router
