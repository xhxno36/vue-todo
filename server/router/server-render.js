const ejs = require('ejs')
module.exports = async (context, renderer, template) => {
  context['Content-Type'] = 'text/html'
  const ctx = {url: context.path}

  try {
    // 获取渲染后的应用字符串
    const appString = await renderer.renderToString(ctx)
    // 读取server-entry里面设置的meta信息
    const { title } = ctx.meta.inject()
    // 将数据渲染到页面模板里面 返回最终的html
    const html = ejs.render(template, {
      title: title.text(),
      appString,
      style: ctx.renderStyles(),
      scripts: ctx.renderScripts()
    })

    context.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
