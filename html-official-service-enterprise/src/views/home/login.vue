<template>
  <div class="login">
    <div class="title">{{$t('msg.home.login')}}</div>  
      <p class="account">{{$t('msg.home.account')}}</p>
      <input
        type="text"
        class="account-input"
        v-model="account"
        autocomplete="new-password"
        :placeholder="$t('msg.home.Paccount')"
      />
      <p class="password">{{$t('msg.home.password')}}</p>
      <input
        type="password"
        class="password-input"
        v-model="password"
        autocomplete="new-password"
        :placeholder="$t('msg.home.Ppassword')"
      />
      <div style=" display: flex;"><span class="icon" :class="{active:remember}" @click="remember=!remember"></span><span class="remtext">{{$t('msg.home.Remember')}}</span></div>
      <div class="gologin" @click="login">{{$t('msg.home.login')}}</div>
  </div>
</template>

<script>
import { Crypto } from "@/tools/crypto";
export default {
  name: "login",
  data() {
    return {
      account:'',
      password:'',
      remember: false
    };
  },
  methods:{
    login(){
      if(this.account == '') {
        this.tip(this.$t('msg.home.Paccount')) 
        return
      }else if(this.password == ''){
        this.tip(this.$t('msg.home.Ppassword')) 
        return
      }else{
        let obj = {
          userName:this.account,
          password:Crypto.encryptByMd5(this.password)
        }
        this.$api.login(obj).then(
          res=>{
            if(res.code == 0){
              if(this.remember){
                let params = {
                  account:this.account,
                  password:this.password,
                  remember: 1
                }
                window.localStorage.setItem('logininfo', Crypto.encrypt(params)
              );
              }else{
                let params = {
                  account:this.account,
                  remember: 0
                }
                window.localStorage.setItem( "logininfo", Crypto.encrypt(params)
              );
              }
              let token = res.data.token
              this.$store.commit("SET_TOKEN", token);
              sessionStorage.setItem('Authorization', token);
            }
          }
        )
      }
    },
    tip(item){
      this.$store.commit("SET_TOAST_TEXT", item)
    }
  },
  created() {
    let user
    if(window.localStorage.getItem('logininfo')){
        user = JSON.parse(
        Crypto.decrypt(window.localStorage.getItem('logininfo'))
      )
    }
    
    if (user) {
      this.account = user.account
      this.password = user.password
      this.remember = user.remember == 1 ? true : false
    }
  }
};
</script>

<style lang="scss" scoped>
.login{
  width: 492px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 0px 3px 17px 1px $box-shadow;
  border-radius: 30px;
  position: absolute;
  right: 15%;
  top: 22%;
  padding: 45px 54px 50px 54px;
  display: flex;
  flex-direction: column;
  .title{
    font-weight: bold;
    font-size: 30px;
  }
  .account{
    margin-top: 42px;
    margin-bottom:10px;
    padding-left: 7px;
  }
  .account-input{
    width: 374px;
    height: 48px;
    background: #FFFFFF;
    border: 1px solid #C1C7CA;
    border-radius: 4px;
    padding: 10px;
  }
  .password{
    margin-top: 39px;
    margin-bottom:10px;
    padding-left: 7px;
  }
  .password-input{
    width: 374px;
    height: 48px;
    background: #FFFFFF;
    border: 1px solid #C1C7CA;
    border-radius: 4px;
    padding: 10px;
  }
  .icon{
    margin-top: 20px;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(../../assets/images/check.png);
    cursor: pointer;
    &.active{
      background: url(../../assets/images/check-active.png);
    }
  }
  .gologin{
    width: 123px;
    height: 48px;
    background: #45B4AA;
    border-radius: 4px;
    color: #fff;
    line-height: 48px;
    text-align: center;
    margin-top: 26px;
    align-self:flex-end;
    cursor: pointer;
  }
  .remtext{
    margin-top: 22px;
    margin-left: 8px;
    display: inline-block;
  }
  
}
</style>
