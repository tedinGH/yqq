<template>
  <transition name="scale-x">
    <Popup  radius="10" :hideClose="false">
      <div class="notice" slot="body">
        <div class="notice-left">
          <ul class="setting-menu">
            <li class="setting-item" @click="type = 1" :class="{ active: type == 1 }">
              <span class="text" :title="$t('msg.menu.notice')">{{
                $t("msg.menu.notice")
              }}</span>
            </li>
            <li class="setting-item" @click="type = 2" :class="{ active: type == 2 }">
              <span class="text" :title="$t('msg.menu.general')">{{
                $t("msg.menu.general")
              }}</span>
            </li>
            <li class="setting-item" @click="type = 3" :class="{ active: type == 3 }">
              <span class="text" :title="$t('msg.menu.appearance')">{{
                $t("msg.menu.appearance")
              }}</span>
            </li>
            <!-- <li class="setting-item" @click="type = 5" :class="{ active: type == 5 }">
              <span class="text" :title="$t('msg.menu.about')">{{
                $t("msg.menu.about")
              }}</span>
            </li> -->
          </ul>
        </div>
        <div class="notice-right">
          <ul class="notice-menu" v-show="type == 1">
            <li class="notice-item" @click="newMsgNoticeClick()">
              <i class="icon notice" :class="{ close: notice.newMsgNotice == '1' }"></i>{{ $t("msg.menu.message") }}
              <echat-switch v-model="notice.newMsgNotice"></echat-switch>
            </li>
            <!-- <li class="notice-item" @click="soundClick()">
              <i class="icon vioce" :class="{ close: notice.sound == '1' }"></i>{{ $t("msg.menu.sound") }}
              <echat-switch v-model="notice.sound"></echat-switch>
            </li> -->
            <li class="notice-item" @click="showDetailMsgClick()">
              <i class="icon inform"
                :class="{ close: notice.bar_msg_notice_flag == '1' }"></i>{{ $t("msg.menu.desktop") }}
              <echat-switch v-model="notice.bar_msg_notice_flag"></echat-switch>
            </li>
          </ul>
          <div v-show="type == 2" class="notice-language">
            <div class="select-title">{{ $t("msg.menu.lang") }}</div>
            <echat-select v-model="locale" height="35" width="478" :list="localeList" @change="setLocale">
            </echat-select>
            <div class="privacy">{{ $t("msg.menu.privacy") }}</div>
            <div class="radio-box">
              <span style="color:#8D95A2">{{ $t("msg.menu.allow") }}</span>
              <span @click="checkout" class="radio" :class="{ on: !isallowmobile }" style="margin-left: 26px"></span>
            </div>
            <div class="entertype">{{ $t("msg.menu.Messages") }}</div>
            <div class="radio-box" v-for="(item, index) in radios" :key="item.id">
              <input v-model="radio" :value="item.value" class="input-radio" :checked="item.isChecked"
                type="radio" />{{ label[item.label] }}
                <span @click="check(index)" class="radio" :class="{ on: item.isChecked }"></span>
            </div>
          </div>
          <div class="version-appearance" v-show="type == 3">
            <div class="chatbubbles">
              <div class="chatbubbles-top">
                <span>{{ $t("msg.menu.chatbubbles") }}</span>
                <img @click="changeBubbles" src="../../assets/images/Sort.png" style="cursor: pointer" />
              </div>
              <div class="bubbles-box">
                <div class="left bubbles" :style="{
                    background: myself ? adversebackground : adversebackground,
                  }">
                  <div>
                    Hello
                    <span :style="{ color: myself ? '#607280' : '#607280' }">10:01</span>
                  </div>
                </div>
                <div class="right bubbles" :style="{ background: myself ? mybackground : mybackground }">
                  <div>
                    Hello
                    <span :style="{ color: myself ? '#607280' : '#607280' }">10:01</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bubbles-color">
              <span>{{ $t("msg.menu.colour") }}</span>
              <div class="display-flex">
                <li class="color-box" v-for="(item, index) in colors" :key="index">
                  <p class="icon" :style="{background:item.color}" @click="alter(item.color)"></p>
                  <img src="../../assets/images/optfor.png" v-if="item.optfor">
                </li>
                <div class="picker-box">
                  <span class="picker" @click="colorselect = true"></span>
                  <img src="../../assets/images/optfor.png" v-if="picker"  @click="colorselect = true" style="cursor: pointer">
                  <Popup :title="$t('msg.menu.choosecolor')" v-if="colorselect" :hide-close="true">
                    <div @click.stop="" slot="body">
                      <div style="padding: 20px">
                        <sketch-picker v-model="selfcolor" @input="updateValue" style="box-shadow: 0"></sketch-picker>
                      </div>
                      <div class="picker-but display-flex">
                        <div class="two-btn cannel" @click="selectdel">
                          {{ $t("msg.common.cancel") }}
                        </div>
                        <div class="two-btn delete" @click="handleChangeColor(selfcolor)">
                          {{ $t("msg.common.confirm") }}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </div>
              </div>
            </div>
            <div class="chatbcakground">
              <span>{{ $t("msg.menu.chatbcakground") }}</span>
              <div class="display-flex">
                <img v-if="back != ''" class="chat-img" :src="back" />
                <div v-else class="chat-img box"></div>
                <label class="text" for="uploadback">{{
                  $t("msg.menu.choosefile")
                }}</label>
                <input id="uploadback" type="file" hidden accept=".jpg,.png,.git,.jpeg,.gif,.ico,.bmp"
                  @change="selectFile($event)" />
                <Popup :title="$t('msg.menu.bcakgroundpreview')" :hide-close="true" v-if="preview">
                  <div @click.stop="" slot="body">
                    <div class="preview-img">
                      <img v-if="!dim" :src="global.fileDownUrl + 'original/' + urlinfo.url" />
                      <img v-else class="dim" :src="global.fileDownUrl + 'original/' + urlinfo.url" />
                      <div class="my">
                        Hello, nice to meet you
                        <span style="font-size: 12px; color: #607280; display: inline">10:01</span>
                      </div>
                      <div class="he">
                        Hi,nice to meet you, too
                        <span style="font-size: 12px; color: #607280; display: inline">10:01</span>
                      </div>
                      <div class="display-flex" style="position: absolute; bottom: 20px; left: 43%">
                        <span :class="dim ? 'isdim' : 'nodim'" @click.stop="ifdim"></span><span
                          style="margin-left: 10px; color: #607280">{{
                          $t("msg.menu.blurred")
                        }}</span>
                      </div>
                    </div>
                    <div class="preview-but display-flex">
                      <div class="two-btn cannel" @click="preview = false">
                        {{ $t("msg.common.cancel") }}
                      </div>
                      <div class="two-btn delete" @click="confirm">
                        {{ $t("msg.common.confirm") }}
                      </div>
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
            <div class="display-flex button">
              <div class="default" @click="isdefault = true">
                {{ $t("msg.menu.default") }}
              </div>
              <div class="complete" @click="complete">
                {{ $t("msg.common.complete") }}
              </div>
              <Popup :title="$t('msg.tip.tip')" v-if="isdefault" :hide-close="true">
                <div @click.stop="" slot="body">
                  <div class="default-box">
                    {{ $t("msg.menu.restoredefault") }}？
                  </div>
                  <div class="default-but display-flex">
                    <div class="two-btn cannel" @click="isdefault = false">
                      {{ $t("msg.common.cancel") }}
                    </div>
                    <div class="two-btn delete" @click="defaultAll">
                      {{ $t("msg.common.confirm") }}
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
          <!-- <div class="version-menu" v-show="type == 5">
            <img src="../../assets/images/index/head.png" />
            <p>{{ version }}</p>
          </div> -->
        </div>
      </div>
    </Popup>
  </transition>
