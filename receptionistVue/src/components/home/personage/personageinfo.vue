<template>
  <div class="personageinfo">
    <header class="header">
      <div style="cursor: pointer;width: 58px;" @click="back">
        <img src="../../../assets/images/goback.png" style="margin-right:8px;margin-top:-4px">
        <span>Back</span>
      </div>
    </header>
    <div class="content">
      <div class="left">
          <upload />
      </div>
      <div class="right">
        <header class="tab">
          <div class="settings" @click="cut1" :class="{active:tab==1}">
            Basic Settings
          </div>
          <div class="modify" @click="cut2" :class="{active:tab==2}">
            Modify the password
          </div>
          <div class="strip" ref="strip"></div>
        </header>
        <div v-if="tab==1" style="flex:1 ">
          <settings style="height:100%"></settings>
        </div>
        <div v-if="tab==2" style="flex:1 ">
          <setpassword style="height:100%"></setpassword>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import upload from "@/components/home/personage/upload";
  import settings from "@/components/home/personage/settings";
  import setpassword from "@/components/home/personage/setpassword";
  import { Crypto } from "@/tools/crypto" 
  export default {
    name: "personageinfo",
    data() {
      return {
        tab: '1'
      }
    },
    components:{
      upload,
      settings,
      setpassword
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      cut1(){
        if (this.tab == 1) {
          return
        } else {
          this.tab = 1
          this.$refs.strip.style.left = '0'
          this.$refs.strip.style.width = '160px'
        }
      },
      cut2(){
        if (this.tab == 2) {
          return
        } else {
          this.tab = 2
          this.$refs.strip.style.left = '165px'
          this.$refs.strip.style.width = '240px'
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .personageinfo {
    background: $backgroup-color;
    height: calc(100vh - 60px);

    .header {
      height: 66px;
      background: #fff;
      padding: 24px 0 0 16px;

      img {
        width: 14px;
      }

      span {
        display: inline-block;
        font-size: 16px;
      }
    }
    .content{
      height: calc(100vh - 126px);
      padding: 20px 25px;
      display: flex;
      .left{
        width:437px;
        background: #fff;
        margin-right: 14px;
        border: 1px solid $border-color;
        
      }
      .right{
        border: 1px solid $border-color;
        background: #fff;
        flex:1;
        display: flex;
        flex-direction: column  ;
        .tab{
          height: 60px;
          border-bottom:1px solid $border-color;
          display: flex;
          align-items: center;
          position: relative;
          .settings{
            margin-left:22px;
            margin-right: 54px;
            cursor: pointer;
            font-size: 18px;
            &.active{
              color: $color-theme;
            }
          }
          .modify{
            cursor: pointer;
            font-size: 18px;
            &.active{
              color: $color-theme;
            }
          }
          .strip {
            position: absolute;
            width: 160px;
            height: 3px;
            background: $color-theme;
            border-radius: 2px;
            bottom: 0;
            left: 0;
            transition: .5s ease;
          }
        }
      }
    }
  }
</style>