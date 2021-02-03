<template>
  <div class="forget" @click="showSelect=false">
    <div class="box" v-if="first">
      <!-- <div class="title">{{$t("msg.forget.title")}}</div>
      <div class="text">{{$t("msg.forget.text")}}</div> -->
      <div class="top">
        <div>Retrieve method</div>
        <div @click="backlogin">Back to login</div>
      </div>
      <div class="selects">
        <div @click="phone=true" class="phones" :class="{active:phone}">Phone number</div>
        <div @click="phone=false" class="admin" :class="{active:!phone}">Administrator</div>
      </div>
      <div v-if="phone" class="display-flex" style="flex-direction: column;">
        <input onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="Please enter enterprise ID" v-model="send.id" class="id">
        <div class="code-box">
          <span v-text="'+'+send.country" class="country" @click.stop="showSelect=!showSelect" @blur="countryto"></span>
          <span class="angle"  @click.stop="showSelect=!showSelect"></span>
          <input onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="Please enter the binding phone number" v-model="send.phone" class="phone">
        </div>
        <div class="select-box" v-show="showSelect">
          <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
        </div>
        <div class="code">
          <input class="code-input" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('msg.register.code')" v-model="send.code">
          <div class="text" v-if="!wait" @click="towait">{{$t('msg.register.gain')}}</div>
          <div v-else class="text2">({{time}})s</div>
        </div>
        <div class="next" @click="next">{{$t('msg.register.next')}}</div>
      </div>
      <div v-else class="display-flex" style="flex-direction: column;">
        <div class="content">
          You can actively contact the administrator to reset the password. If you are not clear about the enterprise administrator, you can directly contact customer service for consultation
        </div>
        <div class="next" @click="backlogin">I know</div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="title">{{$t("msg.forget.reset")}}</div>
      <div class="import">
        <input class="code-input" type="password" :placeholder="$t('msg.forget.new')" v-model="send.password"
          ref="import">
        <div style="margin-right:22px;cursor: pointer;">
          <img src="../assets/img/password (1).png" v-if="!importshow" @click="cutimport">
          <img src="../assets/img/password (2).png" v-else @click="cutimport">
        </div>
      </div>
      <div class="tip">{{$t('msg.forget.tip')}}</div>
      <div class="affirm">
        <input class="code-input" type="password" :placeholder="$t('msg.forget.affirm')" v-model="send.password2"
          ref="affirm">
        <div style="margin-right:22px;cursor: pointer;">
          <img src="../assets/img/password (1).png" v-if="!affirmshow" @click="cutaffirm">
          <img src="../assets/img/password (2).png" v-else @click="cutaffirm">
        </div>
      </div>
      <div class="complete" @click="complete">{{$t('msg.forget.complete')}}</div>
    </div>
    <CodeComponent ref="code" @codeConfirm="codeLoginHandler"></CodeComponent>
  </div>
</template>

