<template>
  <div class="success">
      <div class="img">
        <img src="../assets/img/success.png">
      </div>
      <div class="title">
        {{$t("msg.success.congratulation")}}
      </div>
      <div class="text1">{{$t("msg.success.id")}}:{{id}},{{$t("msg.success.engrave")}}</div>
      <div class="text2">{{$t("msg.success.correlation")}}<span>{{phone}}</span>，{{$t("msg.success.collect")}}</div>
      <div class="btn" @click="go">{{$t("msg.success.login")}}（{{time}}s）</div>
  </div>
</template>

<script>
  export default {
    name: "success",
    data() {
      return {
          id:'',
          phone:'',
          time:10,
          timer:null
      }
    },
    methods: {
      go(){
          let lang = localStorage.getItem('locale') || 'en_US'
          window.location = window.location.origin+"/dist/#/login/"+lang
      }
    },
    created() {

    },
    mounted() {
      this.id=this.$route.query.id
      this.phone=this.$route.query.phone
      let second = 10
      this.timer = setInterval(() => {
        second --
        if (second > 0) {
          this.time = second 
        } else {
          clearInterval(this.timer)
          let lang = localStorage.getItem('locale') || 'en_US'
          window.location =  window.location.origin+"/dist/#/login/"+lang
        }
      }, 1000)
    }
  }
</script>
<style lang="scss" scoped>
  .success {
    width: 100%;
    height: 100%;
    padding-top: 238px;
    .img{
      margin: auto;
      text-align: center;
    }
    .title{
      font-size: 30px;
      text-align: center;
      margin-top:55px ;
    }
    .text1{
      text-align: center;
      margin-top:60px ;
      font-size: 18px;
    }
    .text2{
      text-align: center;
      margin-top:40px ;
      font-size: 18px;
      span{
        color: #8099E3;
      }
    }
    .btn{
      text-align: center;
      line-height: 51px;
      margin: auto;
      margin-top: 73px;
      color: #fff;
      width:208px;
      height:51px;
      background:rgba(128,153,227,1);
      border-radius:10px;
      cursor: pointer;
    }
  }
</style>