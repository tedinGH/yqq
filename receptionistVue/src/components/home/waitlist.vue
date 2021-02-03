<template>
  <div class="waitlist" @click.stop=";">
    <div class="sort">
      <span>Visitors to be accessed</span>
      <img src="../../assets/images/xx.png" @click="close">
    </div>
    <div class="content">
      <div class="table">
        <div class="table-top">
          <div>{{ $t("msg.wait.client")}}</div>
          <div>{{ $t("msg.wait.source")}}</div>
          <div>{{ $t("msg.wait.visit")}}</div>
          <div>{{ $t("msg.wait.wait")}}</div>
          <div>{{ $t("msg.wait.frequency")}}</div>
          <div>{{ $t("msg.wait.page")}}</div>
        </div>
        <div class="table-body" >
          <ul>
            <li v-for="(item,idx) in waitLists" :key="idx" class="waititem">
              <div> 
                <div>{{item.ipSource}} {{item.visitorsId}}</div> 
                <!-- <div  :class="item.onlineStatus=='1'?'online':'off-line'">
                  <div v-if="item.onlineStatus=='1'">{{ $t("msg.wait.online")}}</div>
                  <div v-else>{{ $t("msg.wait.offline")}}</div>
                </div> -->
              </div>
              <div>
                <img class="pc" src="../../assets/img/pc.png" v-if="item.source=='1'">
                <img class="phone" src="../../assets/img/phone.png" v-if="item.source=='0'">
                <img class="phone" src="../../assets/img/phone.png" v-if="item.source=='2'">
              </div>
              <div>{{item.createTime |timeFilter4}}</div>
              <div>{{item.waittime}}</div>
              <div>{{item.visitNum}}</div>
              <div :title="item.sourceUrl">{{item.sourceUrl}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "waitlist",
    data() {
      return {
        settime:null,
        openTime:0
      }
    },
    computed: {
      ...mapGetters(["endLists", "waitLists", "sessionLists", 'currentSession', 'showwait', "windowSize"]),
    },
    methods: {
      close(){
        this.$store.dispatch("setLayout",  ["", "", false]);
      },
      getRemainderTime(startTime,sysTime) {
        let days = this.$t("msg.wait.day")
        let s1 = startTime 
        let s2 = sysTime + (1000*this.openTime)
        let runTime = parseInt((s2 - s1) / 1000);
        let year = Math.floor(runTime / 86400 / 365);
        runTime = runTime % (86400 * 365);
        let month = Math.floor(runTime / 86400 / 30);
        runTime = runTime % (86400 * 30);
        let day = Math.floor(runTime / 86400);
        runTime = runTime % 86400;
        let hour = Math.floor(runTime / 3600);
        runTime = runTime % 3600;
        let minute = Math.floor(runTime / 60);
        runTime = runTime % 60;
        let second = runTime;
        if (hour < 10) {
          hour = "0" + hour
        }
        if (minute < 10) {
          minute = "0" + minute
        }
        if (second < 10) {
          second = "0" + second
        }
        if(day=='0'){
          return hour + ':' + minute + ':' + second
        }else{
          return day + days +" "+hour + ':' + minute + ':' + second
        }
        
      }
    },
    mounted() {
      //修改等待时间
    this.settime =  setInterval(() => {
      let list = this.waitLists.map(v=>{
        return {
          ipSource:v.ipSource,
          visitorsId:v.visitorsId,
          source:v.source,
          createTime:v.createTime,
          waittime:this.getRemainderTime(v.createTime,v.sysTime),
          visitNum:v.visitNum,
          sysTime:v.sysTime,
          sourceUrl:v.sourceUrl,
          onlineStatus:v.onlineStatus
        }
      }) 
      this.$store.commit("SET_WAITLISTS",list);
      this.openTime = this.openTime + 1
    }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.settime)
    }
  };
</script>

<style lang="scss" scoped>
  .waitlist {
    z-index: 9999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 965px;
    height: 677px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 3px 3px 3px 3px #949CA4;
    .sort {
      width: 100%;
      height: 46px;
      line-height: 46px;
      background: #fff;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      img{
        align-self:center;
        cursor: pointer;
      }
    }

    .content {
      border-radius: 10px;
      width: 100%;
      flex: 1;
      background: $backgroup-color;
      .table {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background: #fff;
        .table-top {
          display: flex;
          width: 965px;
          position: relative;
          background: #E6F4FF;
          font-size: 14px;
          height: 48px;
          line-height: 48px;
          div:nth-child(1) {
            width: 260px;
            text-align: center;
          }

          div:nth-child(2) {
            width: 70px;
            text-align: center;
          }

          div:nth-child(3) {
            width: 168px;
            text-align: center;
          }

          div:nth-child(4) {
            width: 123px;
            text-align: center;
          }

          div:nth-child(5) {
            width: 123px;
            text-align: center;
          }

          div:nth-child(6) {
            width: 220px;
            text-align: center;
          }
        }
      }

      .table-body {
        border-radius: 10px;
        height: 583px;
        ul {
          position: relative;
          width: 965px;
          .waititem {
            width: 965px;
            display: flex;
            height: 70px;
            border-bottom: 1px solid #DCE0E7;
            div{
              text-align: center;
              display: flex;
              flex-direction:column;
              justify-content: center
            }
            div:nth-child(1) {
            width: 260px;
            overflow: hidden;                    
            white-space:nowrap;                 
            text-overflow:ellipsis;
            .online{
              color:#51FF8A ;
              margin-left: 20px;
            }
            .off-line{
              color:#949CA4 ;
              margin-left: 20px;
            }
          }

          div:nth-child(2) {
            width: 70px;
            align-items:  center;
          }

          div:nth-child(3) {
            width: 168px;
          }

          div:nth-child(4) {
            width: 123px;
          }

          div:nth-child(5) {
            width: 123px;
          }

          div:nth-child(6) {
            width: 220px;
            display: block;
            line-height: 70px;
            padding: 0 2px;
            overflow: hidden;                    
            white-space:nowrap;                 
            text-overflow:ellipsis;
          }
          }
        }
      }
    }
  }
</style>