<template>
  <div class="setting" @click.stop="">
    <img src="../../assets/images/xx.png" class="close" @click="close" />
    <div class="left">
      <div class="title">Personal settings</div>
      <div class="set" :class="{ active: type == 1 }" @click="type = 1">
        General settings
      </div>
      <div class="set" :class="{ active: type == 2 }" @click="type = 2">
        Reminder settings
      </div>
    </div>
    <div class="right">
      <div v-if="type == 1">
        <p class="neme">Online status</p>
        <div class="cut">
          <p>Automatic state switching</p>
          <img src="../../assets/images/open.png" v-if="status" @click="status = !status" />
          <img src="../../assets/images/close.png" v-else @click="status = !status" />
        </div>
        <div class="time" v-if="status">
          <p>Automatic state switching</p>
          <input v-model="time" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="9" /><span>s</span>
        </div>
        <div class="save item-btn" @click="save">Save</div>
      </div>
      <div v-if="type == 2">
        <div v-for="(item, index) in reminderList" :key="index">
          <p class="sectionTitle">{{ item.title }}</p>
          <div class="cut2" v-for="(itemChild, indexChild) in item.list" :key="indexChild">
            <p>{{ itemChild.name }}</p>
            <img src="../../assets/images/open.png" v-if="itemChild.status" @click="itemChild.status = !itemChild.status" />
            <img src="../../assets/images/close.png" v-else @click="itemChild.status = !itemChild.status" />
          </div>
        </div>
        <div class="save item-btn" @click="saveReminderSetting">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Crypto } from "@/tools/crypto";
