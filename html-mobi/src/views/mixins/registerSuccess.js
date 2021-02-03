export default {
  name: "registerSuccess",
  data() {
    return {};
  },
  methods: {
    goToDownload() {
      //APP下载
      let lang = localStorage.getItem("lang");
      if (lang) {
        window.location =
          window.location.origin + "/dist/" + lang + "/#/download/0/0";
      } else
        window.location = window.location.origin + "/dist/en_US/#/download/0/0";
    },
    goToLogin() {
      // let lang = localStorage.getItem('lang');
      // if(lang){
      //   window.location = window.location.origin+'/dist/'+lang+'/#/index';
      // }
      // else
      window.location = window.location.origin;
    },
  },
  mounted() {
    //设置title
    document.title = this.$t("msg").menu.register;
  },
};
