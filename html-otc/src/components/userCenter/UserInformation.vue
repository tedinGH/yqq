<template>
  <transition name="scale-x">
    <Popup :hideHeader="true">
      <div class="user" slot="body" @click.stop="hideSelect()">
        <span class="close" @click="close"></span>
        <div class="left">
          <div class="head-img">
            <img v-if="userInfo.headImg" class="avatar" :src="global.fileDownUrl + 'compress/' + userInfo.headImg" v-headError />
            <img class="avatar" src="../../assets/images/error-head.png"  v-if="!userInfo.headImg"  >
            <!-- <span class="default" v-defaultHead v-if="!userInfo.headImg" v-html="userInfo.nickName"></span> -->
            <img class="upphoto2" src="../../assets/images/upphoto(2).png" /><img class="upphoto"
              src="../../assets/images/upphoto.png" @click="avatarType = 'user'" />
          </div>
          <div class="name-sex">
            <span class="name">{{ userInfo.nickName }}</span><span :class="gender == '0' ? 'female' : 'male'"></span>
          </div>
          <p class="nikename" v-if="userInfo.alias">@{{ userInfo.alias }}</p>
          <div class="share" @click="shareCard">
            {{ $t("msg.user.sendCard") }}
          </div>
        </div>
        <div class="right">
          <header class="top">
            <span class="personal">{{ $t("msg.user.personal") }}</span>
          </header>
          <ul class="user-info" v-scrollBar>
            <div class="info">
              <span>{{ $t("msg.user.NickName")}}</span>
              <div class="display-flex">
                <p class="showname">{{ userInfo.nickName }}</p>
                <img src="../../assets/images/edit.png" @click="showNickname = true" />
              </div>
            </div>
            <div class="info">
              <span>{{ $t("msg.user.userName")}}</span>
              <div class="display-flex">
                <p class="showname"><span v-if="userInfo.alias">@</span>{{ userInfo.alias || $t("msg.user.unBounded") }}</p>
                <img src="../../assets/images/edit.png" @click="showAlias" />
              </div>
            </div>
            <div class="info">
              <span>{{ $t("msg.user.phone")}}</span>
              <div class="display-flex">
                <p class="showname">{{ userInfo.mobile || $t("msg.user.unBounded") }}</p>
              </div>
            </div>
            <div class="info">
              <span>{{ $t("msg.user.email")}}</span>
              <div class="display-flex">
                <p class="showname">{{ userInfo.email || $t("msg.user.unBounded") }}</p>
              </div>
            </div>
            <div class="info">
            <span class="label">{{ $t("msg.user.gender") }}</span>
              <div class="display-flex">
                  <echat-select
                    ref="genderSelect"
                    v-model="gender"
                    width="393"
                    :list="sexList"
                    @hideOther="hideSelect"
                    @change="setgender"
                  ></echat-select>
              </div>
            </div>
            <div class="info" >
            <span class="label">{{ $t("msg.user.region") }}</span>
              <div >
                <region-select
                ref="countrySelect"
                v-model="countryCode"
                width="393"
                :list="countryList"
                @hideOther="hideSelect"
                @change="changeCountry"
              ></region-select>
              
              </div>
            </div>
            <div class="info">
            <span class="label"></span>
              <div >
              <region-select
                class="mt10"
                ref="stateSelect"
                v-model="stateCode"
                width="393"
                :list="areaList"
                @hideOther="hideSelect"
                @change="changeArea"
              ></region-select>
              </div>
            </div>
            <div class="info" >
            <span class="label">{{ $t("msg.user.signature") }}</span>
            </div>
            <div class="input-box">
            <textarea
              class="input"
              type="text"
              ref="signature"
              maxlength="30"
              @blur="setsignature()"
              v-model="signature"
              :placeholder="$t('msg.user.info')"
            />
            <span class="textLength">{{ textLength + "/30" }}</span>
          </div>
          </ul>
        </div>
        <EditPopup v-model="showNickname" :title="$t('msg.user.editNickName')" :placeholderText="$t('msg.user.info1')"
          @change="setNickname" v-if="showNickname"></EditPopup>
        <avatar-handler v-model="avatarType" @changeAvatar="changeAvatarHandler" v-if="avatarType"></avatar-handler>
      </div>
    </Popup>
  </transition>
