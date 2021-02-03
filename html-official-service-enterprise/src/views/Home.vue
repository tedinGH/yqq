<template>
  <div>
    <div class="home-bg">
      <header>
        <el-col :span="2">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-logo">
            <img src="../assets/images/logo.png" >
            <p>{{$t("msg.home.Public")}}</p>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-text">
            <p @click="apply">{{$t("msg.home.Apply")}}</p>
            <p @click="goservice">{{$t("msg.home.Service")}}</p>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
      </header>
      <div class="big-title" :class="{en:lang=='en_US'}">
        {{$t("msg.home.platform")}} 
      </div>
      <p class="f-text" :class="{en:lang=='en_US'}">{{$t("msg.home.Enterprise")}} </p>
      <p class="s-text" :class="{en:lang=='en_US'}">{{$t("msg.home.publicplatform")}}</p>
      <div class="apply" @click="apply">
        {{$t("msg.home.applyimmed")}}
        <i class="icon"></i>
      </div>
      <login></login>
      <toast></toast>
    </div>
    <div class="home-two">
      <img src="../assets/images/bg-2.png">
      <div class="text">
        <div>{{$t('msg.home.Enterprise')}}</div>
        <p class="content">{{$t('msg.home.EnterpriseT')}}</p>
      </div>
    </div>
    <div class="home-three">
      <div class="text">
        <div>{{$t('msg.home.Enterprise')}}</div>
        <p class="content">{{$t('msg.home.EnterpriseT')}}</p>
      </div>
      <img src="../assets/images/bg-3.png">
    </div>
  </div>
</template>

<script>
import login from '../views/home/login'
import Toast from "@/components/popup/Toast"
  export default {
    name: "home",
    components: {
      //
    },
    data() {
      return {
        lang:null
      };
    },
    components:{
      login,
      Toast
    },
    methods:{
      apply(){
        this.$router.push({
          path: "/register" 
        });
      },
      goservice(){

      },
    
    },
    mounted() {
      this.lang = localStorage.getItem("locale") || "en_US";
    }
  };
</script>

<style lang="scss" scoped>
  .home-bg {
    background: url(../assets/images/bg.png) center top no-repeat;
    background-size: cover;
    width: 100%;
    height: 920px;
    position: relative;
    header {
      width: 100%;
      height: 64px;
      .grid-content {
        min-height: 64px;
        &.bg-logo{
          display: flex;
          img{
            margin-top: 12px;
          }
          p{
            font-size: 24px;
            margin-top: 30px;
            margin-left: 26px;
          }
        }
          &.bg-text{
          display: flex;
          justify-content: flex-end ;
          p{
            font-size: 16px;
            margin-top: 32px;
            margin-left: 78px;
            cursor: pointer;
            &:hover{
              color: #fff;
            }
          }
        }
      }
    }
    .big-title{
      width: 580px;
      font-size: 72px;
      position: absolute;
      left: 13%;
      top: 18%;
      &.en{
        width: 650px;
      }
    }
    .f-text{
      width: 384px;
      font-size: 18px;
      line-height: 30px;
      position: absolute;
      left: 13%;
      top: 42%;
      &.en{
        width:486px
      }
    }
    .s-text{
      width: 384px;
      font-size: 18px;
      line-height: 30px;
      position: absolute;
      left: 13%;
      top: 52%;
      &.en{
        width:486px
      }
    }
    .apply{
      padding: 0 66px 0 38px;
      height: 56px;
      line-height: 56px;
      color: #fff;
      font-size: 18px;
      background: $color-theme;
      box-shadow: 0px 3px 7px 0px $box-shadow;
      border-radius: 28px;
      position: absolute;
      left: 13%;
      top: 67%;
      cursor: pointer;
      .icon{
        display: inline-block;
        width: 7px;
        height: 12px;
        position: absolute;
        right: 30px;
        top: 22px;
        background: url(../assets/images/3.png);
      }
    }
  }
  .home-two{
    width: 100%;
    height: 713px;
    display: flex;
    justify-content: center;
    img{
      height: 519px;
      margin-top: 194px;
    }
    .text{
      margin-top: 369px;
      margin-left: 136px;
      div{
        font-size: 48px;
      }
      .content{
        margin-top: 65px;
        width: 430px;
        font-size: 24px;
        color: #90A1AD;
      }
    }
  }
  .home-three{
    width: 100%;
    height: 1025px;
    display: flex;
    justify-content: center;
    img{
      height: 774px;
      margin-top: 251px;
    }
     .text{
      margin-top: 532px;
      margin-left: 136px;
      div{
        font-size: 48px;
      }
      .content{
        margin-top: 65px;
        width: 430px;
        font-size: 24px;
        color: #90A1AD;
      }
    }
  }
</style>