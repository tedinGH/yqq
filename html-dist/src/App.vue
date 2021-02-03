<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from '@/api'
import { Util } from '@/utils/utils';

export default {
  name: 'bcircle',
  data (){
    return {
      user:{},
      locales: {}
    }
  },
  computed:{
    autoLogout(){
      return this.$store.state.autoLogout;
    }
  },
  watch:{
    autoLogout(){
      let tipText = ''
      if(this.autoLogout){
        if(this.autoLogout.type == 0) {
          tipText = this.locales.pc_login.replace(/###/g,this.autoLogout.time);
        } else if(this.autoLogout.type == 1) {
          tipText = this.locales.change_password.replace(/###/g,this.autoLogout.time);
        } else if(this.autoLogout.type == 2) {
          tipText = this.locales.account_freezing.replace(/###/g,this.autoLogout.time);
        } else if(this.autoLogout.type == 3) {
          tipText = this.locales.logout_in_phone.replace(/###/g,this.autoLogout.time);
        } else {
          tipText = this.locales.login_invalid;
        }

        this.$message.confirm(tipText, this.locales.tip, {confirmButtonText: this.locales.confirm, showCancelButton: false}).then(()=> {
          this.comfirm(this.autoLogout.type);
        }).catch(()=> {})
      }else{
        this.$toast(this.locales.login_invalid)
        this.comfirm(1)
      }
    }
  },
  methods: {
    comfirm(type){
      Util.clearCookie("eUcShEaRt")
      window.sessionStorage.removeItem("eUcShEaRt");
      Util.removeStore('securityInfo')
      this.$store.commit('setLoginInfo', null)

      if(type==0 || type==1 || type==3) {
        //this.$router.push({name:'scan-login'})
        //let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
        //var subWindow = window.open(url, '_blank');
      }

      if(type==2) {
        this.$router.push({name:'thaw-options'})
      }
    },
    setLoginInfo(data) {
      api.setLoginInfo({});
      let info = JSON.parse(Util.decryptByDES(data, 'echat000'));
      this.$store.commit('setToken', info.token);
      Util.clearCookie("eUcShEaRt");
      sessionStorage.setItem("eUcShEaRt", data);
    }
  },
  mounted(){
    Util.checkCookie('eUcShEaRt').then(
      res => {
        this.setLoginInfo(res);
      },
      () => {
        let info = sessionStorage.getItem("eUcShEaRt");

        if (info) {
          this.setLoginInfo(info);
        } else {
          this.$store.commit('setLoginInfo', null)
          Util.removeStore('token')
        }
      }
    )

    if (localStorage.lang != this.$store.state.language) {
      localStorage.setItem('lang', this.$store.state.language)
    }
    
    this.locales = this.$t('msg.tip')
    this.$store.commit('setLangData',this.$t('msg.tip'))
  }
}
</script>