<script>
  import {
    Util
  } from "@/tools/utils"
  import {
    validate
  } from '@/tools/validate';
  import CountryCode from '../components/common/CountryCode.vue'
  import CodeComponent from '../components/common/CodeComponent.vue'
  export default {
    name: "forget",
    data() {
      return {
        first: true,
        phone:true,
        // first: false,
        send: {
          id:'',
          country: '',
          phone: '',
          code: '',
          password: '',
          password2: ''
        },
        showSelect: false,
        wait: false,
        time: '',
        importshow: false,
        affirmshow: false
      }
    },
    components: {
      CountryCode,
      CodeComponent
    },
    methods: {
      countrycodeHandler(data) {
        this.showSelect = !this.showSelect;
        this.send.country = data.PHONE_CODE;
      },
      countryto(){
        if(this.send.country=='')   this.send.country="+"
      },
      towait() {           
        if(this.send.id==''){
            this.$message({
            message: this.$t('msg.forget.companyIdErr'),
            type: "error"
          });
          return
        }
        if (this.send.country == '') {
          this.$message({
            message: this.$t('msg.register.inputtext'),
            type: "error"
          });
          return
        } else if (this.send.country != '' && this.send.phone == '') {
          this.$message({
            message: this.$t('msg.register.phone'),
            type: "error"
          });
          return
        } else {
          if (this.send.country == '86') {
            if (!validate.isChinessPhone(this.send.phone)) {
              this.$message({
                message: this.$t('msg.register.phoneError'),
                type: "error"
              });
              return
            }
          } else {
            if (!validate.isPhone(this.send.phone)) {
              this.$message({
                message: this.$t('msg.register.phoneError'),
                type: "error"
              });
              return
            }
          }
          let obj = {
            countryCode: this.send.country,
            phone: this.send.phone,
            companyId:this.send.id
          }
          this.$api.getByCompanyAndPhone(obj).then(
            res=>{
              if(res.code == 0){
                this.$refs.code.showcode()
              }else{
                this.$message({
                  message: res.data,
                  type: "error"
                });
                return
                }
            }
          )
        }
      },
      codeLoginHandler() {
        let opt = {
          areaCode: this.send.country,
          mobileNo: this.send.phone,
          indx: '10001',
          verifyCode: this.$store.state.selectionCodeKey,
        }
        this.$api.getSmsCodeNo(opt).then(
          res => {
            if (res.code == 0) {
              let second = 60
              this.timer = setInterval(() => {
                second--
                if (second > 0) {
                  this.wait = true
                  this.time = second
                } else {
                  clearInterval(this.timer)
                  this.wait = false
                }
              }, 1000)
            } else {
              this.$message({
                message: res.data,
                type: "error"
              });
              return
            }
          }
        )
      },
      next() {
        if(this.send.id==''){
            this.$message({
            message: this.$t('msg.forget.companyIdErr'),
            type: "error"
          });
          return
        }
        if (this.send.country == '') {
          this.$message({
            message: this.$t('msg.register.inputtext'),
            type: "error"
          });
          return
        } else if (this.send.country != '' && this.send.phone == '') {
          this.$message({
            message: this.$t('msg.register.phone'),
            type: "error"
          });
          return
        } else if (this.send.country != '' && this.send.phone != '' && this.send.code == '') {
          this.$message({
            message: this.$t('msg.register.code'),
            type: "error"
          });
          return
        } else {
          if (this.send.country == '86') {
            if (!validate.isChinessPhone(this.send.phone)) {
              this.$message({
                message: this.$t('msg.register.phoneError'),
                type: "error"
              });
              return
            }
          } else {
            if (!validate.isPhone(this.send.phone)) {
              this.$message({
                message: this.$t('msg.register.phoneError'),
                type: "error"
              });
              return
            }
          }
          let obj = {
            companyId:this.send.id,
            countryCode: this.send.country,
            phone: this.send.phone,
            smsCode: this.send.code,
          }
          this.$api.checkfindpwdcode(obj).then(
            res => {
              if (res.code == 0) {
                this.first = false
              } else {
                this.$message({
                  message: res.data,
                  type: "error"
                });
                return
              };
            }
          )
        }

      },
      cutimport() {
        if (this.importshow) {
          this.$refs.import.type = "password"
          this.importshow = false
        } else {
          this.$refs.import.type = "text"
          this.importshow = true
        }
      },
      cutaffirm() {
        if (this.affirmshow) {
          this.$refs.affirm.type = "password"
          this.affirmshow = false
        } else {
          this.$refs.affirm.type = "text"
          this.affirmshow = true
        }
      },
      backlogin(){
        let lang = localStorage.getItem('locale') || 'en_US'
        window.location =  window.location.origin+"/dist/#/login/"+lang
      },
      complete() {
        if (this.send.password == '') {
          this.$message({
            message: this.$t('msg.forget.new'),
            type: "error"
          });
          return
        } else if (this.send.password2 == '') {
          this.$message({
            message: this.$t('msg.forget.affirm'),
            type: "error"
          });
        } else if (this.send.password2 != this.send.password) {
          this.$message({
            message: this.$t('msg.forget.different'),
            type: "error"
          });
          return
        } else {
          if (!validate.isPsw(this.send.password)) {
            this.$message({
              message: this.$t('msg.forget.fault'),
              type: "error"
            });
            return
          } else {
            let data = {
              companyId:this.send.id,
              countryCode: this.send.country,
              phone: this.send.phone,
              password: Util.encryptByMd5(this.send.password),
            }
            this.$api.updatepwd(data).then(
              res => {
                if(res.code==0){
                this.$message({
                  message: this.$t('msg.forget.success'),
                  type: "success"
                });
                setTimeout(() => {
                  let lang = localStorage.getItem('locale') || 'en_US'
                  window.location =  window.location.origin+"/dist/#/login/"+lang
                },3000)
                  
                }else{
                  this.$message({
                  message: res.data,
                  type: "error"
                });
                }
              }
            )
          }
        }

      }
    },
    created() {

    },
    mounted() {
      let lang = this.$route.params.lang;
      localStorage.setItem("locale", lang);
      this.$i18n.locale = localStorage.getItem("locale");
      this.$store.commit("SET_LANG", lang);
    }
  }
