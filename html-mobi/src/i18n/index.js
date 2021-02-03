import VueI18n from 'vue-i18n'
import Vue from 'vue'
import store from '../store'

Vue.use(VueI18n)

try {
  if (!localStorage.lang) {
    localStorage.setItem('lang', store.state.language)
  }
  Vue.config.lang = store.state.language
} catch (e) {
  alert('Your web browser does not support storing settings locally.');
  Vue.config.lang = store.state.language
}

const i18n = new VueI18n({
  locale: Vue.config.lang,
  messages: {
    'zh_CN': require('./zh-cn'),   // 中文语言包
    'en_US': require('./en-us'),   // 英文语言包
    'my': require('./my')    // 英文语言包
  }
})

export default i18n 