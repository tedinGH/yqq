import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/i18n";
import { actionApi } from "@/api";
import components from "@/components/common";
import directives from "./directives";
import filters from "@/common/filters";
import { Config } from "@/common/config";
import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);
import VueDND from "awe-dnd";
Vue.use(VueDND);
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message,
  Badge,
  Collapse,
  CollapseItem,
  Input,
  Divider,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  DatePicker
} from "element-ui";
Vue.use(Badge);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Divider);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(DatePicker);
Vue.use(Input);
Vue.prototype.store = store;
Vue.prototype.$api = actionApi;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
Vue.prototype.config = Config;

Vue.prototype.global = {
  fileDownUrl: Config.fileDownUrl,
  baseUrl: Config.baseUrl
};

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