export default {
  name: "setting",
  computed: {
    ...mapGetters(["userInfo", "reminderSettings"])
  },
  data() {
    return {
      type: 1,
      status: null,
      time: null,
      // todo:
      // settingList: [
      //   {
      //     name: "Personal settings",
      //     value: 1
      //   },
      //   {
      //     name: "Reminder settings",
      //     value: 2
      //   }
      // ],

      // todo 声音文件对象待抽象
      reminderList: [
        {
          title: "New dialogue entry",
          type: "sessionState",
          list: {
            desktopNotice: {
              status: null,
              name: "Desktop notification"
            },
            voiceNotice: {
              status: null,
              name: "Sound notification",
              voice: "../voice/access.mp3"
            }
          }
        },
        {
          title: "Guest news",
          type: "visitorMsgState",
          list: {
            desktopNotice: {
              status: null,
              name: "Desktop notification"
            },
            voiceNotice: {
              status: null,
              name: "Sound notification",
              voice: "../voice/news.mp3"
            }
          }
        },
        {
          title: "Colleague news",
          type: "parterMsgState",
          list: {
            desktopNotice: {
              status: null,
              name: "Desktop notification"
            },
            voiceNotice: {
              status: null,
              name: "Sound notification",
              voice: "../voice/tongshi.mp3"
            }
          }
        }
      ]
    };
  },
  created() {
    this.status = this.userInfo.swithAutoChangeStatus == 1 ? true : false;
    let { ...obj } = this.userInfo;
    this.time = obj.autoChangeStatusTime;
    let {
      sessionDesktopNotifyState,
      sessionVoiceNotifyState,
      visitorMsgDesktopNotifyState,
      visitorMsgVoiceNotifyState,
      parterMsgDesktopNotify,
      parterMsgVoiceNotify
    } = this.reminderSettings;
    this.reminderList.map((item, index) => {
      switch (item.type) {
        case "sessionState":
          item.list.desktopNotice.status = sessionDesktopNotifyState ? true : false;
          item.list.voiceNotice.status = sessionVoiceNotifyState ? true : false;
          break;
        case "visitorMsgState":
          item.list.desktopNotice.status = visitorMsgDesktopNotifyState ? true : false;
          item.list.voiceNotice.status = visitorMsgVoiceNotifyState ? true : false;
          break;
        case "parterMsgState":
          item.list.desktopNotice.status = parterMsgDesktopNotify ? true : false;
          item.list.voiceNotice.status = parterMsgVoiceNotify ? true : false;
          break;
        default:
          break;
      }
    });
  },
  methods: {
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    saveReminderSetting() {
      let payload = {
        userId: this.userInfo.id
      };
      this.reminderList.map((item, index) => {
        switch (item.type) {
          case "sessionState":
            payload.sessionDesktopNotifyState = item.list.desktopNotice.status ? 1 : 0;
            payload.sessionVoiceNotifyState = item.list.voiceNotice.status ? 1 : 0;
            break;
          case "visitorMsgState":
            payload.visitorMsgDesktopNotifyState = item.list.desktopNotice.status ? 1 : 0;
            payload.visitorMsgVoiceNotifyState = item.list.voiceNotice.status ? 1 : 0;
            break;
          case "parterMsgState":
            payload.parterMsgDesktopNotify = item.list.desktopNotice.status ? 1 : 0;
            payload.parterMsgVoiceNotify = item.list.voiceNotice.status ? 1 : 0;
            break;
          default:
            break;
        }
      });

      this.$api.setReminderSetting(payload).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "Save successfully",
            type: "success"
          });
          this.$store.commit("SET_REMINDERSETTING", {
            ...this.reminderSettings,
            ...payload
          });
        }
      });
    },
    save() {
      let info = this.userInfo;
      if (!this.status) {
        this.$api.setbaseinfo({ swithAutoChangeStatus: -1 }).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "Save successfully",
              type: "success"
            });
            info.swithAutoChangeStatus = -1;
            this.$store.commit("SET_USERINFO", info);
            window.sessionStorage.setItem("userinfo", Crypto.encrypt(info));
          }
        });
      } else {
        if (this.time < 0) {
          this.$message({
            message: "Value cannot be negative",
            type: "error"
          });
          return;
        }
        this.$api
          .setbaseinfo({
            swithAutoChangeStatus: 1,
            autoChangeStatusTime: this.time
          })
          .then(res => {
            if (res.code == 0) {
              this.$message({
                message: "Save successfully",
                type: "success"
              });
              info.swithAutoChangeStatus = 1;
              info.autoChangeStatusTime = this.time;
              console.log(info);
              this.$store.commit("SET_USERINFO", info);
              window.sessionStorage.setItem("userinfo", Crypto.encrypt(info));
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.setting {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 868px;
  height: 630px;
  background: rgba(255, 255, 255, 0.99);
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  z-index: 999;
  display: flex;
  .close {
    position: absolute;
    right: 18px;
    top: 22px;
    z-index: 999;
    cursor: pointer;
  }
  .left {
    width: 205px;
    border-right: 1px solid $border-color;
    .title {
      height: 66px;
      line-height: 66px;
      font-size: 16px;
      padding-left: 26px;
    }
    .set {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      &.active {
        color: $color-theme;
        background: #e6f4ff;
        box-sizing: border-box;
        border-left: 4px solid $color-theme;
      }
    }
  }
  .right {
    flex: 1;
    position: relative;
    .neme {
      margin: 28px 0 45px 30px;
      font-size: 16px;
      color: #949ca4;
    }
    .sectionTitle {
      margin: 28px 0 12px 30px;
      font-size: 16px;
      color: #949ca4;
    }
    .cut {
      margin-left: 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 35px;
      img {
        margin-right: 32px;
        cursor: pointer;
      }
    }
    .cut2 {
      margin-left: 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      img {
        margin-right: 32px;
        cursor: pointer;
      }
    }
    .time {
      display: flex;
      margin-left: 30px;
      line-height: 32px;
      input {
        margin: 0 10px 0 12px;
        padding: 5px;
        border: 1px solid $border-color;
        border-radius: 5px;
        -moz-appearance: textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
    }
    .save {
      position: absolute;
      right: 35px;
      bottom: 35px;
      width: 78px;
      height: 34px;
    }
  }
}
</style>
