import Vue from "vue";
import "regenerator-runtime/runtime";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/i18n";
import { actionApi } from "@/api";
import components from "./components/common";
import directives from "./directives";
import filters from "./common/filters";
import { Config } from "@/common/config";
import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);
import VueDND from "awe-dnd";
Vue.use(VueDND);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.store = store;
Vue.prototype.$api = actionApi;
Vue.config.productionTip = false;
Vue.prototype.config = Config;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//通过components下的index.js文件导入组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

//通过directive下的index.js文件导入指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
