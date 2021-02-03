<template>
  <transition name="drop-left">
    <div class="menu-drop user-info" @click.stop="" ondragstart="return false">
      <div class="center-header">
        <div class="display-flex">
          <div class="user-avatar">
            <img class="img" :src="global.fileDownUrl + 'compress/'+userInfo.headImg" v-headViewer v-headError ondragstart="return false"/>
          </div>
          <div class="user-detail display-flex-item" style="cursor: pointer;" @click="clickMenu()">
            <p class="user-name">
              {{ userInfo.nickName || userInfo.userName }}
            </p>
            <p class="userId">ID: {{ userInfo.userId }}</p>
          </div>
          <img src="../../assets/images/to.png" @click="clickMenu()" style="margin-right:10px;cursor: pointer">
        </div>
      </div>
      <div class="share-banner">
          <p class="top" :title="$t('msg.user.inviteFriend')">
            {{ $t("msg.user.inviteFriend") }}
          </p>
          <p class="bottom" :title="$t('msg.user.discoverWorld')">
            {{ $t("msg.user.discoverWorld") }}
          </p>
          <label class="btn" :title="$t('msg.user.inviteNow')"  @click="inviteFriend">{{
            $t("msg.user.inviteNow")
          }}</label>
        </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "user-info",
  data() {
    return {
      files:null
    };
  },
  computed: {
    ...mapGetters(["userInfo", "layout"])
  },
  methods: {
    inviteFriend() {
      this.$store.dispatch("setLayout", ["uc", "if", true]);
    },
    clickMenu() {
      this.$store.dispatch("setLayout", ["uc", "ui", true])
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.user-info {
    width: 340px;
    height: 198px;
    top: 64px;
    left: 25px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    border-radius: 0px 8px 8px 8px;
  .center-header {
    height: 110px;
    border-radius: 0px 8px 0px 0px;
    border-bottom: 1px solid $border-color;
    background-color: #fff;
    .user-avatar {
      width: 80px;
      height: 80px;
      margin:  10px 20px 10px 10px;
      cursor: pointer;
    }
    .user-name {
      font-size: 18px;
      margin-bottom: 3px;
      overflow: hidden;
      white-space: nowrap;
      color: $name-color;
      text-overflow: ellipsis;
      font-weight: 900;
    }
    .userId{
      color: $title-color;
    }
    .menu-icon {
      margin: 0 3px;
      cursor: pointer;
    }
  }
  .share-banner {
      position: relative;
      width: 340px;
      height: 88px;
      line-height: 18px;
      color: $color-theme;
      background: url(../../assets/images/invite-bg.png);
      background-size: 100% 100%;
      
      .top {
        // display: inline-block;
        padding: 28px 0 10px 12px;
        width: 138px;
        font-size: 16px;
        overflow: hidden;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .bottom {
        padding-left: 12px;
        display: inline-block;
        width: 138px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn {
        position: absolute;
        top: 28px;
        color: #FFFFFF;
        right: 8px;
        width: 80px;
        height: 32px;
        background: $color-theme;
        border-radius: 16px;
        line-height: 32px;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        &:hover{
          background: #FFFFFF;
          color: $color-theme;
          border: 1px solid $color-theme;
        }
      }
    }
}
</style>
