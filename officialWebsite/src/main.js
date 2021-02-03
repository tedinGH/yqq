import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from './i18n/i18n'
import { actionApi } from "@/api";
import directives from "./directives";
import { Config } from "@/common/config"
import { Row, Col, Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$api = actionApi;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
Vue.prototype.config = Config
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
