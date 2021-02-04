<template>
  <div class="complete">
    <div class="wraper">
      <div class="upavatar">
        <div class="box">
          <img class="img" v-if="avatar!=''" :src="global.fileDownUrl + 'compress/'+avatar" >
          <img class="add" v-else src="../assets/images/upavart.png" @click="avatarType = 'user'">
        </div>
      </div>
      <input type="text" v-model="name" :placeholder="$t('msg.login.set')" class="name" maxlength="20">
      <div class="completes" @click="complete()" :class="{active:avatar!=''&&name!=''}">{{$t('msg.common.complete')}}</div>
    </div>
    <avatar-handler v-model="avatarType" @changeAvatar="changeAvatarHandler" v-if="avatarType"></avatar-handler>
    <toast></toast>
  </div>
</template>

<script>
import { Crypto } from "@/tools/crypto" 
import AvatarHandler from "../components/AvatarHandler";
import Toast from "@/components/popup/Toast"
export default {
    name: "complete",
  data() {
    return {
      avatar:'',
      avatarType:'',
      name:''
    };
  },
  computed: {
  
  },
  components: {
    AvatarHandler,Toast
  },
  methods: {
    changeAvatarHandler(data){
      this.avatar = data.data
    },
    complete(){
      if(  this.avatar=='') {
        this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.setprofile"));
        return
      }
      if( this.name==''){
        this.$store.commit('SET_TOAST_TEXT', this.$t("msg.login.setnick"));
        return
      }
      this.$http.setNickname({ nickName: this.name }).then(
      (data) => {
        if(data){
          this.$router.push({
            name: 'index'
          });
        }
      }
    );
  }
  },
  created() {
    let userInfo = sessionStorage.getItem("eUcShEaRt")
    let user = JSON.parse(Crypto.decryptByDES(userInfo, "echat000"))
    this.$store.commit("SET_USER_TOKEN", user.token)
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";

.complete {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    .wraper {
      width: 390px;
      height: 600px;
      font-size: 16px;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      opacity: 0.92;
      border-radius: 8px;
      background: #fff;
      margin: auto;
      overflow: hidden;
      position: relative;
      .upavatar{
        width: 284px;
        height:276px;
        background: url(../assets/images/upavatar.png);
        margin: auto;
        margin-top: 53px;
        padding:84px 75px;
        .box{
          width: 120px;
          height:120px;
          border-radius: 50%;
          border: 3px solid #ACACAC;
          background: rgba($color: #5F717F, $alpha: 0.1);
          display: flex;
          justify-content: center;
          .img{
            width: 118px;
            height:118px;
            border-radius: 50%;
            align-self :center;
          }
          .add{
            align-self :center;
            cursor: pointer;
          }
        }
      }
      .name{
        width: 304px;
        height: 38px;
        line-height: 38px;
        border-bottom: 2px solid  #45B4AA;
        margin-left: 43px;
        margin-top: 30px;
        text-align: center;
      }
      .completes{
        width: 304px;
        height: 48px;
        background: #45B4AA;
        opacity: 0.4;
        border-radius: 4px;
        color: #fff;
        margin: auto;
        margin-top:102px ;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        &.active{
          opacity: 1;
        }
      }
    }
}
</style>
