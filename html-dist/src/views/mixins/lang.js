import Vue from "vue";

export default {
  data() {
    return {
      showLang: false,
      languageList: {
        name: this.$t("msg.menu.lang"),
        list: [
          // { lang: "my", name: "တရုတ်ဘာသာ" },
          { lang: "en_US", name: "English" },
          { lang: "zh_CN", name: "简体中文" }
        ]
      }
    };
  },
  methods: {
    gotosite() {
      var url = window.location.origin;
      window.location.href = url;
    },
    setLanguage(val) {
      let item = this.languageList.list[val];
      this.$i18n.locale = item.lang;
      Vue.config.lang = item.lang;
      this.$store.commit("setLanguage", item.lang);
      window.localStorage.lang = item.lang;
      //let lang = item.lang.toLowerCase().replace(/_/, '-');
      let lang = item.lang;
      this.setLangName();
      window.location.href =
        window.location.origin + "/dist/" + lang + "/" + window.location.hash;
    },
    setLangName() {
      setTimeout(() => {
        this.languageList.list.map(item => {
          if (item.lang == this.$store.state.language) {
            this.languageList.name = item.name;
          }
        });
      }, 10);
    }
  },
  mounted() {
    this.setLangName();
  }
};
