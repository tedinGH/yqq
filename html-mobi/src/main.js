import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from "vue-router"
import routeZH from './router/zh-cn'
import routeEN from './router/en-us'
//  import router from './router/en-us'
// import router from './router/my'
import i18n from './i18n' 
import store from './store'
import 'babel-polyfill'
import './utils/app'
import Mint from 'mint-ui';
Vue.use(Mint);

let router = pageStaticLanguage=="zh_CN"?routeZH:routeEN

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

