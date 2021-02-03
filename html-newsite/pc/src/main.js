import Vue from 'vue'
import store from './store/'
import 'normalize.css/normalize.css' 
import { api } from "./api";
import { Button, Select,Option,Row,Col,Dropdown,DropdownMenu,DropdownItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/css.css';
import App from './App'

Vue.use(Button);
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.prototype.$http= api;
Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };

import VueI18n from 'vue-i18n'

import zh_CN from '@/assets/langs/zh-cn'
import en_US from '@/assets/langs/en-us'
import my from '@/assets/langs/my'
Vue.use(VueI18n)

const i18nInstance = new VueI18n({ 
   locale: 'en_US', // 定义默认语言为中文 
   messages: {   
      'zh_CN': zh_CN,
      'en_US': en_US,
      'my': my
    }
  });

/************************************ */


new Vue({
  el: '#app',
  store,
  i18n: i18nInstance,
  render: h => h(App)
})
