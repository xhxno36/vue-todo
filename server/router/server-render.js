const ejs = require('ejs')
module.exports = async (context, renderer, template) => {
  context['Content-Type'] = 'text/html'
  const ctx = {url: context.path}

  try {
    const appString = await renderer.renderToString(ctx)

    const { title } = ctx.meta.inject()
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
