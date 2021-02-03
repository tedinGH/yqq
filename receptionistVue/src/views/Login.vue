<template>
  <div class="div">
    <div class="login" @keyup.enter="next()">
      <div class="title">{{ $t("msg.login.title") }}</div>
      <div class="form">
        <form autocomplete="off">
          <input
            type="text"
            v-model="send.enterpriseId"
            autocomplete="off"
            :placeholder="$t('msg.login.id')"
            onkeyup="value=value.replace(/[^\d]/g,'')"
          />
          <input
            type="text"
            v-model="send.phoneNum"
            autocomplete="new-password"
            :placeholder="$t('msg.login.phoneNum')"
          />
          <input
            type="password"
            v-model="send.loginCode"
            autocomplete="new-password"
            show-password
            :placeholder="$t('msg.login.loginCode')"
          />
        </form>
      </div>
      <div class="remember">
        <span
          v-if="remember == '0'"
          class="no-remember"
          @click="remember = 1"
        ></span>
        <span
          v-if="remember == '1'"
          class="ok-remember"
          @click="remember = 0"
        ></span>
        <span class="text">{{ $t("msg.login.remember") }}</span>
      </div>
      <div class="next" @click="next()">{{ $t("msg.login.login") }}</div>
      <div class="bottom">
        <span class="left" @click="goregister">{{
          $t("msg.login.register")
        }}</span>
        <span class="right" @click="goforget">{{
          $t("msg.login.forget")
        }}</span>
      </div>
      <!-- <div class="checkforget" v-if="checkforget">
      <div class="close"><img src="../assets/img/close.png" @click="checkforget=false"></div>
        <div class="official">
          <img src="../assets/img/dot-active.png" v-if="isfond">
          <img src="../assets/img/dot.png" v-else @click="cutIsfond">
          <div style="margin-left:18px">{{$t("msg.login.official")}}</div>
        </div>
        <div class="service">
          <img src="../assets/img/dot-active.png" v-if="!isfond" >
          <img src="../assets/img/dot.png" v-else @click="cutIsfond">
          <div style="margin-left:18px">{{$t("msg.login.service")}}</div>
        </div>
        <div class="nextto" @click="nextto()">
          {{$t("msg.login.next")}}
        </div>
    </div>
    <div class="service-fond" v-if="service">
      <div class="close"><img src="../assets/img/close.png" @click="service=false"></div>
      <div class="text">{{$t("msg.login.relation")}}</div>
      <div class="confirm" @click="service=false">{{$t("msg.common.confirm")}}</div>
    </div> -->
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { Crypto } from "@/tools/crypto";
export default {
  name: "login",
  data() {
    return {
      send: {
        checkCode: "1",
        countryCode: "",
        enterpriseId: "",
        loginCode: "",
        loginType: "0",
        phoneNum: ""
      },
      remember: "0"
      // checkforget:false,
      // isfond:true,
      // service:false
    };
  },
  methods: {
    next() {
      if (this.send.enterpriseId == "") {
        this.$message({
          message: this.$t("msg.login.importid"),
          type: "error"
        });
        return;
      } else if (this.send.phoneNum == "") {
        this.$message.error(this.$t("msg.login.importnum"));
        return;
      } else if (this.send.loginCode == "") {
        this.$message.error(this.$t("msg.login.importcode"));
        return;
      } else {
        let postData = {
          countryCode: ""
        };
        postData.checkCode = this.send.checkCode;
        postData.loginType = this.send.loginType;
        postData.enterpriseId = this.send.enterpriseId;
        postData.phoneNum = this.send.phoneNum;
        postData.loginCode = Crypto.encryptByMd5(this.send.loginCode);
        this.$api.login(postData).then(res => {
          if (res.code == 0 && res.data.userName) {
            if (this.remember == "1") {
              let params = {
                enterpriseId: this.send.enterpriseId,
                phoneNum: this.send.phoneNum,
                remember: this.remember,
                loginCode: this.send.loginCode
              };
              window.localStorage.setItem(
                Crypto.encrypt("userinfo"),
                Crypto.encrypt(params)
              );
            } else {
              let params = {
                enterpriseId: this.send.enterpriseId,
                phoneNum: this.send.phoneNum,
                loginCode: "",
                remember: this.remember
              };
              window.localStorage.setItem(
                Crypto.encrypt("userinfo"),
                Crypto.encrypt(params)
              );
            }
            this.$router.push({
              name: "session"
            });
            if (res.data.pactStatus == "-1") {
              this.$store.dispatch("setLayout", ["home", "agreement", true]);
            }
            this.$api.getbaseinfo().then(res => {
              this.$store.commit("SET_USERINFO", res.data);
              window.sessionStorage.setItem(
                "userinfo",
                Crypto.encrypt(res.data)
              );
            });
            this.$store.commit("SET_ONLINE", true);
            window.sessionStorage.setItem("status", 0);
          } else {
            this.$message.error(res.data);
          }
        });
      }
    },
    // nextto(){
    //   if(this.isfond){
    //     let lang = localStorage.getItem('locale') || 'en_US'
    //     window.location = window.location.origin+"/site/#/forget/"+lang
    //   }else{
    //     this.checkforget=false
    //     this.service=true
    //   }
    // },
    goregister() {
      let lang = localStorage.getItem("locale") || "en_US";
      window.location = window.location.origin + "/site/#/register/" + lang;
    },
    goforget() {
      let lang = localStorage.getItem("locale") || "en_US";
      window.location = window.location.origin + "/site/#/forget/" + lang;
    }
  },
  mounted() {
    let user = JSON.parse(
      Crypto.decrypt(window.localStorage.getItem(Crypto.encrypt("userinfo")))
    );
    if (user) {
      this.send.enterpriseId = user.enterpriseId;
      this.send.phoneNum = user.phoneNum;
      this.send.loginCode = user.loginCode;
      this.remember = user.remember;
      this.$store.commit("SET_ADMIT_LIMIT", user.upperLimit);
    }
    let lang = this.$route.params.lang;
    localStorage.setItem("locale", lang);
    this.$i18n.locale = localStorage.getItem("locale");
    this.$store.commit("SET_LANG", lang);
  }
};
</script>

