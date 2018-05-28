import createApp from './create-app'

export default (context) => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      // 设置app里面的meta信息给context
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
