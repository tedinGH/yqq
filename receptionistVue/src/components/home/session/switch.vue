<template>
<div class="switch" @click.stop=""  v-if="list.length >= 1 && !one">
  <header>
    Select the agent to be transferred
    <span class="close" @click="close"></span>
  </header>
  <div class="search-box">
    <input type="text"  placeholder="search" v-model="content">
    <span class="search" v-if="content==''"></span>
  </div>
  <ul class="list" v-scrollBar>
    <li v-for="(item, idx) in swichCan" :key="idx" class="list-item">
      <div v-if="item&&item.id!=userInfo.id" class="text">
        <span class="check" :class="{active:item.check==1}" @click="chang(item.id)"></span>
        <span>{{item.nickName}}</span>
        <span v-if="item.departmentName">（{{item.departmentName}}）</span>
        <span v-if="item.groupingName"> -{{item.groupingName}}</span>
      </div>
    </li>
  </ul>
  <div class="btn" @click="confirm">
    Confirm
  </div>
</div>
<div class="switchs" v-else-if="list.length == 0 || one" @click.stop="" >
  No other customer service can be received 
  <div class="btn" @click="close">
    Confirm
  </div>
</div>
</template>

<script>
  import { mapGetters } from "vuex"
  export default {
    name: "switchs",
    data() {
      return {
        content:'',    //搜索内容
        swichCan:[],
        list:[],
        ischeck:false,
        one:false
      }
    },
  computed: {
    ...mapGetters(["userInfo",'currentSession']),
    },
    watch:{
      content(ov, nv){
        this.swichCan = this.friendQuery(this.list, this.content);
      }
      
    },
    methods:{
      close(){
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      chang(id){
        let checkId = id
        for(let i=0; i<this.swichCan.length;i++){
          if(this.swichCan[i].id == checkId) {
            this.swichCan[i].check=1
          }  else {this.swichCan[i].check=0}
        }
        for(let i=0; i<this.list.length;i++){
          if(this.list[i].id == checkId) {
            this.list[i].check=1
          }  else {this.list[i].check=0}
        }
        this.ischeck = true
      },
      confirm(){
        if(!this.ischeck) {
          this.$message.warning('Please select customer service')
          return
        }
        for(let i=0; i<this.swichCan.length;i++){
          if(this.swichCan[i].check == 1){
            let id = this.swichCan[i].id
            localStorage.setItem("lastId", id)
            this.$api.switchsession({customerId:id,sessionId:this.currentSession.sessionId}).then(
              res=>{
                if(res.code==100){
                  this.$message.error('The transfer failed, the other party does not access the new visitor temporarily')
                  return
                }else if(res.code==0){
                  this.close(),
                  this.$store.commit("REMVOE_SESSIONLISTS", this.currentSession.chatId)
                }
              }
              
            )
          }
        }
      },
      friendQuery(list,key){
        let arr = []
        for(let i=0; i<list.length;i++){
          let item = list[i]
          let m, n , o
          if (item.nickName) m= PinyinMatch.match(item.nickName, key)
          if (item.departmentName)  n = PinyinMatch.match(item.departmentName, key)
          if (item.groupingName)  o = PinyinMatch.match(item.groupingName, key)
          if(m||n||o){
            arr[i] = item
          }
        }
        if (key == ''){
          arr = this.list
        }
        let newArr = []
        arr.forEach(item => {
        if (item) {
          newArr.push(item)
        }
        })
        return newArr
      }
    },
    mounted(){
      this.$api.getlistswitch({content:'',preSelectedUserId:localStorage.getItem("lastId")||''}).then(
        res=>{
          for(let i=0; i<res.data.length;i++){
            res.data[i].check=0
          }
          this.list = res.data
          if(this.list.length==1 &&  this.list[0].id == this.userInfo.id){
            this.one = true
          }
          this.swichCan = res.data
        }
      )
    }
  };
</script>·

<style lang="scss" scoped>
.switch {
    z-index: 9999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 559px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding-top: 14px;
    padding-left: 20px;
    padding-right: 20px;
    header{
      position: relative;
      .close{
        position: absolute;
        display: inline-block;
        width: 19px;
        height: 17px;
        background: url(../../../assets/images/xx.png);
        right: 0;
        cursor: pointer;
      }
    }
  .search-box{
    margin-top: 20px;
    width: 346px;
    height: 39px;
    background: #F0F2F7;
    border-radius: 5px;
    position: relative;
    input{
      width: 346px;
      height: 39px;
      background: #F0F2F7;
      border-radius: 5px;
      padding-left: 20px;
    }
    input::-ms-input-placeholder{text-align: center;}
    input::-webkit-input-placeholder{text-align: center;}
    .search{
        position: absolute;
        display: inline-block;
        width: 21px;
        height: 19px;
        background: url(../../../assets/images/search2.png);
        right: 185px;
        top: 12px;
        cursor: pointer;
    }
  }
  .list{
    margin-top: 17px;
    height: 370px;
    position: relative;
    .list-item{
      font-size: 14px;
      margin-bottom: 29px;
      .text{
        overflow: hidden;                  
        white-space:nowrap;                 
        text-overflow:ellipsis;      
        display: flex;
        align-items: center;
        .check{
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url(../../../assets/img/dot.png);
          margin-right: 14px;
          cursor: pointer;
          &.active{
            background: url(../../../assets/img/dot-active.png);
          }
        }       
      }
    }
  }
  .tip{
    margin-top: 200px;
    text-align: center;
  }
  .btn{
    margin: auto;
    width: 78px;
    height: 34px;
    background: $color-theme;
    border-radius: 5px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
  }
}
.switchs{
  z-index: 9999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 393px;
    height: 170px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top:58px ;
    .btn{
    margin: auto;
    width: 78px;
    height: 34px;
    background: $color-theme;
    border-radius: 5px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
  }
}
  
</style>