<style lang="scss" scoped>
.div {
  width: 100%;
  height: 100%;
  background: url(../assets/images/back.png) no-repeat top center #fff;
  background-size: 100% 100%;

  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 605px;
    height: 740px;
    background: rgba(255, 255, 255, 1);
    border-radius: 19px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 110px;
      margin-bottom: 60px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        width: 405px;
        height: 51px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        margin-bottom: 30px;
        padding-left: 20px;
      }

      input {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
    }

    .remember {
      width: 405px;
      display: flex;
      .no-remember {
        display: block;
        width: 17px;
        height: 17px;
        background: url(../assets/img/no.png);
        cursor: pointer;
      }

      .ok-remember {
        display: block;
        width: 17px;
        height: 17px;
        background: url(../assets/img/ok.png);
        cursor: pointer;
      }
      .text {
        color: #949ca4;
        margin-left: 11px;
      }
    }

    .next {
      cursor: pointer;
      width: 405px;
      height: 51px;
      font-size: 14px;
      background: $color-theme;
      border-radius: 10px;
      margin-top: 55px;
      color: #fff;
      line-height: 51px;
      text-align: center;
    }
    .bottom {
      width: 605px;
      margin-top: 130px;
      display: flex;
      justify-content: space-between;
      .left {
        margin-left: 36px;
        color: $color-theme;
        cursor: pointer;
      }
      .right {
        margin-right: 36px;
        color: $color-theme;
        cursor: pointer;
      }
    }
  }
  .checkforget {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // height:264px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    .close {
      position: absolute;
      top: 12px;
      right: 18px;
    }
    img {
      cursor: pointer;
      display: block;
    }
    .official {
      width: auto;
      margin-top: 73px;
      margin-left: 60px;
      display: flex;
      width: 400px;
      img {
        height: 18px;
        width: 18px;
      }
    }
    .service {
      margin-top: 46px;
      display: flex;
      margin-left: 60px;
      width: 400px;
      img {
        height: 18px;
        width: 18px;
      }
    }
    .nextto {
      cursor: pointer;
      width: 78px;
      text-align: center;
      margin: auto;
      margin-top: 62px;
      height: 34px;
      line-height: 34px;
      border-radius: 5px;
      background: $color-theme;
      color: #fff;
      margin-bottom: 20px;
    }
  }
  .service-fond {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 347px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    .close {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 18px;
    }
    .text {
      margin-top: 59px;
      width: auto;
      text-align: center;
    }
    .confirm {
      width: 78px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: rgba(128, 153, 227, 1);
      border-radius: 5px;
      margin: auto;
      color: #fff;
      margin-top: 34px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>
