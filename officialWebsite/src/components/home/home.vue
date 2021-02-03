<template>
  <div class="home">
    <div class="panel1">
      <img class="img" src="../../assets/img/web-1.png">
      <div class="customer">{{$t("msg.common.customer")}}</div>
      <div class="center" v-if="lang=='en_US'">management center</div>
      <div class="create">{{$t("msg.common.create")}}</div>
      <div class="experience" v-if="lang=='en_US'">the most extreme user experience</div>
      <a class="immediately" :href="'#/register/'+lang" target="_blank" >{{$t("msg.common.immediately")}}</a>
    </div>
    <div class="panel2">
      <div class="nav">
        <img src="../../assets/img/1.png">
        <img src="../../assets/img/2.png">
        <img src="../../assets/img/3.png">
        <img src="../../assets/img/4.png">
        <img src="../../assets/img/5.png">
      </div>
      <div class="experience">{{$t("msg.common.experience")}}</div>
      <div class="experience2">{{$t("msg.common.experience2")}}</div>
      <div class="label">
        <div>Web</div>
        <div>APP</div>
        <div>WeChat</div>
      </div>
      <div class="label2">
        <div>Facebook</div>
        <div>Whatsapp</div>
        <div>More</div>
      </div>
    <div class="immediately"><a  :href="'#/register/'+lang"  target="_blank" >{{$t("msg.common.immediately")}}</a></div> 
    </div>
    <div class="panel3">
      <div class="label1">
        <div class="left">
          <div class="title">{{$t("msg.common.better")}}</div>
          <div class="text">{{$t("msg.common.active")}}</div>
        <div class="immediately" v-if="lang=='en_US'"> <a  :href="'#/register/'+lang" target="_blank" >{{$t("msg.common.realize")}}</a></div> 
        <div  class="immediately zh" v-else><a :href="'#/register/'+lang" target="_blank" >{{$t("msg.common.realize")}}</a></div>  
        </div>
        <div class="right">
          <!-- <img src="../../assets/img/web-2.png"> -->
        </div>
      </div>
      <div class="lable2">{{$t("msg.common.manage")}}</div>
      <div class="lable3">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="panel4">
      <div class="lable1">
        {{$t("msg.common.faster")}}
      </div>
      <div class="lable2"> {{$t("msg.common.nav")}}</div>
        <div class="immediately" v-if="lang=='en_US'"> <a  :href="'#/register/'+lang" target="_blank" >{{$t("msg.common.realize")}}</a></div> 
        <div  class="immediately zh" v-else><a :href="'#/register/'+lang" target="_blank" >{{$t("msg.common.realize")}}</a></div>  
    </div>
    <div class="panel5">
      <div class="title1">
        {{$t("msg.common.functions")}}
      </div>
      <div class="lable1">
        <div class="item">
          <div v-for="(item,idx) in url" :key="idx">
            <img :src="defaulturl+item.url">
            <div class="text">{{$t(item.text)}}</div>
          </div>
        </div>
        <div class="item item2">
          <div v-for="(item,idx) in url2" :key="idx">
            <img :src="defaulturl+item.url">
            <div class="text">{{$t(item.text)}}</div>
          </div>
        </div>
      </div>
      <div class="immediately" v-if="lang=='en_US'"> <a target="_blank"   :href="'#/register/'+lang">{{$t("msg.common.realize")}}</a></div> 
      <div  class="immediately zh" v-else><a target="_blank" :href="'#/register/'+lang">{{$t("msg.common.realize")}}</a></div>  
      <div class="title2">{{$t("msg.common.download")}}</div>
      <div class="describe">{{$t("msg.common.describe")}}</div>
      <div class="download">
          <div><div class="box"><img src="../../assets/img/android.png"></div><p>{{$t("msg.common.android")}}</p></div>
          <div><div class="box2"><img src="../../assets/img/ios.png"></div><p>{{$t("msg.common.ios")}}</p></div>
          <div><div class="box2"><img src="../../assets/img/mac.png"></div><p>{{$t("msg.common.mac")}}</p></div>
          <div><div class="box"><img src="../../assets/img/win.png"></div><p>{{$t("msg.common.win")}}</p></div>
      </div>
    </div>
    <div class="panel6">
      <div class="lable">
        <div class="left">
          <img src="../../assets/img/logo.png">
          <div style="margin-left:42px">
            <p>{{$t("msg.common.website")}}</p>
            <p>{{$t("msg.common.hotline")}}：8551358080</p>
          </div>
        </div>
      <div class="right">
        {{$t("msg.common.site")}}：www.echatapp.com
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    name: "home",
    data() {
      return {
        consent: false,
        defaulturl: "static/img/",
        url: [{
            url: "i1.png",
            text: "msg.common.robot"
          },
          {
            url: "i2.png",
            text: "msg.common.intelligent"
          },
          {
            url: "i3.png",
            text: "msg.common.workorder"
          },
          {
            url: "i4.png",
            text: "msg.common.dergee"
          },
          {
            url: "i5.png",
            text: "msg.common.call"
          },
        ],
        url2: [{
            url: "i6.png",
            text: "msg.common.data"
          },
          {
            url: "i7.png",
            text: "msg.common.history"
          },
          {
            url: "i8.png",
            text: "msg.common.api"
          },
          {
            url: "i9.png",
            text: "msg.common.wechat"
          },
          {
            url: "i10.png",
            text: "msg.common.management"
          },
        ]
      }
    },
    computed: {
      ...mapGetters(["lang"]),
    },
    methods: {
    },
    mounted() {
    
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    a{
      text-decoration:none;
    }
    .panel1 {
      padding-top: 73px;
      width: 100%;
      height: 722px;
      background: #45455C;
      position: relative;

      .customer {
        margin-top: 90px;
        margin-left: 14vw;
        font-size: 72px;
        color: #fff;
      }

      .center {
        margin-left: 14vw;
        font-size: 72px;
        color: #fff;
      }

      .img {
        position: absolute;
        bottom: 0;
        right: 14vw;
      }

      .create {
        margin-top: 40px;
        margin-left: 14vw;
        font-size: 34px;
        color: #fff;
      }

      .experience {
        margin-left: 14vw;
        font-size: 34px;
        color: #fff;
      }

      .immediately {
        position: absolute;
        bottom: 110px;
        left: 14vw;
        width: 444px;
        height: 83px;
        background: linear-gradient(90deg, rgba(111, 166, 239, 1), rgba(100, 134, 229, 1));
        border-radius: 40px;
        text-align: center;
        line-height: 83px;
        color: #FFF;
        font-size: 34px;
        cursor: pointer;
      }
    }

    .panel2 {
      width: 100%;
      height: 1136px;

      .nav {
        height: 124px;
        background: #F1F1F1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 15vw;
        padding-right: 15vw;

        img {
          display: block;
        }

      }

      .experience {
        margin: auto;
        margin-top: 94px;
        width: 1030px;
        font-size: 44px;
        color: #000;
        text-align: center;
      }

      .experience2 {
        width: 798px;
        font-size: 24px;
        margin: auto;
        margin-top: 52px;
        color: #888;
        text-align: center;
        line-height: 48px;
      }

      .label {
        width: 70vw;
        display: flex;
        margin: auto;
        margin-top: 88px;
        justify-content: space-between;

        div {
          width: 320px;
          height: 100px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 30px 0px rgba(218, 218, 218, 0.75);
          border-radius: 50px;
          line-height: 95px;
          font-size: 30px;
          text-align: center;
          padding-left: 80px;

          &:nth-child(1) {
            background: url(../../assets/img/i1.png) no-repeat 16px;
          }

          &:nth-child(2) {
            background: url(../../assets/img/i2.png) no-repeat 16px;
          }

          &:nth-child(3) {
            background: url(../../assets/img/i3.png) no-repeat 16px;
          }
        }
      }

      .label2 {
        width: 70vw;
        display: flex;
        margin: auto;
        margin-top: 35px;
        justify-content: space-between;

        div {
          width: 320px;
          height: 100px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 30px 0px rgba(218, 218, 218, 0.75);
          border-radius: 50px;
          line-height: 95px;
          font-size: 30px;
          text-align: center;
          padding-left: 80px;

          &:nth-child(1) {
            background: url(../../assets/img/i4.png) no-repeat 16px;
          }

          &:nth-child(2) {
            background: url(../../assets/img/i5.png) no-repeat 16px;
          }

          &:nth-child(3) {
            background: url(../../assets/img/i6.png) no-repeat 16px;
          }
        }
      }

      .immediately {
        width: 488px;
        height: 80px;
        text-align: center;
        
        line-height: 80px;
        margin: auto;
        margin-top: 94px;
        font-size: 34px;
        background: rgba(90, 79, 239, 0);
        border: 2px solid rgba(90, 79, 239, 1);
        border-radius: 40px;
        cursor: pointer;
        a{
            color: #5A4FEF;
        }
      }
    }

    .panel3 {
      height: 1624px;

      .label1 {
        margin: auto;
        display: flex;
        justify-content: space-between;
        width: 80vw;
        height: 512px;

        .left {
          width: 60%;

          .title {
            font-size: 44px;
            text-align: center;
          }

          .text {
            color: #888888;
            font-size: 24px;
            width: 620px;
            margin: auto;
            margin-top: 52px;
          }

          .immediately {
            margin: auto;
            margin-top: 60px;
            width: 553px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            background: rgba(90, 79, 239, 0);
            font-size: 36px;
            border: 2px solid rgba(90, 79, 239, 1);
            border-radius: 40px;
            cursor: pointer;
            a{
              color: #5A4FEF;
            }
            &.zh {
              width: 300px;
            }
          }
        }

        .right {
          width: 40%;
          background: url(../../assets/img/web-2.png) no-repeat;
          background-size: 100% 100%
        }
      }

      .lable2 {
        margin: auto;
        margin-top: 250px;
        width: 800px;
        font-size: 44px;
        text-align: center;
      }

      .lable3 {
        margin-top: 58px;
        display: flex;
        justify-content: center;

        div {
          width: 644px;
          height: 429px;

          &:nth-child(1) {
            background: url(../../assets/img/web-3.png);
            margin-right: 55px;
          }

          &:nth-child(2) {
            background: url(../../assets/img/web-4.png);
          }
        }
      }
    }

    .panel4 {
      position: relative;
      height: 794px;
      background: url(../../assets/img/web-5.png) no-repeat;
      background-size: 100% 100%;

      .lable1 {
        margin-left: 18vw;
        padding-top: 132px;
        color: #fff;
        width: 1020px;
        font-size: 44px;
      }

      .lable2 {
        width: 1230px;
        margin-top: 56px;
        margin-left: 18vw;
        color: #fff;
        font-size: 24px;
      }

      .immediately {
        width: 558px;
        height: 80px;       
        border: 2px solid #fff;
        border-radius: 40px;
        cursor: pointer;
        text-align: center;
        line-height: 80px;
        font-size: 36px;
        position: absolute;
        right: 18vw;
        bottom: 138px;
        a{
          color: #fff;
        }
        &.zh {
          width: 300px;
        }
      }
    }

    .panel5 {
      height: 1907px;

      .title1 {
        margin-top: 200px;
        font-size: 44px;
        text-align: center;
      }

      .lable1 {
        margin-top: 73px;

        .item {
          width: 80vw;
          margin: auto;
          justify-content: space-around;
          display: flex;

          .text {
            margin-top: 26px;
            color: #888888;
            width: 196px;
          }

          &.item2 {
            margin-top: 58px;
          }
        }
      }

      .immediately {
        margin: auto;
        margin-top: 120px;
        width: 553px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background: rgba(90, 79, 239, 0);
        font-size: 36px;
        border: 2px solid rgba(90, 79, 239, 1);
        border-radius: 40px;
        cursor: pointer;
        a{
          color: #5A4FEF;
        }
        &.zh {
          width: 300px;
        }
      }

      .title2 {
        margin-top: 255px;
        font-size: 44px;
        text-align: center;
      }

      .describe {
        width: 1032px;
        margin: auto;
        margin-top: 82px;
        text-align: center;
        font-size: 30px;
        color: #888888;
      }
      .download{
        display: flex;
        margin: auto;
        margin-top: 93px;
        justify-content:space-around;
        width: 80vw;
        .box{
          width:203px;
          height:203px;
          background:#EAEBFD;
          border-radius:60px;
          display: flex;
          justify-content: center;
          align-items: center
        }
        .box2{
          width:203px;
          height:203px;
          background:#F1E9FC;
          border-radius:60px;
          display: flex;
          justify-content: center;
          align-items: center
        }
        p{
          font-size: 30px;
          color:#474A99;
          margin-top: 54px;
        }
      }
    }
    .panel6{
      height: 250px;
      background: #45455C;
      .lable{  
      display: flex;
      padding: 0 10vw;
      justify-content: space-around ;
      align-items: center;
      align-items:  flex-start  ;
      margin: auto;
        .left{
        margin-top: 115px;
        display: flex;
        img{
          width: 80px;
          height: 58px;
        }
        p{
          font-size: 30px;
          color: #FFF;
          line-height: 30px;
          margin-bottom:10px;
        }
      }
      .right{
        color:#fff;
        font-size: 30px;
        margin-top: 155px;
      }
      }
      
    }
  }
</style>