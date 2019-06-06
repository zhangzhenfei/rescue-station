module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/rescue-api': {
          target: 'http://rescue.sadais.com',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '/rescue-api': '/'
          }
        }
      }
    }
  }
}
