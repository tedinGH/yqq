<template>
  <transition name="drop-left">
    <div class="menu-drop user-center" @click.stop="" ondragstart="return false">
      <ul class="menu-list">
        <!-- <li class="menuitem display-flex">
          <span class="menu-icon uploadface"></span>
          <label class="flex-item-nowrap" for="uploadface" :title="$t('msg.user.uploadface')">{{
            $t("msg.user.uploadface")
          }}</label>
           <input
            id="uploadface"
            type="file"
            hidden
            accept=".zip"
            multiple="multiple"
            @change="selectFile($event)"
          />
        </li> -->
        <li
          class="menuitem display-flex"
          @click.stop="clean"
        >
          <span class="menu-icon clean"></span>
          <span class="flex-item-nowrap" :title="$t('msg.menu.clean')">{{
            $t("msg.menu.clean")
          }}</span>
        </li>
        <li
          class="menuitem display-flex"
          @click="clickMenu(3)"
        >
          <span class="menu-icon setting"></span>
          <span class="flex-item-nowrap" :title="$t('msg.menu.setting')">{{
            $t("msg.menu.setting")
          }}</span>
        </li>
        <li
          class="menuitem display-flex"
          @click.stop="logOut"
        >
          <span class="menu-icon logout"></span>
          <span class="flex-item-nowrap" :title="$t('msg.user.exit')">{{
            $t("msg.user.exit")
          }}</span>
        </li>
      </ul>
      <!-- 退出登录弹窗 -->
      <transition name="pop">
        <Popup :title="$t('msg.tip.tip')"
          @click.native="logOut" 
          :hideClose="true" 
          v-if="layout.module == 'uc' && layout.child == 'logout'"
        >
          <div class="logout" @click.stop="" slot="body">
            <div class="logout-detail">{{ $t("msg.user.confirmExit") }}</div>
            <button class="cannel" @click="logOut()">
              {{ $t("msg.common.cancel") }}
            </button>
            <button class="comfirm" @click="exit()">
              {{ $t("msg.common.confirm") }}
            </button>
          </div>
        </Popup>
        <Popup :title="$t('msg.tip.tip')"
          :hideClose="true" 
          v-if="isclean"
        >
          <div class="logout" @click.stop="" slot="body">
            <div class="logout-detail">{{ $t("msg.menu.isclean") }}</div>
            <button class="cannel" @click="goClean()">
              {{ $t("msg.menu.Cleanup") }}
            </button>
            <button class="comfirm" @click="cancel()">
              {{ $t("msg.common.cancel") }}
            </button>
          </div>
        </Popup>
      </transition>
      <div class="mask" v-if="layout.child == 'logout'"></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { Crypto } from "@/tools/crypto"
