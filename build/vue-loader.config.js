module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev,
    cssModules: {
      // css module 生成类名的命名规则
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      // css module 调用类名使用驼峰式
      camelCase: true
    }
  }
}
