console.log(`运行环境：${process.env.NODE_ENV}`)
// const devServerTarger = '' // 开发环境
// const devServerTarger = '' // 测试环境
// const devServerTarger = '' // 生产环境

const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/visitor/' : './',
  outputDir: 'visitor',
  assetsDir: 'static',
  devServer: {
    port: 8001,
    // proxy: {
		// 	'/proxyApis': {
		// 		target: 'https://test.bcirclepay.com:8443',
		// 		ws: true,
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/proxyApis': ''
		// 		}
		// 	}
		// }
  },
  lintOnSave: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
      // 开启js、css压缩
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css|.\scss/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        views: '@/views',
        tools: '@/tools',
        common: '@/common',
        store: "@/store",
        assets: "@/assets"
      }
    }
  },
}