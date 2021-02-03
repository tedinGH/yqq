<template>
  <div class="track">
    <header>
      <li v-for="(item,idx) in topTab" :key="idx" @click="check=item.value">
        <div :class="{active:item.value==check}"><span :class="item.name"></span><p>{{item.name}}</p></div>
      </li>
    </header>
    <div v-if="check==1" class="informations">
      <div class="info" style="margin-bottom:25px">
        <span class="type">Source：</span>
        <span v-if="info.source==1">PC</span>
        <span v-else>App</span>
      </div>
      <div class="info">
        <span class="type">Browser：</span>
        <img v-if="browser==0" src="../../../assets/images/chat/browser.png"> 
        <img v-if="browser==1" src="../../../assets/images/chat/chrome.png"> 
        <img v-if="browser==2" src="../../../assets/images/chat/Firefox.png"> 
        <img v-if="browser==3" src="../../../assets/images/chat/Safari.png"> 
        <span>{{info.browserName}}</span>
      </div>
      <div class="info img">
        <span class="type">System：</span>
        <img src="../../../assets/images/chat/win10.png" v-if="info.systemName=='Windows'||info.systemName=='Windows 7'||info.systemName=='Windows 8'"><img src="../../../assets/images/chat/iOS.png" v-else>
        <span>{{info.systemName}}</span>
      </div>
      <div class="info bottom">
        <span class="type">Territory&IP：</span>
        <span>{{info.ipSource}} {{info.ip}}</span>
      </div>
      <div class="info bottom url">
        <span class="type">Access address：</span>
        <span class="sourceurl">{{info.sourceUrl}}</span>
      </div>
      <div class="info bottom">
        <span class="type">Visits：</span>
        <span>{{info.visitorsNum}}</span>
      </div>
      <div class="info bottom">
        <span class="type">Visit time：</span>
        <span v-html="info.visitorsTime"></span>
      </div>
    </div>
    <div v-if="check==2">
    </div>
    <div v-if="check==3">
      <ul class="path" v-scrollBar>
        <li v-for="(i,index) in list" :key="index">
          <div class="visit">
          <span class="spot" :class="{first:index==0}"></span>  <p>访问</p> {{list.length-index}}/{{list.length}}
          </div>
          <div class="box" >
              <div class="content" style="margin-top:0">
                <span class="time">Visit time</span><p>{{i.beginTime|timeFilter3}}</p>
              </div>
              <div class="content">
                <span class="time">End time</span><p>{{i.endTime|timeFilter3}}</p>
              </div>
              <div class="content">
                <span class="time">Duration of visit</span><p>{{Math.round((i.endTime-i.beginTime)/1000)}} s</p>
              </div>
            <div class="content" v-if="list.length-index!=1">
              <span class="time">Visit way</span>
              <p v-if="i.accessMode == 1">Active access</p>
            </div>
          </div>
          <div class="content last" v-if="list.length-index==1">
            <span class="spot"></span> 
            <span class="time">Visit way</span>
            <p v-if="i.accessMode == 1">Active access</p>
          </div>
        </li>
      </ul>
        <!-- {{list}} -->
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapGetters } from "vuex";
  import { Util } from "@/tools/utils";
  import { timeUtil } from "@/tools/timeUtil";
  export default {
    name: "reply",
    data() {
      return {
        info: {},
        browser:null,
        topTab:[
            {
              text:'Visitor information',
              name:'information',
              value:1,
            },
            // {
            //   text:'Business card',
            //   name:'card',
            //   value:2,
            // },
            {
              text:'Access track',
              name:'trajectory',
              value:3,
            }
        ],
        check:1,
        list:null
      }
    },
    watch:{
      currentSession(ov,nv){
        this.getinfo()
      }
    },
    computed: {
      ...mapGetters(["userInfo", 'currentSession']),
    },
    methods: {
      getinfo(){
          this.$api.getvisitorinfo({id:this.currentSession.chatId}).then(
          res=>{
            this.info=res.data
            this.info.visitorsTime=timeUtil.toDate(this.info.visitorsTime) +`&nbsp;`+ timeUtil.toTime(this.info.visitorsTime) 
            if(this.info.browserName.indexOf('Chrome')!=-1){
              this.browser=1
            }else if(this.info.browserName.indexOf('Firefox')!=-1){
              this.browser=2
            }else if(this.info.browserName.indexOf('Safari')!=-1){
              this.browser=3
            }else{
              this.browser=0
            }
          }
        )
        this.$api.getVisitorTrajectory({id:this.currentSession.chatId}).then(
          res=>{
            this.list = res.data
          }
        )
      }
    },
    created(){
      this.getinfo()
    },
    mounted() {
    
    }
  };
</script>

<style lang="scss" scoped>
  .track {
    width: 447px;
    height: calc(100vh - 60px);
    border-left: 1px solid #E1E5F1;
    header{
      height: 66px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li{
        cursor: pointer;
        div{
          height: 66px;
          line-height: 66px;
          &.active{
            border-bottom:3px solid $color-theme;
          }
          display: flex;
          p{
            display: inline-block;
          }
          span{
            &.information{
              display: inline-block;
              width: 17px;
              height: 66px;
              margin-right: 5px;
              background: url(../../../assets/images/chat/information.png) no-repeat center
            }
            &.trajectory{
              
                display: inline-block;
                width: 17px;
                height: 66px;
                margin-right: 5px;
                background: url(../../../assets/images/chat/trajectory.png) no-repeat center
              
            }
          }
        }
      }
    }
    .informations{
      padding: 23px 20px;
    .info{
      margin-left:14px;
      font-size: 16px;
      &.url{
        display: flex;
        .type{
          display: block;
        }
        .sourceurl{
          display: inline-block;
          width: 250px;
          word-wrap: break-word;
        }
      }
      .type{
        color: #949CA4;
      }
    }
    .img{
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .bottom{
      margin-bottom: 25px;
    }
    }
    .path{
      position: relative;
      height: calc(100vh - 126px);
      padding: 25px 15px;
      .box{
        padding-top: 24px;
        padding-bottom: 27px;
        padding-left: 16px;
        border-left: 2px solid #C5D2F8;
        margin-left: 2.5px;
        &.last{
          padding-bottom: 0px;
        }
      }
      .visit{
        display: flex;
        align-items:  center;
        p{
          margin-right: 20px;
        }
        .spot{
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #8099E3;
          border-radius: 50%;
          margin-right: 11.5px;
          &.first{
            background: #FF7975;
          }
        }
      }
      .content{
        display: flex;
        margin-top: 27px;
        &.last{
          margin-top: 0px;
          align-items:  center;
          .spot{
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #FFC92B;
            border-radius: 50%;
            margin-right: 13px;  
          }
        }
        .time{
          color: #949CA4;
          margin-right: 11px;
        }
      }
    }
  }

</style>