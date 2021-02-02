const CompressionPlugin = require('compression-webpack-plugin')
const webSiteAddress = process.env.WEBSITE_ADDRESS
	? process.env.WEBSITE_ADDRESS
	: ''

// const devServerTarger = 'http://10.79.10.39/ces-api' // 开发环境
const devServerTarger = 'https://10.79.10.105:8443/ces-api' // 测试环境
// const devServerTarger = 'https://cargo.csair.com/ces-api' // 生产环境

console.log(`运行环境：${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === 'development') {
	console.log(`本地代理地址：${devServerTarger}`)
}

module.exports = {
	outputDir: 'dist/' + process.env.NODE_ENV + '/dist',
	css: {
		extract: true
	},
	chainWebpack: config => {
		// if (
		// 	process.env.NODE_ENV === 'production' ||
		// 	process.env.NODE_ENV === 'release'
		// ) {
		if (process.env.NODE_ENV !== 'development') {
			// 开启js、css压缩
			config.plugin('compressionPlugin').use(
				new CompressionPlugin({
					test: /\.js$|\.html$|.\css/, // 匹配文件名
					threshold: 10240, // 对超过10k的数据压缩
					deleteOriginalAssets: false // 不删除源文件
				})
			)
			// 用cdn方式引入
			// config.externals({
			// 	vue: 'Vue',
			// 	vuex: 'Vuex',
			// 	'vue-router': 'VueRouter',
			// 	'element-ui': 'ELEMENT',
			// 	axios: 'axios'
			// })
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@assets': '@/assets',
				components: '@/components',
				views: '@/views'
			}
		}
	},
	publicPath: '/' + webSiteAddress,
	filenameHashing: true,
	assetsDir: 'static',
	// 本地服务代理
	devServer: {
		// host: '0.0.0.0',
		// port: 8081,
		proxy: {
			'/proxyApis': {
				target: devServerTarger,
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/proxyApis': ''
				}
			}
		}
		// https: false,
		// hotOnly: false,
		// proxy: null, // 设置代理
		// before: app => {}
	}
}
