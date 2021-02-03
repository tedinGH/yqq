<template>
  <div class="upload">
    <p class="title">Basic information</p>
    <div class="up-box">
      <div class="ptoto">
        <img :src="config.imgurl + 'original/' + userInfo.avatarUrl" class="img" v-if="userInfo.avatarUrl" />
        <img src="../../../assets/images/110.png" class="img" />
        <div class="shadow">
          <label class="text" for="uploadback"></label>
          <input id="uploadback" type="file" hidden accept=".jpg,.png,.gif,.jpeg," @change="selectFile($event)" />
        </div>
      </div>
      <p class="tip">Only JPG, PNG or GIF format images are supported, and the size doesn't exceed 10M</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Util } from "@/tools/utils";
import { Crypto } from "@/tools/crypto";
export default {
  name: "upload",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    selectFile(e) {
      let file = e.target.files[0];
      Util.getImgUrl(file).then(res => {
        let userInfo = this.userInfo;
        userInfo.avatarUrl = res;
        this.$store.commit("SET_USERINFO", userInfo);
        window.sessionStorage.setItem("userinfo", Crypto.encrypt(userInfo));
        let obj = {
          avatarUrl: res
        };
        this.$api.setbaseinfo(obj).then(res => {
          console.log(res);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    position: absolute;
    top: 22px;
    left: 22px;
    font-size: 18px;
  }

  .up-box {
    .ptoto {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      margin: auto;
      .img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
      }

      .shadow {
        width: 110px;
        height: 34px;
        opacity: 0.35;
        position: absolute;
        background: #000;
        bottom: 0;

        .text {
          width: 27px;
          height: 23px;
          position: absolute;
          z-index: 10;
          left: 40px;
          top: 4px;
          cursor: pointer;
          background: url(../../../assets/images/photo.png);
        }
      }
    }
    .tip {
      width: 240px;
      margin-top: 25px;
      text-align: center;
    }
  }
}
</style>