</template>
<script>
import Vue from "vue";
import { Config } from "@/common/config";
import { localStore } from "@/tools/localStorage";
import { mapGetters } from "vuex";
import { Util } from "@/tools/utils";
import { Sketch } from "vue-color";
export default {
  data() {
    return {
      colorselect: false,
      isdefault: false, //恢复默认
      dim: false, //模糊
      preview: false,
      back: "",
      urlinfo: {
        url: "",
        isdim: 1,
      },
      submit: null, //确认提交的内容
      picker: false,
      mybackground: "",
      adversebackground: "",
      colors: [
        {
          color: "#ECF7F6",
          optfor: false,
        },
        {
          color: "#D1ECFF",
          optfor: false,
        },
        {
          color: "#D6DEDE",
          optfor: false,
        },
        {
          color: "#FFF9E8",
          optfor: false,
        },
        {
          color: "#E7E7E7",
          optfor: false,
        },
        {
          color: "#F4ECFE",
          optfor: false,
        },
        {
          color: "#F7E0D6",
          optfor: false,
        },
         {
          color: "#46B4AA",
          optfor: false,
        },
      ],
      selfcolor: "",
      myself: null,
      type: 1,
      locale: 0,
      isallowmobile: null,
      radio: null,
      radios: [
        {
          label: "Enter",
          value: "1",
          isChecked: null,
        },
        {
          label: "CtrlEnter",
          value: "2",
          isChecked: null,
        },
      ],
      label: {
        Enter: this.$t("msg.menu.Enter"),
        CtrlEnter: this.$t("msg.menu.CtrlEnter"),
      },
      version: Config.version,
      localeList: [
        {
          name: "简体中文（Chinese）",
          code: "zh_CN",
        },
        {
          name: "English（English）",
          code: "en_US",
        },
        // {
        //   name: "ြမန်မာဘာသာ（Burmese）",
        //   code: "my",
        // },
      ],
    };
  },
  components: {
    "sketch-picker": Sketch,
  },
  computed: {
    ...mapGetters(["bubbles", "userInfo", "backurl", "isAllowMobile"]),
    notice() {
      return (
        this.$store.state.notice || {
          newMsgNotice: 1,
          sound: 1,
          bar_msg_notice_flag: 1,
        }
      );
    },
  },
  methods: {
    //恢复默认
    defaultAll() {
      this.mybackground = "#ECF7F6"
      this.adversebackground = "#F7F8FD"
      this.myself = true
      this.picker = false
      this.colors.forEach((v) => {
        if (v.color == "#ECF7F6") {
          v.optfor = true
        } else {
          v.optfor = false
        }
      });
      this.selfcolor = "#ECF7F6"
      this.back = ""
      this.urlinfo = {
        url: "",
        isdim: 1
      };
      this.saveappearance()
      this.isdefault = false
    },
    //完成
    complete() {
      this.saveappearance()
      this.$store.dispatch("setLayout", ["", "", false])
    },
    //保存外观
    saveappearance() {
      this.submit = {
        mybackground: this.mybackground,
        adversebackground: this.adversebackground,
      };
      this.$store.commit("SET_BUBBLES", this.submit);
      window.localStorage.setItem(
        "aspect-mybackground" + this.userInfo.userId,
        this.bubbles.mybackground
      );
      window.localStorage.setItem(
        "aspect-adversebackground" + this.userInfo.userId,
        this.bubbles.adversebackground
      );
      this.$store.commit("SET_BACKURL", this.urlinfo)
      window.localStorage.setItem(
        "aspect-url" + this.userInfo.userId,
        this.urlinfo.url
      );
      window.localStorage.setItem(
        "aspect-isdim" + this.userInfo.userId,
        this.urlinfo.isdim
      );
    },
    //确认背景图
    confirm() {
      this.back = this.global.fileDownUrl + "compress/" + this.urlinfo.url
      this.preview = false;
    },
    //是否模糊
    ifdim() {
      this.dim = !this.dim;
      this.urlinfo.isdim = this.dim ? "2" : "1"
    },
    //上传背景
    selectFile(e) {
      let file = e.target.files[0]
      Util.getImgUrl(file, 2).then(
        (data) => {
          this.dim = false
          this.preview = true
          this.urlinfo = {
            url: data,
            isdim: "1",
          };
          document.getElementById("uploadback").value = ""
        },
        (data) => {
          this.$store.commit("SET_TOAST_TEXT", data)
        }
      );
    },
    //自选颜色
    updateValue(val) {
      this.selfcolor = val.hex
    },
    selectdel() {
      this.selfcolor = this.myself ? this.mybackground : this.adversebackground
      this.colorselect = false
    },
    handleChangeColor(val) {
      var colors = this.colors.map((v) => {
        return v.color
      });
      if (colors.indexOf(val) != -1) {
        this.picker = false;
        this.colors.forEach((v) => {
          v.optfor = false
        });
        this.colors[colors.indexOf(val)].optfor = true
      } else {
        this.colors.forEach((v) => {
          if (v.color != val) {
            v.optfor = false
            this.picker = true
          }
        });
      }
      (this.mybackground = this.myself ? val : this.mybackground),
        (this.adversebackground = this.myself ? this.adversebackground : val)
      this.colorselect = false
    },
    //选推荐颜色
    alter(obj) {
      this.colors.forEach((v) => {
        if (v.color == obj) {
          v.optfor = true
          this.picker = false
        } else {
          v.optfor = false
        }
      });
      (this.mybackground = this.myself ? obj : this.mybackground)
      (this.adversebackground = this.myself ? this.adversebackground : obj)
      this.selfcolor = this.myself ? this.mybackground : this.adversebackground
    },
    //交换气泡
    changeBubbles() {
      this.myself = !this.myself
      let my = this.mybackground
      let adverse = this.adversebackground
      this.adversebackground = my
      this.mybackground = adverse
    },
    checkout() {
      if (!this.isallowmobile) {
        let obj = {
          state:2,
          type:0
        }
        this.$http.updateallowmobile(
            obj
          )
          .then();
        this.isallowmobile = !this.isallowmobile
        this.$store.commit("SET_ISALLOWMOBILE", obj.state)
      } else {
        let obj = {
          state:0,
          type:0
        }
        this.$http
          .updateallowmobile(
            obj,
          )
          .then();
        this.isallowmobile = !this.isallowmobile
        this.$store.commit("SET_ISALLOWMOBILE", obj.state)
      }
    },
    check(index) {
      // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value
      // 设置值，以供传递
      this.radios[index].isChecked = true
      localStore.setStore("enterType", this.radio)
    },
    newMsgNoticeClick() {
      if (this.notice.newMsgNotice == "0") this.notice.newMsgNotice = "1"
      else this.notice.newMsgNotice = "0"
      this.setNotice();
    },
    soundClick() {
      if (this.notice.sound == "0") this.notice.sound = "1"
      else this.notice.sound = "0"
      this.setNotice();
    },
    showDetailMsgClick() {
      if (this.notice.bar_msg_notice_flag == "0")
        this.notice.bar_msg_notice_flag = "1"
      else this.notice.bar_msg_notice_flag = "0"
      this.setNotice()
    },
    setNotice() {
      var jsonObject = {
        newMsgNotice: this.notice.newMsgNotice,
        sound: this.notice.sound,
        bar_msg_notice_flag: this.notice.bar_msg_notice_flag,
      };
      this.$store.commit("SET_NOTICE_SETTING", jsonObject);
      this.$http.setUserSetting(JSON.stringify(jsonObject));
    },
    closeWindow() {
      this.$parent.$refs.chatList.item = null;
      this.$parent.$refs.chatHistory.chat = {
        fromType: 0,
        name: "0",
      }
    },
    setLocale(val) {
      if (this.locale == val) return;
      this.locale = val;
      this.$i18n.locale = this.localeList[val].code;
      this.$store.commit("SET_LANG", this.$t("msg"));
      localStorage.lang = this.localeList[val].code;
      this.$store.dispatch("setLayout", ["", "", false]);
      location.reload()
    },
  },
  mounted() {
    console.log(this.isAllowMobile);
    if (this.isAllowMobile == 0) {
      this.isallowmobile = false
    } else {
      this.isallowmobile = true
    }
    if (localStorage.lang == "en_US"||!localStorage.lang) {
      this.locale = 1
    } else if (localStorage.lang== "my") {
      this.locale = 2
    } else {
      this.locale = 0
    }
    if (
      !window.localStorage.getItem("aspect-mybackground" + this.userInfo.userId)
    ) {
      window.localStorage.setItem(
        "aspect-mybackground" + this.userInfo.userId,
        "#ECF7F6"
      );
      window.localStorage.setItem(
        "aspect-adversebackground" + this.userInfo.userId,
        "#F7F8FD"
      );
    }
    let bubbles = {
      mybackground: window.localStorage.getItem(
        "aspect-mybackground" + this.userInfo.userId
      ),
      adversebackground: window.localStorage.getItem(
        "aspect-adversebackground" + this.userInfo.userId
      ),
    };
    this.$store.commit("SET_BUBBLES", bubbles);
    (this.mybackground = this.bubbles.mybackground),
      (this.adversebackground = this.bubbles.adversebackground);

    if (this.mybackground != "#F7F8FD") {
      this.myself = true
      this.selfcolor = this.mybackground;
      this.colors.forEach((v) => {
        if (v.color == this.mybackground) {
          v.optfor = true;
        }
      });
      let colors = this.colors.map((v) => {
        return v.color;
      });
      if (colors.indexOf(this.mybackground) == -1) {
        this.picker = true
      }
    } else {
      this.myself = false
      this.selfcolor = this.adversebackground;
      this.colors.forEach((v) => {
        if (v.color == this.adversebackground) {
          v.optfor = true;
        }
      });
      let colors = this.colors.map((v) => {
        return v.color
      })
      if (colors.indexOf(this.adversebackground) == -1) {
        this.picker = true
      }
    }
    if (
      window.localStorage.getItem("aspect-url" + this.userInfo.userId) == "" ||
      !window.localStorage.getItem("aspect-url" + this.userInfo.userId)
    ) {
      this.back = ""
    } else {
      this.back =
        this.global.fileDownUrl +
        "compress/" +
        window.localStorage.getItem("aspect-url" + this.userInfo.userId);
      this.urlinfo = {
        url: window.localStorage.getItem("aspect-url" + this.userInfo.userId),
        isdim: window.localStorage.getItem(
          "aspect-isdim" + this.userInfo.userId
        ),
      }
    }
    this.radio = Number(localStore.getStore("enterType"))
      ? Number(localStore.getStore("enterType"))
      : "1";
    this.radios.forEach((i) => {
      if (i.value == this.radio) {
        i.isChecked = true
      } else {
        i.isChecked = false
      }
    })
  },
}
</script>
<style lang="scss">
@import "../../assets/css/var";

