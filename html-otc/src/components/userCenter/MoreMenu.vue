<template>
  <transition name="drop">
    <div class="menu-drop menu-box" @click.stop="">
      <ul class="menu-list">
        <!-- <li class="menu-item display-flex" @click="shareCard">
          <span class="menu-icon card"></span>
          <span class="flex-item-nowrap" :title="$t('msg.user.sendCard')">{{
            $t("msg.user.sendCard")
          }}</span>
        </li> -->
        <li
          class="menu-item display-flex"
          @click="clickMenu(1)"
        >
          <span class="menu-icon add"></span>
          <span class="flex-item-nowrap" :title="$t('msg.menu.addFriend')">{{
            $t("msg.menu.addFriend")
          }}</span>
        </li>
        <li
          class="menu-item display-flex"
          @click="clickMenu(2)"
        >
          <span class="menu-icon group"></span>
          <span class="flex-item-nowrap" :title="$t('msg.user.groupChat')">{{
            $t("msg.user.groupChat")
          }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "more-menu",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    clickMenu(i) {
      if (i == 1) {
        this.$store.dispatch("setLayout", ["uc", "af", true]);
        let friendcard =[]
        this.$store.commit("SET_FRIENDCARD", friendcard)
      } else if (i == 2) {
        this.$store.dispatch("setLayout", ["uc", "ng", false]);
      }
    },
    shareCard(){
      let forwardInfo = {
        show: true,
        body: [
          {
            msgType: 32,
            bodyContent: {
              alias:this.userInfo.alias,
              avatar: this.userInfo.avatar,
              nickName: this.userInfo.nickName,
              remark: null,
              userId: this.userInfo.userId
            }
          }
        ]
      };
      this.$store.commit("SET_FORWARD_INFO", forwardInfo);
      this.$store.dispatch("setLayout", ["", "", false]);
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.menu-box {
  min-width: 140px;
  max-width: 220px;
  top: 66px;
  left: 418px;
  border-radius: 10px;
  background-color: $active-backgroup;
  transform:translateX(-50%);
  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: -12px;
  //   left: 50%;
  //   width: 0;
  //   height: 0;
  //   margin-left: -11px;
  //   border-left: 11px solid transparent;
  //   border-right: 11px solid transparent;
  //   border-bottom: 12px solid #fff;
  // }
  .menu-list {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    .menu-item {
      padding: 10px 0 9px 0;
      border-bottom: 1px solid $border-color;
      font-size: 14px;
      line-height: 30px;
      padding-right:15px;
      background-color: #fff;
      
      color: $color-grey;
    }
  }
  .menu-icon {
    width: 30px;
    height: 30px;
    margin: 0 8px;
    &.add {
      background: url(../../assets/images/index/add-f.png);
    }
    &.group {
      background: url(../../assets/images/index/add-g.png);
    }
  }
}
</style>
