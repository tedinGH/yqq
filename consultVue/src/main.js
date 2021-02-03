import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from './i18n/i18n'
import { actionApi } from "@/api";
import components from "./components/common";
import filters from "./common/filters";
import directives from "./directives";
import { Message, DatePicker,TimeSelect,TimePicker,Button,Dropdown, DropdownMenu, DropdownItem,Checkbox,CheckboxButton,CheckboxGroup,} from 'element-ui';
import { Config } from "@/common/config"
import "../public/static/icon/iconfont.css"

Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.prototype.$api = actionApi;
Vue.prototype.$message = Message;
Vue.prototype.config=Config

Vue.config.productionTip = false;

Vue.prototype.global = {
  fileDownUrl: Config.fileDownUrl,
  baseUrl: Config.baseUrl
};

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

//通过components下的index.js文件导入组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
