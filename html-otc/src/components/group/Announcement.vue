<template>
  <transition name="scale-x">
    <div class="my-popup announcement" @click.stop="">
      <!-- 修改群公告 -->
      <div class="my-popup-content">
        <h3 class="my-popup-title">
          <p>{{ title }}</p>
          <span @click="deleteGroupAffiche()" v-if="isAdmin"></span>
          <!-- <i v-if="afficheTop"></i> -->
        </h3>
        <span class="my-popup-close" @click="close"></span>
        <div class="announce">
          <textarea class="textarea" cols="30" row="10" auto-height="true" :placeholder="placeholder" maxlength="150"
            v-if="isAdmin" v-model="affiche"></textarea>
          <div class="textarea" v-if="!isAdmin" v-html="affiche || $t('msg.groupInfo.noneAffiche')"
            @click="interceptor($event,affiche)" v-scrollBar></div>
        </div>
        <div class="footer" v-show="isAdmin">
          <span>{{affiche.length}}/150</span>   
          <label :class="{select:afficheTop}" for="afficheTop">
            <i></i>
            <input type="checkbox" v-model="afficheTop" id="afficheTop" hidden="hidden" name="">
            {{ $t("msg.group.top") }}
          </label>
          <button class="search-btn" :class="{active:affiche.length>0}" @click="comfirm">
            {{ $t("msg.chatSetting.post") }}
          </button>
        </div>
        <div class="footer disable" v-show="!isAdmin">
          {{ $t("msg.chatSetting.onlyAdmin") }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Msg from "@/tools/msg"
  import { mapGetters } from "vuex"
  import { MessageHandler } from "@/tools/messageHandler"
  export default {
    name: "announcement",
    data() {
      return {
        affiche: "",
        afficheTop: false,
        title: this.$t("msg.chatSetting.editAffiche"),
        placeholder: this.$t("msg.chatSetting.enterAffiche"),
      };
    },
    props: {
      value: {
        type: Number
      },
      announcement: {
        type: String
      },
      afficheType: {
        type: String | Number
      },
      isAdmin: {
        type: String | Boolean
      }
    },
    computed: {
      ...mapGetters(["userId", "currentSession"])
    },
    methods: {
      interceptor(ev, item) {
        let tagName = ev.target.tagName;
        if (tagName != "A") {
          this.copy(item.bodyContent)
          return;
        }
        let url = ev.target.innerHTML
        if (
          !(
            url.indexOf("ftp") >= 0 ||
            url.indexOf("http") >= 0 ||
            url.indexOf("https") >= 0
          )
        ) {
          url = "https://" + url;
        }

        var a = document.createElement("a")
        var event = new MouseEvent("click")
        a.href = url
        a.target = "_blank"
        a.dispatchEvent(event)
      },
      close() {
        if (!this.isAdmin) {
          this.$emit('input', 0);
          return
        }
        if (this.affiche != this.announcement) {
          this.$message({
            title: this.$t("msg.chatSetting.discard"),
            message: this.$t("msg.chatSetting.discardChange"),
            showClose: false,
            confirmButtonText: this.$t("msg.common.confirm"),
            cancelButtonText: this.$t("msg.common.cancel")
          }).then(
            data => {
              this.$emit('input', 0);
            },
            data => {}
          );
        } else this.$emit('input', 0)
      },
      deleteGroupAffiche() {
        if( this.announcement.length <= 0) return
        this.$message({
          title: '',
          message: this.$t("msg.chatSetting.confirmDeleteAffiche"),
          showClose: false,
          confirmButtonText: this.$t("msg.common.confirm"),
          cancelButtonText: this.$t("msg.common.cancel")
        }).then(
          data => {
            //确认删除
            let postData = {
              groupId: this.currentSession.paramId,
            }
            this.$http.deleteGroupAffiche(postData).then(
              data => {
                this.$store.commit("SET_TOAST_TEXT", data)
                this.affiche = ''
                this.$parent.$refs.groupInformation.affiche = ''
                if(this.$parent.$refs.chatheader.$refs.forbidden.affiche){
                  this.$parent.$refs.chatheader.$refs.forbidden.affiche=''
                }
                this.$emit("update")
                this.$emit('input', 0)
              },
              data => {}
            );
          },
          data => {}
        )
      },
      comfirm() {
        if (!(this.affiche.length > 0) && !this.announcement) return false
        let postData = { 
          groupId: this.currentSession.paramId,
          type: this.afficheTop == true ? 1 : 0,
          affiche: this.affiche
        }
        postData.affiche = Msg.replayLabel(postData.affiche)
        this.$http.setGroupAffiche(postData).then(
          data => {
            this.$store.commit(
              "SET_TOAST_TEXT",
              this.$t("msg.groupInfo.releaseSuccess")
            )
            this.$emit("update")
            this.sendGroupAffiche(postData.affiche, postData.type, data)
            if(this.$parent.$refs.chatheader.$refs.forbidden.affiche||this.$parent.$refs.chatheader.$refs.forbidden.affiche==''){
              this.$parent.$refs.chatheader.$refs.forbidden.affiche = this.affiche
            }
          },
          data => {}
        )
      },
      sendGroupAffiche(text, type, id) {
        if (!text) return false
        let time = new Date().getTime()
        let msg = {
          "affiche": text,
          "id": id,
          "isCloseTopNotice": false,
          "type": type
        }
        let obj = {
          msg: JSON.stringify(msg),
          msgType: 47,
          chatType: this.currentSession.fromType,
          toId: this.currentSession.paramId,
          time: time,
          userId: this.userId
        }
        let info = {
          bodyContent: msg,
          msgType: 47,
          chatType: this.currentSession.fromType,
          toId: this.currentSession.paramId,
          time: time,
          userId: this.userId
        }
        this.$store.dispatch("sendMsg", obj)
        if(this.afficheTop){
          this.$store.commit("SET_AFFICHE", {
            groupId: this.currentSession.paramId,
            body: info
          });
        }
        msg.affiche = MessageHandler.textToHtml(text)
        this.$parent.updataChatHistory(msg, 47, time)
        this.$emit('input', 0)
      },
    },
    mounted() {
      this.affiche = this.announcement
      this.afficheTop = this.afficheType == 1 ? true : false
      if (!this.affiche) this.afficheTop = false
      if (!this.isAdmin) {
        this.affiche = MessageHandler.textToHtml(this.affiche)
        this.title = this.$t("msg.groupInfo.affiche")
        this.placeholder = this.$t("msg.groupInfo.noneAffiche")
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";

  .announcement {
    .my-popup-content {
      height: auto;
      min-height: 280px;
      max-height: 420px;
      width: 360px;
      border-radius: 11px;

      .my-popup-title {
        height: 45px;
        line-height: 45px;
        color: #838287;
        p{
          display: inline-block;
        }
        span{
          display: inline-block;
          position: absolute;
          top: 6px;
          height: 33px;
          width: 33px;
          cursor: pointer;
          background-size: 100% 100%;
          background-image: url(../../assets/images/icon/deletes.png);

        }
      }

      .announce {
        position: relative;
        height: auto;
        max-height: 310px;
        padding:0 20px;
        overflow: auto;

        .afficheMsg {
          position: relative;
          text-align: left;
          height: auto;
          min-height: 130px;
          max-height: 270px;
          border: none;
          font-size: 14px;
          border-radius: 5px;
          line-height: 25px;
          outline: none;
          resize: none;
          white-space: pre-line;
          word-wrap: break-word;

          &:disabled {
            background: none;
          }
        }

        .textarea {
          position: relative;
          text-align: left;
          width: 320px;
          height: auto;
          min-height: 200px;
          border: none;
          font-size: 14px;
          border-radius: 5px;
          line-height: 25px;
          outline: none;
          resize: none;
          padding: 20px 10px 0;
          word-wrap: break-word;
          border-top: 1px solid #E1E6EC;
          &:disabled {
            background: none;
          }
        }

      }

      .footer {
        position: relative;
        height: auto;
        overflow: auto;
        padding: 30px 0 20px 0;

        .search-btn {
          display: inline-block;
          float: right;
          margin-right: 20px;
          font-size: 14px;
          background: rgba($color: #45B4AA, $alpha: 0.6);
          &.active {
            background: $color-theme;
          }
        }

        span {
          z-index: 1;
          display: inline-block;
          position: absolute;
          right: 20px;
          top: -0px;
          margin-left: 20px;
          color: #999;
          font-size: 14px;
        }

        

        label {
          display: inline-block;
          position: absolute;
          left: 22px;
          top: 35px;
          height: 21px;
          line-height: 21px;
          cursor: pointer;

          i {
            display: inline-block;
            height: 20px;
            width: 20px;
            vertical-align: middle;
            background-size: 100% 100%;
            background-image: url(../../assets/images/icon/select.png);
          }

          &.select {
            i {
              background-image: url(../../assets/images/icon/select-blue.png);
            }
          }
        }

        &.disable {
          text-align: center;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }

</style>
