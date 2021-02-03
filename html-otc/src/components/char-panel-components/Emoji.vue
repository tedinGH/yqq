<template>
  <div :class="right.show?'showRight emoji-icon':'emoji-icon'" @click.stop="showRight(right.show)">
    <div class="emoji-wrap" @click.stop="" v-if="right.show">
      <div class="display-flex top">
        <div class="display-flex">
          <div class="showlistname"><span>{{showlistname.name}}</span></div>
          <!-- <a v-show="this.showList" href="javascript: ;" class="delete" style="margin-left:10px"
            @click.stop="delEmoji2(showlistname.bqbId,showlistname.name)">
            <img src="../../assets/images/del-emoji.png" style="width:18px; height:22px; margin-right:15px"
              ondragstart="return false">
          </a> -->
        </div>
        <a class="set-emoji" href="javascript: ;">
          <span class="set-emoji" @click="dialogout()"></span>
        </a>
      </div>
      <div class="emoji-detail" v-scrollBar>
        <ul v-if="!showLoading">
          <a href="javascript: ;" v-for="(item, index) in emojiDetailList" :key="index" @click="checkFace(item)">
            <li class="emoji-detail-item" v-if="!showList" style="width:44px;font-size: 20px;"> {{item}}</li>
            <li class="emoji-detail-item large" v-else>
              <img width="74" height="74" :src="global.fileDownUrl + 'compress/'+ item.bqThumbnailUrl"
                ondragstart="return false" />
            </li>
          </a>
        </ul>
      </div>
      <loading v-if="showLoading"></loading>
      <div class="emoji-list display-flex">
        <div class="display-flex">
          <a class="emoji-list-item" :class="{ active: emojiListIndex == index }" ondragstart="return false"
            href="javascript: ;" v-for="(item, index) in currentList" :key="index"
            @click="switchList(item.bqbId, index)">
            <img class="preview" v-if="index==0&&emojiPageIndex==1" :src="item.bqbCoverUrl"
              style="width:40px; height:40px;margin:4px 11px" ondragstart="return false" />
            <img class="preview" v-else :src="global.fileDownUrl + 'compress/'+item.bqbCoverUrl"
              style="width:28px; height:28px" ondragstart="return false" />
          </a>
        </div>
        <div class="switch-page display-flex">
          <a ondragstart="return false" class="switch-page-item" href="javascript: ;" @click="switchPage(0)">
            <span class="arrow left" :class="{ disable: emojiPageIndex < 2 }"></span>
          </a>
          <a ondragstart="return false" class="switch-page-item" href="javascript: ;" @click="switchPage(1)">
            <span class="arrow right" :class="{ disable: emojiPageIndex >=myemoji.emojiPage }"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Util } from "@/tools/utils"
  import { faceUrlMap } from "@/tools/emojis.js"
  import { sessionUtil} from "@/session/sessionUtil.js"
  import Vue from "vue"
  import { mapGetters } from "vuex"
  export default {
    data() {
      return {
        emojiList: [{
          bqbCoverUrl: 'otc/static/images/emoji.png',
          bqbId: 9999
        }],
        activeName: "first",
        emojidel2: false,
        DefaultList: [],
        emojiDetailList: [],
        emojiListIndex: 0,
        emojiPageIndex: 1,
        showList: false,
        showlistname: {},
        showLoading: false,
        langIdx: 0,
        list: [],
        myemojilist: [],
        pageNum: 0,
        pageSize: 20,
        timer: null,
        isDragging: false,
      };
    },
    watch:{
      // "right"(newValue, oldValue){
      //   this.emojiPageIndex = 1
      //   this.switchList(this.currentList[0].bqbId, 0);
      // } 
    },
    computed: {
      ...mapGetters(["myemoji", "right"]),
      currentList() {
        if (this.myemoji.emojiPage == 1) {
          return this.myemoji.emojiList;
        } else {
          let enough = this.myemoji.emojiList.length - (this.emojiPageIndex - 1) * 7;
          if (enough > 7) {
            return this.myemoji.emojiList.slice(
              (this.emojiPageIndex - 1) * 7,
              this.emojiPageIndex * 7
            );
          } else {
            return this.myemoji.emojiList.slice(
              (this.emojiPageIndex - 1) * 7,
              this.myemoji.emojiList.length
            );
          }
        }
      },
    },
    methods: {
      showRight(obj) {
        if (!obj) {
          this.getemojiList()
          let right = {
            show: true
          }
          this.$store.commit("SET_RIGHT", right);
          this.$store.dispatch("setLayout", ["cp", "em", false])
        }
        if (obj) {
          
          let right = {
            show: false
          }
          this.$store.commit("SET_RIGHT", right);
          this.$store.dispatch("setLayout", ['', '', false])
        }
      },
      changeState(list) {
        let last = this.pageNum == 0 ? 0 : this.pageSize - this.pageNum * 20;
        for (let j = last; j < list.length - last; j++) {
          for (let i = 0; i < this.myemoji.emojiList.length; i++) {
            if (list[j].bqbId == this.myemoji.emojiList[i].bqbId) {
              list[j].download = 1;
            } else {
              if (!list[j].download) {
                list[j].download = 0
              }
            }
          }
        }
        this.list = list
      },
      dialogout() {
        let myemoji = {
          show: true,
          myemojilist: this.myemoji.myemojilist,
          emojiList: this.myemoji.emojiList,
          emojiPage: this.myemoji.emojiPage
        }
        this.$store.commit("SET_MYEMOJI", myemoji);
        let right = {
            show: false
          }
          this.$store.commit("SET_RIGHT", right);
          this.$store.dispatch("setLayout", ['', '', false])
      },
      checkFace(item) {
        if (this.emojiListIndex == 0 && this.emojiPageIndex == 1) {
          this.$parent.insertEmoji(item)
        } else {
          let obj = {
            bqbId: this.currentList[this.emojiListIndex].bqbId,
            chargeType: this.currentList[this.emojiListIndex].chargeType,
            bqUrl: item.bqMainUrl
          };
          this.$parent.insertEmoji(obj);
        }
      },
      switchList(id, idx) {
        this.emojiListIndex = idx
        if (id == 9999) {
          this.emojiDetailList = faceUrlMap
          this.showList = false
          this.showlistname.name  = this.$t('msg.emojishow.Classicemoji')
          return;
        }
        this.showLoading = true
        let showlistname = this.myemoji.myemojilist.filter(item => item.bqbId == id)
        this.showlistname.name = showlistname[0].bqbName
        this.showlistname.bqbId = showlistname[0].bqbId
        this.emojiDetailList = sessionUtil.getlocalSessionEmojiDetail(id)
        if (!this.emojiDetailList) {
          this.$http.emojiDatail({
            bqbId: id
          }).then(
            data => {
              this.emojiDetailList = data.listPackageDetails;
              this.showList = true
              this.showLoading = false
              sessionUtil.setLocalSessionEmojiDetail(id, this.emojiDetailList)
            },
            () => {}
          );
        } else {
          this.showList = true
          this.showLoading = false
        }
      },
      switchPage(add) {
        if (this.myemoji.emojiPage < 2) return

        if (add) {
          if (this.emojiPageIndex >= this.myemoji.emojiPage) {
            return;
          }
          this.emojiPageIndex++
        } else {
          if (this.emojiPageIndex < 2) {
            return;
          }
          this.emojiPageIndex--
        }

        this.showList = true;
        this.emojiListIndex = 0;
        this.switchList(this.currentList[0].bqbId, 0);
      },
        getemojiList() {
        this.myemoji.myemojilist = []
        this.myemoji.emojiList = [{
          bqbCoverUrl: "otc/static/images/emoji.png",
          bqbId: 9999,
        }, ]
        this.$http.emojiList({}).then(
          (data) => {
            data.forEach((v) => {
              v.bqbCoverUrl = v.bqbCoverUrl
              this.myemoji.emojiList.push(v)
              this.myemoji.myemojilist.push(v)
            })
            this.myemoji.emojiPage = Math.ceil(this.myemoji.emojiList.length / 7)
            let myemoji = {
              show: false,
              myemojilist: this.myemoji.myemojilist,
              emojiList: this.myemoji.emojiList,
              emojiPage: this.myemoji.emojiPage,
            }
            this.$store.commit("SET_MYEMOJI", myemoji)
          },
          () => {}
        )
      },
      gainemojiList() {
        this.$http.emojiList({}).then(
          data => {
            data.forEach(v => {
              v.bqbCoverUrl = v.bqbCoverUrl;
              this.emojiList.push(v)
              this.myemojilist.push(v)
            });
            this.myemoji.emojiList = this.emojiList
            this.myemoji.emojiPage = Math.ceil(this.emojiList.length / 7)
          },
          () => {}
        )
      }
    },
    mounted() {
      if (localStorage.lang == "en_US") {
        this.langIdx = 1;
      }
      if (localStorage.lang == "my") {
        this.langIdx = 2
      };
      // let cache=sessionUtil.getEmojiListSessionStorage();
      // if(!cache){
      this.gainemojiList()
      let myemoji = {
        show: false,
        myemojilist: this.myemojilist,
        emojiList: this.myemoji.emojiList,
        emojiPage: 0
      }
      this.$store.commit("SET_MYEMOJI", myemoji);
      this.showlistname.name  = this.$t('msg.emojishow.Classicemoji')
      this.emojiDetailList =faceUrlMap;
      //火狐拖拽打开新标签的
      document.body.ondrop = function (event) {
        event.preventDefault()
        event.stopPropagation()
      }
    },

  };

