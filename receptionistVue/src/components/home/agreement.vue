<template>
  <div class="agreement"  @click.stop="">
    <div class="title">{{$t('msg.home.title')}}</div>
    <div class="content">
      <div class="text">{{$t('msg.home.protocol')}}</div>
      <div class="start" @click="start()">{{$t('msg.home.start')}}</div>
      <div class="consent">
        <span v-if="!consent" class="no-consent" @click.stop="consent=true"></span>
        <span v-if="consent" class="ok-consent" @click.stop="consent=false"></span>
        <p style="width:560px">
          <span>{{$t('msg.home.observe')}}</span>
        <span style="font-size: 18px;color:#8099E3">{{$t('msg.home.clause')}}</span>
        <span style="font-size: 18px;">{{$t('msg.home.or')}}</span> 
        <span style="font-size: 18px;color:#8099E3">{{$t('msg.home.policy')}}</span>
        </p>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "agreement",
    data() {
      return {
        consent: false
      }
    },
    methods: {
      start(){
        if(!this.consent){
          this.$message.warning(this.$t("msg.home.warning"));
          return
        }else{
          this.$api.updatepactstatus().then(
            res=>{
              if(res.code==0){
                this.$store.dispatch("setLayout", ["", "", false]);
              }
            }
          )
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .agreement {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 726px;
    background: rgba(255, 255, 255, 0.99);
    border-radius: 10px;
    z-index: 9999;
    .title {
      width: 726px;
      height: 91px;
      font-size:30px;
      line-height: 91px;
      text-align: center;
      color: #fff;
      background: $color-theme;
      border-radius: 10px 10px 0 0;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        margin-top: 54px;
        margin-bottom: 94px;
        width: 576px;
        font-size: 18px;
        line-height: 32px
      }

      .start {
        width: 138px;
        height: 48px;
        background: $color-theme;
        border-radius: 5px;
        color: #fff;
        line-height: 48px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }

      .consent {
        margin-top: 93px;
        margin-bottom: 36px;
        display: flex;
        line-height: 18px;
        .no-consent {
        display: block;
        width: 17px;
        height: 17px;
        background: url(../../assets/img/no.png);
        cursor: pointer;
        margin-right: 25px;
      }

      .ok-consent {
        display: block;
        width: 17px;
        height: 17px;
        background: url(../../assets/img/ok.png);
        cursor: pointer;
        margin-right: 25px;
      }
      }
    }
  }
</style>