</template>
<script>
import { Countries } from "@/common/Countries";
import { Areas } from "@/common/areas";
import AvatarHandler from "../AvatarHandler";
export default {
  name: "userInformation",
  data() {
    return {
      showUser: false,
      showNickname: false,
      gender: 1,
      sexList: [
        { name: this.$t("msg.user.female") },
        { name: this.$t("msg.user.male") },
      ],
      countryCode: "",
      stateCode: "",
      areas: Areas,
      countryList: Countries,
      areaList: [],
      signature: "",
      avatar: "",
      timeReady: true,
      avatarType: "",
    };
  },
  components: {
    AvatarHandler,
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    textLength() {
      if (this.signature) {
        return this.signature.length;
      } else {
        return 0;
      }
    },
  },
  methods: {
    shareCard() {
      let forwardInfo = {
        show: true,
        body: [
          {
            msgType: 32,
            bodyContent: {
              alias: this.userInfo.alias,
              avatar: this.userInfo.avatar,
              nickName: this.userInfo.nickName,
              remark: null,
              userId: this.userInfo.userId,
            },
          },
        ],
      };
      this.$store.commit("SET_FORWARD_INFO", forwardInfo);
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    close() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    hideSelect() {
      this.$refs.countrySelect.showBox = false;
      this.$refs.stateSelect.showBox = false;
      this.$refs.genderSelect.showBox = false;
    },
    show() {
      this.avatar = this.userInfo.headImg;
      this.nickName = this.userInfo.nickName;
      this.signature = this.userInfo.signature;
      this.gender = this.userInfo.gender || 0;
      this.countryCode = this.userInfo.countryCode || "";
      this.stateCode = this.userInfo.stateCode || "";
      this.initArea();
    },
    hide() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    showAlias() {
      this.$parent.$refs.alias.show();
    },
    changeAvatarHandler(data) {
      let info = this.userInfo;
      info.avatar = data.data;
      info.headImg = data.data;
      this.$store.commit("SET_USER_INFO", info);
      this.$store.commit("SET_TOAST_TEXT", this.$t("msg.user.success"));
    },
    setNickname(text) {
      this.$http.setNickname({ nickName: text }).then(
        (data) => {
          this.$store.commit("SET_TOAST_TEXT", data);
          let info = this.userInfo;
          info.nickName = text;
          this.$store.commit("SET_USER_INFO", info);
        },
        () => {}
      );
      this.showNickname = false;
    },
    setgender(value) {
      if (value == this.userInfo.gender) {
        return;
      }
      this.$http.setGender({ gender: value }).then(
        (data) => {
          this.gender = value;
          this.$store.commit("SET_TOAST_TEXT", data);
          let info = this.userInfo;
          info.gender = value;
          this.$store.commit("SET_USER_INFO", info);
        },
        () => {}
      );
    },
    changeCountry(item) {
      this.countryCode = item.name;
      let areaArr = [];
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].country_id == item.id) {
          areaArr.push(this.areas[i]);
        }
      }
      this.stateCode = areaArr[0].name;
      this.areaList = areaArr;
    },
    getCountryId() {
      return new Promise((resolve, reject) => {
        let country_id = 0;
        for (let i = 0; i < this.countryList.length; i++) {
          if (this.countryList[i].name == this.countryCode) {
            country_id = this.countryList[i].id;
          }
        }
        resolve(country_id);
      });
    },
    initArea() {
      this.getCountryId().then((id) => {
        let areaArr = [];
        for (let i = 0; i < this.areas.length; i++) {
          if (this.areas[i].country_id == id) {
            areaArr.push(this.areas[i]);
          }
        }
        this.areaList = areaArr;
      });
    },
    changeArea(item) {
      this.stateCode = item.name;
      let obj = {
        countryCode: this.countryCode,
        stateCode: this.stateCode,
      };
      let info = this.userInfo;
      info.stateCode= this.stateCode
      info.countryCode=this.countryCode,
      this.$http.setArea(obj).then(
        (data) => {
          this.$store.commit("SET_TOAST_TEXT", data);
          let info = this.userInfo;
          this.$store.commit("SET_USER_INFO", info);
        },
        () => {}
      );
    },
    setsignature() {
      if (!this.showSignature) {
        this.$http.setSignature({ signature: this.signature }).then(
          (data) => {
            this.$store.commit("SET_TOAST_TEXT", data);
            let info = this.userInfo;
            info.signature = this.signature;
            this.$store.commit("SET_USER_INFO", info);
          },
          () => {}
        );
      } else {
        this.$refs.signature.focus();
      }
      this.showSignature = !this.showSignature;
    },
  },
  mounted() {
    this.show();
  },
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "../../assets/css/var";

