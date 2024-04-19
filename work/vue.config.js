module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',  // Flask 后端的地址
          changeOrigin: true,
          pathRewrite: {'^/api': ''}
        }
      }
    }
  }
  