</script>

<style lang="scss" scoped>
  .emoji-icon {
    position: absolute;
    bottom: 14px;
    right: 72px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(../../assets/images/chat/icon-emoji.png) no-repeat center;
    user-select: none; 
    cursor: pointer;
  }
  .showRight{
    background: url(../../assets/images/chat/show-emoji.png) no-repeat center;
  }
  .emoji-wrap {
    position: absolute;
    bottom: 30px;
    right: -12px;
    z-index: 102;
    width: 492px;
    // padding-top: 10px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #e2e2e2;
    box-shadow: 0 0 8px #999;

    .top {
      justify-content: space-between;

      .showlistname {
        margin-left: 10px;
      }
    }

    .emoji-detail {
      position: relative;
      width: 100%;
      height: 242px;
      padding: 0 10px;

      &-item {
        float: left;
        width: 32px;
        margin: 5px 0;
        text-align: center;
        cursor: pointer;

        &.large {
          width: 82px;
        }
      }
    }

    .emoji-list {
      justify-content: space-between;
      height: 43px;
      background: #EEF1F6;

      &-item {
        display: block;
        width: 60px;
        cursor: pointer;

        &.active {
          height: 43px;
          background-color: #fff;
        }

        .preview {
          display: block;
          width: 35px;
          height: 35px;
          margin: 8px 16px;
        }
      }

      .switch-page {
        border-left: 1px solid #ddd;

        .arrow {
          display: block;
          width: 30px;
          height: 30px;

          &.left {
            // margin: 6px 12px 6px 11px;
            background: url(../../assets/images/icon/emoji-arrow-left.png) no-repeat center center;
            background-size:  24px 24px;

            &:hover {
              background: url(../../assets/images/icon/emoji-hove-left.png) no-repeat center center;
              background-size: 24px 24px;
            }

            &.disable {
              background: url(../../assets/images/icon/emoji-disable-left.png) no-repeat center center;
              background-size: 24px 24px;
            }
          }

          &.right {
            // margin: 6px 11px 6px 12px;
            background: url(../../assets/images/icon/emoji-arrow-right.png) no-repeat center center;
            background-size: 24px 24px;

            &:hover {
              background: url(../../assets/images/icon/emoji-hove-right.png) no-repeat center center;
              background-size:  24px 24px;
            }

            &.disable {
              background: url(../../assets/images/icon/emoji-disable-right.png) no-repeat center center;
              background-size: 24px 24px;
            }
          }
        }
      }
    }
  }

  .set-emoji {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../../assets/images/icon/set.png);
    &:hover{
      background: url(../../assets/images/icon/set-a.png);
    }
  }

  .wrapper {
    .dialog {
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

      .el-dialog {
        .color-box {
          transition: transform 0.1s;
        }

        .color-box.dragging {
          transform: scale(1.1);
        }
        .el-dialog__body {
          padding: 0;
        }
      }
    }
  }

  .control {
    margin-left: 20px;
    margin-right: 23px;
  }

  .color-box {
    transition: transform .5s;
  }

  .color-box.dragging {
    transform: scale(1.1);
  }

  .hot-emoji {
    height: 84px;

    .control {
      margin-left: 20px;
      margin-right: 23px;
    }

    .img {
      margin-right: 20px;
    }

    .name {
      font-size: 12px;
      font-weight: 600;
    }

  }

</style>