.user {
  width: 732px;
  border-radius: 2px;
  background-color: $active-backgroup;
  height: 492px;
  display: flex;
  .close {
    width: 12px;
    height: 12px;
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    background: url(../../assets/images/chat/icon-window-close.png) center
      center no-repeat;
    cursor: pointer;
    &:hover {
      background: url(../../assets/images/chat/icon-window-close-red.png) center
        center no-repeat;
    }
  }
  .left {
    width: 260px;
    height: 100%;
    padding-top: 82px;
    background: url(../../assets/images/index/user-back.png);
    display: flex;
    flex-direction: column;
    align-items: center;
    .head-img {
      width: 154px;
      height: 154px;
      background: url(../../assets/images/index/head-img.png);
      display: flex;
      justify-content: center;
      margin: 0 53px 0 53px;
      position: relative;
      .avatar {
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 43px;
        border-radius: 40px;
      }
      .default{
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 43px;
        border-radius: 40px;
        text-align: center;
        line-height: 80px;
        font-weight: 550;
        font-size: 28px;
        color: #fff;
        cursor:pointer;
      }
      .upphoto2 {
        position: absolute;
        bottom: 43px;
      }
      .upphoto {
        position: absolute;
        bottom: 46px;
        cursor: pointer;
      }
    }
    .name-sex {
      display: flex;
      .name {
        color: $name-color;
        font-size: 18px;
        display: inline-block;
        max-width: 120px;
      }
      .female {
        display: inline-block;
        margin-left: 8px;
        background: #fff url(../../assets/images/female.png);
        width: 24px;
        height: 24px;
      }
      .male {
        display: inline-block;
        margin-left: 8px;
        background: #fff url(../../assets/images/male.png);
        width: 24px;
        height: 24px;
      }
    }
    .nikename {
      color: #3150f0;
      margin-top: 20px;
    }
    .share {
      color: $color-theme;
      position: absolute;
      bottom: 30px;
      cursor: pointer;
    }
  }
  .right {
    width: 472px;
    height: 100%;
    background: #fff;
    .select-box{
      border: none;
      padding-right: 20px;
      color: #5F717F;
    }
    .top {
      width: 432px;
      height: 80px;
      border-bottom: 1px solid #e1e6ec;
      margin-left: 20px;
    }
    .personal {
      padding: 48px 18px 13px 18px;
      font-size: 18px;
      line-height: 18px;
      border-bottom: 2px solid $color-theme;
      color: $color-theme;
      display: inline-block;
    }
    .user-info {
      margin-top: 8px;
      padding: 0 20px;
      position: relative;
      height: 402px;
      .info {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          color: #8D95A2;
        }
        .showname{
          color:#5F717F;
          margin-right: 18px;
        }
        img{
          cursor: pointer;
        }
      }
    }
  }
}
.input-box{
  width: 432px;
  height: 40px;
  border-bottom: 1px solid $border-color;
  margin-bottom: 20px;
  .input{
    width: 382px;
    height: auto;
    // min-height: 18px;
    outline: none;
    resize: none;
    border: none;
  }
}
.textLength{
  color: #C0C0C0;
  font-size: 12px;
}
.edit-input {
  .my-popup-content {
    width: 415px;
    padding-bottom: 10px;
    background-color: #fff;
  }
}
</style>