</script>
<style lang="scss" scoped>
  .forget {
    width: 100vw;
    height: 100vh;
    background: url(../assets/img/reg-back.png) no-repeat;
    background-size: 100% 100%;
    position: relative;

    .box {
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      width: 579px;
      padding: 25px 0 54px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

    .top{
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0 36px 0 27px;
      div:nth-child(1){
        color: #999999;
        font-size: 24px;
      }
      div:nth-child(2){
        color: #8099E3;
        cursor: pointer;
        font-size: 24px;
      }
    }
    .selects{
      display: flex;
      margin-top: 80px;
      justify-content:center;
      .phones{
        padding-right: 31px;
        height: 27px;
        line-height: 27px;
        border-right: 1px solid #999999;
        color: #010101;
        cursor: pointer;
        &.active{
          color: #8099E3;
        }
      }
      .admin{
        padding-left: 31px;
        height: 27px;
        line-height: 27px;
        color: #010101;
        cursor: pointer;
        &.active{
          color: #8099E3;
        }
      }
    }
      .text {
        // text-align: center;
        color: #949CA4;
        margin-top: 15px;
      }

      input {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      .code-box{
        width: 405px;
        height: 51px;
        margin-top: 30px;
        border-radius: 10px;
        border: 1px solid rgba(204, 204, 204, 1);
        display: flex;
        align-items: center;
        position: relative;
        .angle{
          position: absolute;
          display: inline-block;
          width: 9px;
          height: 5px;
          background: url(../assets/img/angle.png);
          z-index: 10;
          left: 70px;
          cursor: pointer;
        }
      }
      .country {
        width: 88px;
        height: 20px;
        border-right: 1px solid #DCE0E7;
        padding-left: 22px;
        color: #000;
        position: relative;
      }

      .select-box {
        position: absolute;
        top: 340px;
      }

      .phone {
        width: 405px;
        height: 49px;
        padding-left: 22px;
        border: none;
        border-radius: 10px;
        color: #000;
      }
      .id{
        width: 405px;
        height: 51px;
        margin-top: 37px;
        border-radius: 10px;
        color: #000;
        padding-left: 22px;
        border: 1px solid rgba(204, 204, 204, 1);
      }
      .code {
        width: 405px;
        height: 51px;
        margin-top: 30px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        color: #000;
        display: flex;

        .code-input {
          width: 302px;
          height: 49px;
          padding-left: 22px;
          border-radius: 10px;
          color: #000;
        }

        .text {
          right: 0;
          font-size: 14px;
          color: #8099E3;
          cursor: pointer;
          padding-right: 20px;
          text-align: right;
        }

        .text2 {
          text-align: right;
          line-height: 51px;
          color: #999;
          margin-left: 40px;
        }
      }

      .next {
        width: 405px;
        margin-top: 54px;
        height: 51px;
        background:#8099E3;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        line-height: 51px;
        cursor: pointer;
      }

      .import {
        width: 405px;
        height: 51px;
        margin-top: 60px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .code-input {
          width: 330px;
          height: 49px;
          padding-left: 22px;
          border-radius: 10px;
          color: #000;
        }
      }
      .tip{
        align-self:flex-start;
        margin-left: 106px;
        margin-top: 9px;
        color: #949CA4;
      }
      .affirm {
        width: 405px;
        height: 51px;
        margin-top: 26px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        color: #000;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .code-input {
          width: 330px;
          height: 29px;
          padding-left: 22px;
          border-radius: 10px;
          color: #000;
        }
      }

      .complete {
        width: 405px;
        margin-top: 60px;
        height: 51px;
        background: rgba(128, 153, 227, 1);
        border-radius: 10px;
        color: #fff;
        text-align: center;
        line-height: 51px;
        cursor: pointer;
      }
      .content{
        width: 471px;
        margin-top: 73px;
        color: #999999;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
</style>