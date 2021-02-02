'use strict'

import Vue from 'vue'
import axios from 'axios'
import { local } from '@/util/storage.util'
import { LOGIN_URL } from '@/config'
// import { loading } from '@/util/toast.util'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
	// baseURL: process.env.baseURL || process.env.apiUrl || ""
	timeout: 3 * 60 * 1000, // Timeout
	// timeout: 60 * 1000, // Timeout
	withCredentials: true, // Check cross-site Access-Control
	method: 'post' // 默认是 get 改为 post
}

const _axios = axios.create(config)
// const mod_loading = loading()

/**
 * 请求拦截
 */
_axios.interceptors.request.use(
	config => {
		config.headers['Access-Control-Allow-Origin'] = '*'
		// Do something before request is sent
		config.headers['x-customs-user'] = local('TOKEN')
		//config.headers['x-customs-userid'] = 'CSN001'
		config.headers['x-customs-userid'] = local('USER_ID')

		// TODO:loading
		// if (config.showLoading) {
		// 	mod_loading
		// }
		return config
	},
	error => {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
_axios.interceptors.response.use(
	function(response) {
		let data = response.data
		let config = response.config
		if (!data) {
			console.error(data)
			return Promise.reject(new Error('数据异常'))
		}
		if (data.code === '0000') {
			// getOriginData为true时,返回原装数据
			if (config.getOriginData) {
				return data
			} else {
				return data.result
			}
		} else if (data.code === '0003') {
			console.log()
		} else if (data.code === '0004') {
			local('USER_ID', '')
			local('TOKEN', '')
			window.location.href = LOGIN_URL + '/login'
			console.error(data)
		} else {
			console.error(data)
			return Promise.reject(data)
		}
	},
	function(error) {
		// Do something with response error
		console.error(error)
		return Promise.reject({
			message: '网络异常'
		})
	}
)

Plugin.install = function(Vue, options) {
	console.log(options)
	Vue.axios = _axios
	window.axios = _axios
	Object.defineProperties(Vue.prototype, {
		axios: {
			get() {
				return _axios
			}
		},
		$axios: {
			get() {
				return _axios
			}
		}
	})
}

Vue.use(Plugin)

export default Plugin
