<template>
  <transition name="scale-x">
    <Popup :title="$t('msg.menu.addFriendtitle')" :radius="'10'" :height="'60'" :lineheight="'60'">
      <div class="add-friend" slot="body">
        <div class="inputtext">{{ $t("msg.menu.inputtext3")}}</div>
        <input type="text"  v-model="firstname" class="text">
        <div class="inputtext">{{ $t("msg.menu.inputtext4")}}</div>
        <input type="text"  v-model="lastname" class="text">
        <div class="inputtext">{{ $t("msg.menu.inputtext")}}</div>
        <div class="display-flex box">
          <div class="search-input">
            <span class="countrycode"  :class="{ active:showSelect }" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
            <input type="number"  :placeholder="$t('msg.menu.inputtext2')" v-model="send.userName"
              class="tel">
            <div class="select-box" v-show="showSelect">
              <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
            </div>
          </div>
        </div>
        <div class="display-flex" style="justify-content:flex-end;width:420px">
          <button class="search-btn cancel" @click="cancel()">
            {{ $t("msg.common.cancel") }}
          </button>
          <button class="search-btn" @click="doSearch()">
            {{ $t("msg.common.confirms") }}
          </button>
        </div>
        <div class="noreceived" v-if="none">
          <div class="tip">{{$t("msg.tip.tip")}}</div>
          <div :class="lang=='zh_CN'?'content':'content en-my'">{{$t("msg.tip.Nouser")}}</div>
          <div :class="lang=='my'?'ensure my':'ensure'" @click="none=false">{{$t("msg.common.ensure")}}</div>
        </div>
      </div>
    </Popup>
  </transition>
</template>
<script>
  import { validate } from '@/tools/validate';
  import { Crypto } from "@/tools/crypto"
  import Vue from "vue";
  import {mapGetters} from "vuex";
  import CountryCode from './CountryCode.vue'
  export default {
    name: "add-friend",
    data() {
      return {
        lang: Vue.config.lang,
        tempItem: null,
        firstname:'',
        lastname:'',
        send: {
          userName: '',
          phoneCode: '+',
        },
        showSelect: false,
        none: false
      };
    },
    components: {
      CountryCode
    },
    computed:{
      ...mapGetters(["friendcard"]),
  },
    methods: {

      hide() {
        this.$emit("input", 0);
      },
      countrycodeHandler(data) {
        this.showSelect = !this.showSelect;
        this.send.phoneCode = data.PHONE_CODE;
      },
      isFriend(id) {
        if (
          this.$store.state.friendList[id] &&
          !this.$store.state.friendList[id].temp
        ) {
          return this.$store.state.friendList[id]
        } else {
          return false
        }
      },
      cancel(){
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      gotoChat(item) {
      item.fromType = 0
      var chat = this.$store.state.session.record[item.userId+'-'+item.fromType]
      if (!chat) {
        var newChat = {
          img: item.avatar,
          lastReadId: 0,
          mId: 0,
          fromType: item.fromType,
          msgType: 1,
          preview: "",
          temp:false,
          userTime: new Date().getTime()
        };
        if (item.fromType == 0) {
          newChat.name =  item.nickName 
          newChat.paramId = item.userId;
        }
        if (item.fromType == 1) {
          newChat.name = item.groupName;
          newChat.paramId = item.groupId;
        }
        newChat.isActivity=true;
        this.$store.commit("UPDATE_SESSION", newChat)
        this.$store.commit("UPDATE_CURRENT_SESSION", newChat)   
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.msgPanel.isSuccess"))
      }else{
        chat.isActivity=true;
        chat.name = item.notes
        chat.temp=false
        this.$store.commit("UPDATE_SESSION", chat)
        this.$store.commit("UPDATE_CURRENT_SESSION", chat)  
        this.$store.commit("UPDATE_CURRENT_SESSION", JSON.parse(JSON.stringify(chat)))
      }
      this.$store.dispatch("setLayout", ["", "", false])
    },
      doSearch() {
        if(this.firstname==''){
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.firstname"))
          return
        }
        if (this.send.phoneCode == '+') {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.lackareacode"))
          return
        }
        if (this.send.phoneCode != '+' && this.send.userName == '') {
          this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.lackphone"))
          return
        }
        if (this.send.phoneCode == '86') {
          if (!validate.isChinessPhone(this.send.userName)) {
            this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.phoneError"))
            return
          }
        }
        if (this.send.phoneCode != '+' && this.send.phoneCode != '86') {
          if (!validate.isPhone(this.send.userName)) {
            this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.phoneError"));
            return
          }
        }
        let obj ={contact:{
                  "phone":'+'+this.send.phoneCode+this.send.userName,
                  "first":this.firstname,
                  "last":this.lastname
        }}
        obj.contact = Crypto.encryptByDES(obj.contact,this.$store.getters.userId)
          this.$http.addcontactdi(obj).then(
            res=>{
              if(res.data){
                this.$store.dispatch("setLayout", ["", "", false])
                this.gotoChat(res.data)
            }else{
                this.$store.dispatch("setLayout", ["uc", "pr", true])
              }
            }
          )

      },
    },
    mounted(){
      if(this.friendcard.phone){
        this.send.userName=this.friendcard.phone
        this.send.phoneCode=this.friendcard.phoneCode
    }
      }
      
  };

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";

  //添加好友弹窗
  .add-friend {
    width: 420px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    .inputtext {
      color:$title-color;
      align-self: flex-start;
      margin-top: 20px;
      margin-left: 20px;
    }

    .box {
      align-self: flex-start;
      margin-left: 10px;
    }
    .text{
      margin-top: 8px;
      width: 380px;
      height: 40px;
      background: #F7F8FD;
      border: 1px solid #E1E6EC;
      border-radius: 4px;
      padding: 10px;
    }
    .search-input {
      width: 380px;
      height: 34px;
      border: 1px solid #E1E6EC;
      border-radius: 5px;
      margin-top: 12px;
      margin-left: 10px;
      input {
        height: 32px;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 16px;
        width: 292px;
      }
      input{
      -moz-appearance:textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }

      .countrycode {
        display: inline-block;
        line-height: 25px;
        width: 80px;
        text-indent:24px;
        border-right: 1px solid #bbb;
        background: url(../../assets/images/down.png) no-repeat;
        background-position: 50px 0;
        cursor: pointer;
        &.active{
        background: url(../../assets/images/up.png) no-repeat;
        background-position: 50px 0;
        }
      }
    }

    .list {
      width: 552px;
      height: 360px;
    }
    .search-btn{
      width: 115px;
      height: 40px;
      background: $color-theme;
      border-radius: 4px;
      margin: 20px 20px 0 10px;
      &.cancel{
        background: #fff;
        color: $color-theme;
        border: solid 1px $color-theme;
      }
    }
    .noreceived{
      position: absolute;
      top: 65px;
      width:315px;
      height:220px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      border: 1px solid #bbb;
      .tip{
        margin: 10px 0 0 15px;
        font-size: 18px;
      }
      .content{
        margin: 50px 0 0 50px;
        width:211px;
        text-align: center;
        line-height:30px;
        border-radius:10px;
        &.en-my{
         margin:20px 0 0 50px
        }
      }
      .ensure{
        
        margin: 30px auto;
        width:78px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background:rgba(53,146,216,1);
        border:1px solid rgba(53,146,216,1);
        border-radius:5px;
        color: #fff;
        cursor: pointer;
        &.my{
          margin-top: 10px;
        }
      }
    }
  }

</style>
