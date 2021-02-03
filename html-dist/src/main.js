import Vue from 'vue'
import VueRouter from "vue-router"
import store from './store'
import App from './App'
import { Toast, Indicator } from 'mint-ui'
import routeZH from './routers/zh-cn'
import routeEN from './routers/en-us'
// import routes from './routers/my'
import i18n from './i18n'
import Message from './components/message-box'
import VueLazyload from 'vue-lazyload'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'babel-polyfill'
import './assets/css/base.css'
import directives from "./directives";

Vue.use(preview);
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  preLoad: 1,
  attempt: 1
})

Vue.$message = Vue.prototype.$toast = Toast;
Vue.$message = Vue.prototype.$indicator = Indicator;
Vue.$message = Vue.prototype.$message = Message;
Vue.config.productionTip = false;

//定义路由配置 
const router = new VueRouter({
  base: process.env.ROUTER_BASE,
  routes: pageStaticLanguage=="zh_CN"?routeZH:routeEN,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { x: 0, y: 0 }
  }
});

//通过components下的index.js文件导入组件
import components from './components/index'
Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
});

//通过filters.js导入自定义用于过滤的函数
import filters from './utils//filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
});
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
//添加路由钩子修改每个页面标题
router.beforeEach((to, form, next) => {
  window.document.title = to.meta.title !== undefined ? ('EchatAPP | ' + to.meta.title) : Vue.prototype.appName;
  next()
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})