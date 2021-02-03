import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import locale from 'element-ui/lib/locale';
import zh from './langs/zh'
import en from './langs/en'


Vue.use(VueI18n)

const messages = {
  en_US: en,
  zh_CN: zh,
}


const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en_US',
  messages,
  // silentTranslationWarn: true
})


// locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n