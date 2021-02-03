<template>
  <div class="settings">
    <div class="info1">
      <span>Username：{{ userInfo.username }}</span>
    </div>
    <div class="info2">
      <span
        >Nickname：
        <input
          class="input-text"
          type="text"
          v-model="user.nickName"
          maxlength="30"
      /></span>
    </div>
    <div class="info3">
      <span>Name：{{ userInfo.name }}</span>
    </div>
    <div class="info4">
      <span
        >Phone：
        <div class="info4-tel">
          <span
            v-text="'+' + user.countryCode"
            class="country"
            @click.stop="showSelect = !showSelect"
          ></span>
          <el-divider direction="vertical"></el-divider>
          <input type="number" v-model="user.phone" class="tel" />
          <div class="select-box" v-show="showSelect">
            <CountryCode
              ref="countrycode"
              @countrycodeHandler="countrycodeHandler"
            ></CountryCode>
          </div>
        </div>
      </span>
    </div>
    <div class="info5">
      <span
        >Email：<input class="input-text" type="text" v-model="user.email"
      /></span>
    </div>
    <div class="info6">
      <span
        >Gender：<el-radio-group v-model="user.sex">
          <el-radio :label="0">Male</el-radio>
          <el-radio style="margin-left: 60px" :label="1">
            Female
          </el-radio>
        </el-radio-group>
      </span>
    </div>
    <div class="save" @click="save">
      Save
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Util } from "@/tools/utils";
import { Crypto } from "@/tools/crypto";
import CountryCode from "@/components/common/CountryCode.vue";
import { validate } from "@/tools/validate";
export default {
  name: "settings",
  data() {
    return {
      user: null,
      showSelect: false
    };
  },
  components: {
    CountryCode
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    setTimeout(() => {
      let { ...obj } = this.userInfo
      this.user = obj
    }, 5);
  },
  methods: {
    countrycodeHandler(data) {
      this.showSelect = !this.showSelect;
      this.user.countryCode = data.PHONE_CODE;
    },
    save() {
      if (this.user.nickName == "") {
        this.$message({
          message: "Please enter your nickName",
          type: "error"
        });
        return;
      }
      if (this.user.phone == "") {
        this.$message({
          message: "Please enter your phone number",
          type: "error"
        });
        return;
      }
      if (this.user.email == "") {
        this.$message({
          message: "Please enter your email",
          type: "error"
        });
        return;
      }
      if (!validate.isEmail(this.user.email)) {
        this.$message({
          message: "Email is entered incorrectly",
          type: "error"
        });
        return;
      }
      if (this.user.countryCode == 86) {
        if (!validate.isChinessPhone(this.user.phone)) {
          this.$message({
            message: "mobile phone number is entered incorrectly",
            type: "error"
          });
          return;
        }
      } else {
        if (!validate.isPhone(this.user.phone)) {
          this.$message({
            message: "mobile phone number is entered incorrectly",
            type: "error"
          });
          return;
        }
      }
      let obj = {
        nickName: this.user.nickName,
        email: this.user.email,
        phone: this.user.phone,
        countryCode: this.user.countryCode,
        sex: this.user.sex
      };
      this.$api.setbaseinfo(obj).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "Change successfully",
            type: "success"
          });
          this.$api.getbaseinfo().then(res => {
            this.$store.commit("SET_USERINFO", res.data);
            window.sessionStorage.setItem("userinfo", Crypto.encrypt(res.data));
          });
        } else if (res.code == 343) {
          this.$message({
            message: res.data,
            type: "error"
          });
          return;
        } else if (res.code == 345) {
          this.$message({
            message: res.data,
            type: "error"
          });
          return;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  padding: 58px 74px;
  font-size: 16px;
  position: relative;
  input {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  .info1,
  .info2,
  .info3,
  .info4,
  .info5,
  .info5 {
    margin-bottom: 43px;
    .country {
      display: inline-block;
      line-height: 34px;
      text-align: center;
      width: 66px;
      height: 34px;
      border-right: 0px #fff;
      border-radius: 5px;
      cursor: pointer;
    }
    .input-text {
      width: 450px;
      height: 34px;
      background: #ffffff;
      border: 1px solid #dce0e7;
      border-radius: 5px;
      padding: 0 10px;
    }
    .info4-tel {
      display: inline-block;
      width: 450px;
      height: 34px;
      background: #ffffff;
      border: 1px solid #dce0e7;
      border-radius: 5px;
      /deep/.el-divider--vertical {
        height: 19px;
        background: #dce0e7;
        margin: 0 18px 0 0;
      }
      .tel {
        width: 345px;
      }
    }
    .select-box {
      position: absolute;
    }
  }
  .save {
    position: absolute;
    bottom: 42px;
    left: 50%;
    width: 78px;
    height: 34px;
    background: $color-theme;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    transform: translate(-50%, 0);
  }
}
</style>
