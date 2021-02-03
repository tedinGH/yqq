<template>
  <div class="myemojibox" >
    <div class="dialo">
    <span class="close" @click="close()"></span>
    <div class="header">
        <input type="text" :placeholder="$t('msg.menu.search')" v-model="searchKey" />
        <span v-show="searchKey!=''" class="clean" @click="searchKey=''"></span>
      </div>
      <div class="display-flex two-btn">
        <div class="btn" :class="{active:activeName==1}" @click="checkactive(1)">{{$t('msg.emojishow.MyStickers')}}</div>
        <div class="btn" :class="{active:activeName!=1}" @click="checkactive(2)">{{$t('msg.emojishow.Trending')}}</div>
      </div>
      <ul v-if="activeName==1" v-scrollBar style="position: relative; height: 367px">
        <li v-for="(obj , idx) in myselectList" :key="idx" >
          <div class="hot-emoji">
            <span class="up dis" v-if="idx==0||searchKey!=''"></span>
            <span class="up" @click="upOen(idx)" v-else></span>
            <span class="down dis" v-if="idx==myselectList.length-1||searchKey!=''"></span>
            <span class="down" @click="downOne(idx)" v-else></span>
            <div class="img"  @click="openProgress(obj)" :data-index="`{%type%:%emoji%,%mid%:${obj.bqbId}}`">
              <img :src="global.fileDownUrl + 'compress/' + obj.bqbCoverUrl" style="width: 50px; height: 50px" />
            </div>                                                                        
            <div class="emoji-box display-flex"  @click="openProgress(obj)" :data-index=" `{%type%:%emoji%,%mid%:${obj.bqbId},%name%:%${obj.bqbName}%}`">
              <div class="content">{{ obj.bqbName }}</div>
              <span class="unfold" :class="{active:obj.progress==1}"></span>
            </div>
          </div>
          <div class="emoji-detil" v-if="obj.progress==1">
            <li class="detil-item"  v-for="(i, index) in obj.detil"  :key="index">
              <img :src="global.fileDownUrl + 'compress/' + i.bqMainUrl">
            </li>
          </div>
        </li>
        <div class="display-flex display-flex-item" style="flex-direction: column" v-if="myselectList.length == 0 && searchKey!=''">
            <img src="../../assets/images/search/datanone.png">
            <p style="color:#5F717F">{{$t('msg.friendList.searchKey')}}</p>
        </div>
      </ul>
      <ul v-else style="height: 367px; position: relative" v-scrollBar @ps-y-reach-end="scrollEnd">
        <li v-for="(item, idx) in selectList" :key="idx">
          <div class="hot-emoji display-flex">
            <div>
                <span class="myemoji-icon success" v-if="item.download == 1"></span>
                <span class="myemoji-icon wait" v-else-if="item.download == 2"></span>
                <span class="myemoji-icon" @click.stop="addEmoji(item.bqbId, idx)" v-else></span>
              </div>
            <div class="emoji-img" style="margin-left: 10px">
              <img class="img" :src="global.fileDownUrl + 'compress/' + item.bqbCoverUrl"
                style="width: 48px; height: 48px" />
            </div>
            <div class="emoji-box display-flex"  @click="openProgress(item)">
              <div class="hotemoji-text" v-html="item.bqbName">
              </div>
              <span class="unfold" :class="{active:item.progress==1}"></span>
            </div>
          </div>
          <div class="emoji-detil" v-if="item.progress==1">
            <li class="detil-item"  v-for="(i, index) in item.detil"  :key="index">
              <img :src="global.fileDownUrl + 'compress/' + i.bqMainUrl">
            </li>
          </div>
        </li>
        <div class="display-flex display-flex-item" style="flex-direction: column" v-if="selectList.length == 0 && searchKey!=''">
          <img src="../../assets/images/search/datanone.png">
          <p style="color:#5F717F">{{$t('msg.friendList.searchKey')}}</p>
        </div>
      </ul>
      <div class="my-popup deldialo-box" v-show="emojidel">
        <div class="deldialo">
          <span class="close" @click="emojidel = false"></span>
          <div class="text" v-if="langIdx==1">Are you sure to delete this emoji？</div>
          <div class="text" v-if="langIdx==2">ဤအီမိုဂျီကိုဖျက်ရန်​သေချာလား။？</div>
          <div class="text" v-if="langIdx==0">确认删除该表情吗？</div>
          <div class="judge">
            <a class="cancel" href="javascript: ;" @click="emojidel = false">{{
              $t("msg.emojishow.Cancel")
            }}</a>
            <a class="confirm" href="javascript: ;" @click="delEmojiconfirm()">{{ $t("msg.emojishow.Remove") }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import { sessionUtil} from "@/session/sessionUtil.js"
import { mapGetters } from "vuex"
import "@/common/pinyin";
  export default {
    data() {
      return {
        activeName: 1,
        // list: [],
        AllList:[],
        pageNum: 1,
        pageSize: 20,
        myemoji2: [],
        emojiList2: [],
        // delname: '',
        delid: '',
        emojidel: false,
        langIdx:0,
        searchKey:'',
      }
    },
    computed: {
      ...mapGetters(["myemoji"]),
      selectList(){
        if (this.searchKey=='') {
          return this.AllList
        } else {
          let list = [];
          for (let key in this.AllList) {
            let item = this.AllList[key]
            let m = PinyinMatch.match(item.bqbName, this.searchKey);
            if (m) {
              // item["bqbName"] = this.redFont(item.bqbName, m[0], m[1])
              list.push(item)
            } 
          }
          return list;
        }
      },
      myselectList(){
        if (this.searchKey=='') {
          return this.myemoji.myemojilist
        } else {
          let list = [];
          for (let key in this.myemoji.myemojilist) {
            let item = this.myemoji.myemojilist[key]
            let m = PinyinMatch.match(item.bqbName, this.searchKey);
            if (m) {
              // item["bqbName"] = this.redFont(item.bqbName, m[0], m[1])
              list.push(item)
            } 
          }
          return list;
        }
      },
    },
    methods: {
      close() {
        this.myemoji.show = false
      },
      checkactive(obj) {
        if (obj== 1) {
          this.gainemojiList()
          this.activeName=1
        }
        if (obj== 2) {
          let obj = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
          this.activeName=2
          if(this.selectList.length>0){
            for (let j = 0; j < this.selectList.length ; j++) {
              this.selectList[j].download = 0;
              for (let i = 0; i < this.myemoji.emojiList.length; i++) {
                if (this.selectList[j].bqbId ==  this.myemoji.emojiList[i].bqbId) {
                  this.selectList[j].download = 1;
                }
              }
            }
          }
        }
      },
      changeStates(list) {
      for (let j = 0; j < list.length ; j++) {
        for (let i = 0; i < this.myemoji.emojiList.length; i++) {
          if (list[j].bqbId ==  this.myemoji.emojiList[i].bqbId) {
            list[j].download = 1;
          } else {
            if (!list[j].download) {
              list[j].download = 0;
            }
          }
        }
        list[j].progress = 0;
        list[j].detil = []
        // this.list.push(list[j])
        this.AllList.push(list[j])
      }
    },
      addEmoji(id, idx) {
        this.selectList[idx].download = 2
        let obj = {
          bqbId: id
        }
        this.$http.addEmoji(obj).then(
          (data) => {
            this.myemoji.myemojilist.unshift(data)
            this.myemoji.emojiList.splice(1, 0, data)
            this.selectList[idx].download = 1
            if (this.myemoji.emojiList.length >= 7) {
              this.myemoji.emojiPage = Math.ceil(
                this.myemoji.emojiList.length / 7
              )
            }
            let myemoji = {
              show: true,
              myemojilist: this.myemoji.myemojilist,
              emojiList: this.myemoji.emojiList,
              emojiPage: this.myemoji.emojiPage,
            }
            this.$store.commit("SET_MYEMOJI", myemoji)
            let obj = this.$parent.$refs.chat.$refs.chatHistory.$refs.emoji
            obj.emojiPageIndex = 1
            obj.switchList(obj.currentList[0].bqbId, 0);
          },
          () => {}
        )
      },
      delEmojiconfirm() {
        let obj = {
          bqbId: this.delid
        }
        this.$http.deleteEmoji(obj).then(
          (data) => {
            this.myemoji.myemojilist = this.myemoji.myemojilist.filter(
              (item) => item.bqbId !== this.delid
            )
            this.myemoji.emojiList = this.myemoji.emojiList.filter(
              (item) => item.bqbId !== this.delid
            )
            this.emojidel = false
            let myemoji = {
              show: true,
              myemojilist: this.myemoji.myemojilist,
              emojiList: this.myemoji.emojiList,
              emojiPage:  this.myemoji.emojiPage = Math.ceil(this.myemoji.emojiList.length / 7)
            }
            this.$store.commit("SET_MYEMOJI", myemoji)
            let obj = this.$parent.$refs.chat.$refs.chatHistory.$refs.emoji
            obj.emojiPageIndex = 1
            obj.switchList(obj.currentList[0].bqbId, 0);
          },
          () => {}
        )
      },
      openProgress(item){
        if(item.progress==0){
          item.progress = 1
          let id = item.bqbId
          let detil= sessionUtil.getlocalSessionEmojiDetail(id)
          if(detil){
            item.detil = detil
          }else{
            this.$http.emojiDatail({
            bqbId: id
          }).then(
            data => {
              item.detil = data.listPackageDetails;
              sessionUtil.setLocalSessionEmojiDetail(id,data.listPackageDetails)
            },
            () => {}
          );
          }
        }else{
          item.progress = 0
        }
      },
      gainemojiList() {
        this.myemoji.myemojilist = []
        this.myemoji.emojiList = [{
          bqbCoverUrl: "otc/static/images/emoji.png",
          bqbId: 9999,
        }, ]
        this.$http.emojiList({}).then(
          (data) => {
            data.forEach((v) => {
              v.bqbCoverUrl = v.bqbCoverUrl
              v.progress=0
              v.detil=[]
              this.myemoji.emojiList.push(v)
              this.myemoji.myemojilist.push(v)
            })
            this.myemoji.emojiPage = Math.ceil(this.myemoji.emojiList.length / 7)
            let myemoji = {
              show: true,
              myemojilist: this.myemoji.myemojilist,
              emojiList: this.myemoji.emojiList,
              emojiPage: this.myemoji.emojiPage,
            }
            this.$store.commit("SET_MYEMOJI", myemoji)
          },
          () => {}
        )
      },
      scrollEnd(){
        if(this.pageNum>0){
        let obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        this.pageNum = this.pageNum + 1
          this.$http.loadEmoji(obj).then(
          data => {
            if(data.pageNum<this.pageNum-1) {
              return
              }else{
                this.changeStates(data.list);
              }
            },() => {}
          )
        }
      },
      //更新列表
      renewal(){
        this.myselectList.forEach((v, index) => {
          v.sort = index + 1
        })
        let updatelist = this.myselectList.map((ele) => {
          return {
            id: ele.id,
            sort: ele.sort,
          }
        })
        updatelist = JSON.stringify(updatelist)
        let obj = {
          listMySort: updatelist
        }
        this.$http.updateEmoji(obj).then(
          (data) => {},
          () => {}
        )
        let ccc = [{
          bqbCoverUrl: "otc/static/images/emoji.png",
          bqbId: 9999,
        }, ]
        let list = ccc.concat(this.myselectListt)
        let myemoji = {
          show: true,
          myemojilist: this.myselectList,
          emojiList: list,
          emojiPage: this.myemoji.emojiPage,
        }
        this.$store.commit("SET_MYEMOJI", myemoji)
      },
      upOen(i){
        let tempOption = this.myselectList[i-1];
        this.$set(this.myselectList, i-1, this.myselectList[i]);
        this.$set(this.myselectList, i, tempOption)
        this.renewal()
      },
      downOne(i){
        let tempOption = this.myselectList[i+1];
        this.$set(this.myselectList, i+1, this.myselectList[i]);
        this.$set(this.myselectList, i, tempOption)
        this.renewal()
      }
    },
    mounted() {
      if (localStorage.lang == "en_US") {
        this.langIdx = 1;
      }
      if (localStorage.lang == "my") {
        this.langIdx = 2
      };
      this.gainemojiList()
     
    },
  }
</script>
<style lang="scss">
@import "../../assets/css/var";
  .myemojibox {
    position: absolute;
    z-index: 7788;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);

    .dialo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      width: 472px;
      height: 492px;
      border-radius: 8px;
    .close{
      display: inline-block;
      width: 24px;
      height: 24px;
      position: absolute;
      background: url(../../assets/images/icon/close3.png);
      right: 11px;
      cursor: pointer;
      z-index: 100;
    }
    .header{
      position:relative;
      height:75px;
      padding:28px 40px 10px;
      input{
        width: 391px;
        height: 34px;
        background: #F4F7FA;
        border: 1px solid #E1E6EC;
        border-radius: 17px;
        padding: 10px;
      }
      .clean{
        position:absolute;
        top:50%;
        right: 48px;
        height:24px;
        width:24px;
        margin-top:-4px;
        cursor:pointer;
        background-image: url(../../assets/images/search/close.png);
        background-size: 100% 100%;
        opacity: .7;
        &:hover{
        background-image: url(../../assets/images/search/close.png);
          opacity: 1;
        }
      }
    }
    .emoji-detil{
      display: flex;
      width: 420px;
      flex-wrap: wrap;
      margin-left: 31px;
      padding: 5px;
      margin-top: 6px;
      li{
        width: 60px;
        height: 60px;
        margin-left: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        &:hover{
          background: $active-backgroup;
        }
        img{
          width: 60px;
          height: 60px;
        }
      }
    }
    .two-btn{
      justify-content: center;
      margin-bottom: 15px;
      .btn{
        width: 186px;
        height: 32px;
        border: 1px solid rgba($color-theme, 0.5);
        border-radius: 16px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        color: $color-theme;
        &:nth-child(1){
          margin-right: 18px;
        }
        &.active{
          background: $color-theme;
          color: #fff;
        }
      }
    }
      .is-top {
        width: 232px;

        #tab-first {
          width: 116px;
          text-align: center;
          padding: 0;
        }

        #tab-second {
          width: 116px;
          text-align: center;
          padding: 0;
        }
      }

   


      .control {
        margin-left: 20px;
        margin-right: 23px;
      }

      .color-box {
        transition: transform 0.5s;
      }

      .color-box.dragging {
        transform: scale(1.1);
      }

      .hot-emoji {
        height: 60px;
        display: flex;
        align-items: center;
        &:hover{
          background: $active-backgroup;
        }
        .up{
          display: block;
          width: 20px;
          height:20px;
          background: url(../../assets/images/icon/up.png);
          margin:0 16px 0 41px;
          cursor: pointer;
          &:hover{
            background: url(../../assets/images/icon/up-active.png);
          }
          &.dis{
            background: url(../../assets/images/icon/up-dis.png);
          }
        }
        .down{
          display: block;
          width: 20px;
          height:20px;
          cursor: pointer;
          background: url(../../assets/images/icon/down.png);
          &:hover{
            background: url(../../assets/images/icon/down-active.png);
          }
          &.dis{
            background: url(../../assets/images/icon/down-dis.png);
          }
        }
        .img {
          margin-left: 10px;
          margin-right: 20px;
        }

        .name {
          font-size: 12px;
          font-weight: 600;
        }

        .emoji-box {
          flex: 1;
          height: 60px;
          justify-content: space-between;
          margin-right: 40px;
          cursor: pointer;
          .unfold{
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(../../assets/images/icon/sss.png);
            cursor: pointer;
            &.active{
              transition: all 0.2s linear;
              background: url(../../assets/images/icon/sss180.png);
            }
          }
        }

        .myemoji-icon {
          display: block;
          width: 24px;
          height: 24px;
          margin-left:40px;
          background: url(../../assets/images/emoji-add.png) no-repeat;
          background-size: 100%;

          &.success {
            background: url(../../assets/images/emoji-success.png) no-repeat;
            background-size: 100%;
          }

          &.wait {
            background: url(../../assets/images/emoji-wait.png) no-repeat;
            background-size: 100%;
          }
        }
      }
    }

    .deldialo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      background: #fff;
      width: 420px;
      height: 200px;
      border-radius: 8px;
        .text {
            margin-left: 22px;
            margin-top: 75px;
            font-size: 16px;
            color: #122030;
          }

          .judge {
            position: absolute;
            bottom: 10px;
            display: flex;
            right: 20px;
            .cancel {
              margin-right: 10px;
            }

          }

          .cancel {
            width: 95px;
            height: 40px;
            background: #FFFFFF;
            border: 1px solid $color-theme;
            opacity: 0.5;
            border-radius: 4px;
            line-height: 40px;
            text-align: center;
            color: $color-theme;
            text-decoration: none;
          }
          .confirm { 
            text-decoration: none;
            line-height: 40px;
            text-align: center;
            width: 115px;
            height: 40px;
            background: $delete-color;
            border-radius: 4px;
            color: #FFFFFF;
          }

        
      .close {
        width: 12px;
        height: 12px;
        display: block;
        position: absolute;
        top: 15px;
        right: 15px;
        background: url(../../assets/images/chat/icon-window-close.png) center center no-repeat;
        cursor: pointer;

        &:hover {
          background: url(../../assets/images/chat/icon-window-close-red.png) center center no-repeat;
        }
      }
    }
  }

</style>