export default {
  name: "user-center",
  data() {
    return {
      files:null,
      isclean:false
    };
  },
  computed: {
    ...mapGetters(["userInfo", "layout"])
  },
  methods: {
    selectFile(e){
      this.files = e.target.files
      let formData = new FormData();
      formData.append("file",this.files[0]);
      let xml = new XMLHttpRequest();
      xml.open("post", base.codeUrl+"/emojiweb/emoji/addPersonsFileOfZip.htm", true);
      xml.setRequestHeader("token", this.$store.state.token);
      xml.send(formData);
      xml.onreadystatechange = () => {
        //回调函数
        if (xml.status == 200) {
          console.log(xml.responseText);
        //  alert("上传成功")
        }
        else{
        }
      };
    },
    logOut() {
      if (this.layout.child == "logout") {
        this.$store.dispatch("setLayout", ["uc", "uc", false]);
      } else {
        this.$store.dispatch("setLayout", ["uc", "logout", false]);
      }
    },
    cancel(){
      this.isclean = false
    },
    clean(){
      this.isclean = true
    },
    goClean(){
      let name =  "echatDB"
      let id = this.$store.state.userInfo.userId.toString()
      let indexedDBName = Crypto.encryptByDES(name, id + this.$store.state.cleanNum);
      window.indexedDB.deleteDatabase(indexedDBName)
      let aspect = Object.keys(window.localStorage);
      for (var i = 0; i < aspect.length; i++) {
        if (aspect[i] !="lang" && aspect[i].substring(0, 7) != "aspect-") {
          window.localStorage.removeItem(aspect[i]);
        }
      }
      location.reload()
    },
    exit() {
      /*let lang = localStorage.getItem("lang");
      if (lang) {
				window.location = window.location.origin + '/dist/' + lang + '/#/index';
			} else {
				window.location = window.location.origin + '/dist/en_US/#/index';
      }*/
      this.$http.logout({}).then(
        data => {
        this.$store.dispatch("setLoginFail", true)
        },() => {}
      )
    },
    inviteFriend() {
      this.$store.dispatch("setLayout", ["uc", "if", true]);
    },
    clickMenu(i) {
      switch (i) {
        case 1:
          this.$store.dispatch("setLayout", ["uc", "ui", true]);
          break;
        case 2:
          this.$parent.doShowFavorites();
          this.$store.dispatch("setLayout", ["", "", false]);
          break;
        case 3:
          this.$parent.showFavorites=false;
          this.$store.dispatch("setLayout", ["uc", "st", true]);
          break;
      }
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.user-center {
  width: 160px;
  bottom: 23px;
  left: 41px;
  background-color: $active-backgroup;

  
  .center-header {
    padding: 12px 0 10px 0;
    margin-bottom: 5px;
    border-bottom: 1px solid $border-color;
    background-color: #fff;
// &::after {
//     content: '';
//     position: absolute;
//     top: -12px;
//     left: 30px;
//     width: 0;
//     height: 0;
//     margin-left: -11px;
//     border-left: 11px solid transparent;
//     border-right: 11px solid transparent;
//     border-bottom: 12px solid #fff;
//   }
    .user-avatar {
      width: 52px;
      height: 52px;
      margin: 0 8px;
      border: 2px solid $color-theme;
      cursor: pointer;
    }
    .user-name {
      font-size: 18px;
      margin-bottom: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .menu-icon {
      margin: 0 3px;
      cursor: pointer;
    }
    .share-banner {
      position: relative;
      width: 208px;
      height: 50px;
      margin: 10px 0 0 3px;
      padding: 6px 8px;
      line-height: 18px;
      color: #fff;
      background: url(../../assets/images/invite-bg.png);
      background-size: 100% 100%;
      cursor: pointer;
      .top {
        display: inline-block;
        width: 138px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .bottom {
        display: inline-block;
        width: 138px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn {
        position: absolute;
        top: 13px;
        right: 0;
        width: 65px;
        height: 23px;
        line-height: 23px;
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .menu-list {
    // margin-bottom: 5px;
    width: 160px;
    background: #fff;
    .menuitem {
      border-top: 1px solid $border-color;
      font-size: 14px;
      height: 48px;
      line-height: 48px;
      color: $color-grey;
      background-color: #fff;
      
      cursor: pointer;
      &:hover{
        background:$active-backgroup
      }
    }
  }
  .menu-icon {
    width: 28px;
    height: 28px;
    margin: 0 7px 0 15px;
    &.setting {
      background: url(../../assets/images/index/2.png)
    }
    &.logout{
      background: url(../../assets/images/index/3.png)
    }
    &.clean{
      background: url(../../assets/images/index/clean.png)
    }
    // &.favorites {
    //   background-position: -180px 0;
    // }
    // &.uploadface{
    //   background-position: -30px 0;
    // }
  }
}

.logout {
  height: 160px;
  width: 420px;
  text-align: right;
  .logout-detail {
    padding: 30px 20px 80px;
    text-align: left;
    font-size: 16px;
    color: #999;
  }
  .comfirm {
    width: 78px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    margin-right: 20px;
    background: $color-theme;
  }
  .delete {
    width: 78px;
    height: 34px;
    line-height: 34px;
    color: #fff;
    background: $color-red;
  }
  .cannel {
    width: 78px;
    height: 34px;
    margin-right: 20px;
    line-height: 34px;
    color: $color-theme;
    background: #fff;
    border: 1px solid $color-theme;
  }
  .failBg {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .3);
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
</style>