.notice {
  width: 731px;
  height: 493px;
  // border-top: 1px solid $border-color;
  background: rgba(255, 255, 255, 1);
  border-radius: 0 0 10px 10px;
  overflow: hidden;

  .notice-left {
    float: left;
    width: 198px;
    height: 484px;
    border-right: 1px solid $border-color;

    .setting-menu {
      margin-top: 10px;

      .setting-item {
        height: 60px;
        width: 120px;
        margin: 0 auto;
        line-height: 60px;
        text-align: center;
        color: $color-grey;
        cursor: pointer;

        &.active {
          color: $color-theme;
          box-sizing: border-box;
          border-bottom: 2px solid $color-theme;
        }

        .text {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .notice-right {
    float: left;
    width: 528px;
    height: 484px;

    .version-menu {
      height: 100%;
      width: 100%;
      text-align: center;
      position: relative;

      img {
        height: 100px;
        width: 100px;
        position: absolute;
        left: 50%;
        top: 38%;
        transform: translate(-50%, -50%);
      }

      p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .notice-menu {
      height: 148px;
      width: 488px;
      margin: 20px 0 0 40px;

      .notice-item {
        position: relative;
        height: 59px;
        line-height: 59px;
        padding: 0 80px 0 0;
        font-size: 16px;
        text-align: left;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color:$color-grey;
        .icon {
          margin-right: 15px;
        }

        .notice {
          display: inline-block;
          position: relative;
          top: 7px;
          height: 28px;
          width: 28px;
          margin-right: 15px;
          background-image: url(../../assets/images/chat/icon-notice-close.png);
          background-size: 100% 100%;
        }

        // .notice.close {
        //   background-image: url(../../assets/images/chat/icon-notice.png);
        //   height: 28px;
        //   width: 22px;
        // }

        .vioce {
          display: inline-block;
          position: relative;
          top: 7px;
          height: 27px;
          width: 27px;
          margin-right: 10px;
          background-image: url(../../assets/images/chat/icon-vioce-close.png);
          background-size: 100% 100%;
        }

        .vioce.close {
          background-image: url(../../assets/images/chat/icon-vioce.png);
          width: 28px;
        }

        .inform {
          display: inline-block;
          position: relative;
          top: 9px;
          height: 28px;
          width: 28px;
          margin-right: 12px;
          background-image: url(../../assets/images/chat/icon-inform-close.png);
          background-size: 100% 100%;
        }

        // .inform.close {
        //   background-image: url(../../assets/images/chat/icon-inform.png);
        //   top: 7px;
        //   height: 23px;
        //   width: 25px;
        // }
      }
    }

    .version-appearance {
      width: 528px;
      height: 484px;

      .chatbubbles {
        margin-top: 12px;
        margin-left: 18px;

        .chatbubbles-top {
          width: 228px;
          height: 24px;
          display: flex;
          justify-content: space-between;
        }

        span {
          color: $color-grey;
        }

        .bubbles-box {
          width: 228px;
          height: 119px;
          border: 1px solid #e2e2e2;
          border-radius: 10px;
          margin-top: 10px;
        }

        .bubbles {
          height: 44px;
          text-align: center;
          line-height: 44px;
          border: 1px solid #e2e2e2;

          span {
            font-size: 12px;
          }
        }

        .left {
          width: 98px;
          border-radius: 10px 10px 10px 0px;
          margin-left: 10px;
          margin-top: 10px;
        }

        .right {
          width: 112px;
          margin-top: 10px;
          margin-left: 108px;
          border-radius: 10px 10px 0px 10px;
        }
      }

      .bubbles-color {
        margin-top: 10px;
        margin-left: 18px;

        span {
          color: $color-grey;
          display: block;
          margin-bottom: 10px;
        }

        .color-box {
          margin-right: 14px;
          position: relative;
          cursor: pointer;
          .icon{
            width: 40px;
            height: 40px;
            border-radius:50%
          }
          img{
            position: absolute;
            top: 0;
          }
        }

        .picker-box {
          top: 6px;
          position: relative;
          .picker {
            top: 6px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            background: url(../../assets/images/Colorpalette.png);
          }
          img{
            position: absolute;
            left: 0;
            top: 0;
          }
          .vc-sketch {
            box-shadow: 0 0 0 0;
          }

          .picker-but {
            width: 100%;
            height: 42px;
            justify-content: flex-end;

            .cannel {
              color: #3592d8;
              margin-right: 34px;
              cursor: pointer;
            }

            .delete {
              color: #3592d8;
              margin-right: 14px;
              cursor: pointer;
            }
          }
        }
      }

      .chatbcakground {
        margin-top: 10px;
        margin-left: 18px;

        span {
          color: $color-grey;
          display: block;
          margin-bottom: 10px;
        }

        .chat-img {
          margin-top: 2px;
          width: 96px;
          height: 96px;
          border-radius: 10px;

          &.box {
            border: 1px solid $color-grey;
          }
        }

        .text {
          margin-left: 20px;
          margin-bottom: 35px;
          color: $color-theme;
          cursor: pointer;
        }

        .preview-img {
          width: 629px;
          height: 475px;
          position: relative;

          img {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .my {
            width: 220px;
            height: 44px;
            position: absolute;
            z-index: 10;
            top: 35px;
            right: 10px;
            text-align: center;
            line-height: 44px;
            background: rgba(139, 205, 255, 1);
            border-radius: 10px 10px 0px 10px;
          }

          .he {
            width: 225px;
            height: 44px;
            position: absolute;
            z-index: 10;
            top: 92px;
            left: 10px;
            text-align: center;
            line-height: 44px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(226, 226, 226, 1);
            border-radius: 10px 10px 10px 0px;
          }

          .dim {
            -webkit-filter: blur(4px);
            -moz-filter: blur(4px);
            -o-filter: blur(4px);
            -ms-filter: blur(4px);
            filter: blur(4px);
            opacity: 0.6;
          }

          .nodim {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/images/dim.png);
          }

          .isdim {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/images/dim-ok.png);
          }
        }

        .preview-but {
          width: 100%;
          height: 52px;
          justify-content: flex-end;

          .cannel {
            color: $color-theme;
            margin-right: 34px;
            cursor: pointer;
          }

          .delete {
            color: $color-theme;
            margin-right: 14px;
            cursor: pointer;
          }
        }
      }

      .button {
        position: absolute;
        bottom: 8px;
        justify-content: space-between;
        width: 528px;

        .default {
          width: 145px;
          padding: 5px 10px;
          border: 1px solid $color-theme;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          margin-left: 18px;
          color: $color-theme;
        }

        .complete {
          width: 78px;
          height: 34px;
          background: $color-theme;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          line-height: 34px;
          cursor: pointer;
          margin-right: 14px;
        }

        .default-box {
          width: 346px;
          height: 110px;
          line-height: 80px;
          padding-left: 14px;
        }

        .default-but {
          width: 100%;
          margin-bottom: 10px;
          justify-content: flex-end;

          .cannel {
            color: $color-theme;
            margin-right: 34px;
            border-radius: 5px;
            text-align: center;
            line-height: 34px ;
            border: 1px solid  $color-theme;
            height: 34px;
            width: 78px;
            cursor: pointer;
          }

          .delete {
            color:#fff;
            border-radius: 5px;
            background: $color-theme;
            margin-right: 14px;
            text-align: center;
            line-height: 34px ;
            cursor: pointer;
            height: 34px;
            width: 78px;
          }
        }
      }
    }

    .notice-language {
      height: 148px;
      padding: 35px 0 35px 0;
      font-size: 15px;
      text-align: left;

      .select-title {
        float: left;
        height: 35px;
        line-height: 35px;
        width: 85px;
        margin-right: 8px;
        text-align: center;
        vertical-align: middle;
        color:$color-grey
      }

      .select-box {
        display: inline-block;
        height: 35px;
        line-height: 35px;
        border: none;;
        position: absolute;
        right:20px
      }
      .privacy {
        margin: 53px 0 14px 26px;
        color: $color-grey;
      }

      .entertype {
        margin: 30px 0 0 26px;
        color: $color-grey;
      }

      .radio-box {
        position: relative;
        height: 25px;
        line-height: 25px;
        margin: 14px 0 0 27px;
        color: #8D95A2;
      }

      .radio {
          display: inline-block;
          position: absolute;
          right:24px;
          width: 46px;
          height: 23px;
          border: 1px solid #d9d9d9;
          border-radius: 12px;
          background: #8E96A2;
          cursor: pointer;
          &.on{
            border-color: $color-theme;
            background-color: $color-theme;
            &::before{
              -webkit-transform: translate(100%, 0);
              transform: translate(100%, 0);border: 0;
            }
          }
          &::before{
            content: '';
            display: inline-block;
            width: 23px;
            height: 23px;
            border-radius: 12px;
            background-color: #fff;
            border: 1px solid #d9d9d9;
            box-sizing: border-box;
          }
      }

      .input-radio {
        display: inline-block;
        position: absolute;
        opacity: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;
        left: 0px;
        outline: none;
        margin-top: 5px;
        -webkit-appearance: none;
      }

      // .on {
      //   background-image: url(../../assets/images/icon/select-blue.png);
      // }
    }
  }

  .echat-switch {
    position: absolute;
    top: 20px;
    right: 25px;
  }
}
</style>