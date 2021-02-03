<template>
  <div class="register">
    <div class="box" @click.stop="showSelect=false">
      <div><img src="../assets/img/kefu .png"></div>
      <div class="menu" v-if="first">
        <div class="title">{{$t("msg.register.register")}}</div>
        <input type="text" :placeholder="$t('msg.register.inputtext')" v-model="send.country" readonly="readonly" class="country"
          @click.stop="showSelect=!showSelect">
        <div class="select-box" v-show="showSelect">
          <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
        </div>
        <input onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('msg.register.phone')" v-model="send.phone" class="phone"  @mousewheel.prevent>
        <div class="code">
          <input class="code-input" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('msg.register.code')" v-model="send.code"  @mousewheel.prevent>
          <div class="text" v-if="!wait" @click="towait">{{$t('msg.register.gain')}}</div>
          <div v-else class="text2">({{time}})s</div>
        </div>
        <div class="after">{{$t('msg.register.after')}}</div>
        <div class="next" @click="next">{{$t('msg.register.next')}}</div>
      </div>
      <div class="menu" v-else>
        <div class="title title2">{{$t("msg.register.perfect")}}</div>
        <input type="text" :placeholder="$t('msg.register.name')" v-model="send.name" class="phone">
        <div class="code-2">
          <input class="code-input code2" type="text" :placeholder="$t('msg.register.industry')" v-model="send.showindustry"
            disabled="disabled">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="text arrow-down">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown" 
              style=
              "height:210px;width:405px;margin-right:14px;position: relative;overflow-y: scroll;
              scrollbar-width: none;
              -ms-overflow-style: none; 
              "
              >
              <el-dropdown-item v-for="(item,idx) in list" :key="idx"
                :command="item.id+'+'+item.industryBig+'/'+item.industryTwo+'/'+item.industryThree+'/'+item.industryFour">
                {{item.industryBig}}<span v-if="item.industryTwo!=''">/</span>{{item.industryTwo}}<span v-if="item.industryThree!=''">/</span>{{item.industryThree}}<span v-if="item.industryFour!=''">/</span>{{item.industryFour}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <input type="text" :placeholder="$t('msg.register.username')" v-model="send.username" class="phone">
        <input onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="$t('msg.register.relationphine')" v-model="send.relationphine" class="phone"  @mousewheel.prevent>
        <input type="text" :placeholder="$t('msg.register.email')" v-model="send.email" class="phone">
        <div class="next" @click="employ">{{$t('msg.register.employ')}}</div>
      </div>
    </div>
    <CodeComponent ref="code" @codeConfirm="codeLoginHandler"></CodeComponent>
  </div>
</template>

<script>
  import {
    validate
  } from '@/tools/validate';
  import {
    mapGetters
  } from "vuex";
  import CountryCode from '../components/common/CountryCode.vue'
  import CodeComponent from '../components/common/CodeComponent.vue'
  export default {
    name: "register",
    data() {
      return {
        first: true,
        // first:false,
        showSelect: false,
        send: {
          country: '',
          phone: "",
          code: "",
          name: "",
          industry: '',
          showindustry:'',
          username: '',
          relationphine: '',
          email: ''
        },
        wait: false,
        time: '',
        list: [],
      };
    },
    components: {
      CountryCode,
      CodeComponent
    },
    computed: {
      ...mapGetters(["lang"]),
    },
    methods: {
      countrycodeHandler(data) {
        this.showSelect = !this.showSelect;
        this.send.country = data.PHONE_CODE;
        // if(this.lang=="zh_CN"){
        //   this.send.country = data.COUNTRY_NAME;
        // }else{
        //   this.send.country = data.COUNTRY_NAME_EN;
        // }
      },
      towait() {
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
          this.$refs.code.showcode()
        }
      },
      codeLoginHandler() {
        this.doCheckUserState()
      },
      doCheckUserState() {
        let obj = {
          countryCode: this.send.country,
          phone: this.send.phone
        }
        this.$api.getcompanybyphone(obj).then(
          res => {
            if (res.data == '1') {
              this.$message({
                message: this.$t('msg.register.already'),
                type: "error"
              });
              return
            } else {
              let opt = {
                areaCode: this.send.country,
                mobileNo: this.send.phone,
                indx: '10000',
                verifyCode: this.$store.state.selectionCodeKey,
              }
              this.$api.getSmsCodeNo(opt).then(
                res => {
                  if (res.code == 0) {
                    this.$message({
                      message: this.$t('msg.register.send'),
                      type: "success"
                    });
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
            }
          }
        )
      },
      next() {
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
        } else if (this.send.country != '' && this.send.phone != ''&& this.send.code=='') {
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
            countryCode: this.send.country,
            phone: this.send.phone,
            smsCode: this.send.code,
          }
          this.$api.checksmscode(obj).then(
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
      handleCommand(command) {
        this.send.industry = command.split('+')[0]
        this.send.showindustry = command.split('+')[1]
      },
      employ() {
        if (this.send.name == '') {
          this.$message({
            message: this.$t('msg.register.name'),
            type: "error"
          });
          return
        } else if (this.send.industry == '') {
          this.$message({
            message: this.$t('msg.register.industry'),
            type: "error"
          });
          return
        } else if (this.send.username == '') {
          this.$message({
            message: this.$t('msg.register.username'),
            type: "error"
          });
          return
        } else if (this.send.relationphine == '') {
          this.$message({
            message: this.$t('msg.register.relationphine'),
            type: "error"
          });
          return
        } else if (this.send.email == '') {
          this.$message({
            message: this.$t('msg.register.email'),
            type: "error"
          });
          return
        } else {
          if (!validate.isEmail(this.send.email)) {
            this.$message({
              message: this.$t('msg.register.emailError'),
              type: "error"
            });
            return
          } else {
            let obj = {
              companyName: this.send.name
            }
            this.$api.getcompanybyname(obj).then(
              res => {
                if (res.data == 1) {
                  this.$message({
                    message: this.$t('msg.register.already2'),
                    type: "error"
                  });
                  return
                } else {
                  let data = {
                    companyName: this.send.name,
                    contactPerson: this.send.username,
                    countryCode: this.send.country,
                    email: this.send.email,
                    industryId: this.send.industry,
                    phone: this.send.phone,
                    smsCode: this.send.code,
                    teletePhone: this.send.relationphine,
                  }
                  this.$api.registercompany(data).then(
                    res => {
                      if (res.code == 0) {
                        this.$router.push({
                          path: "/success",
                          query: {
                            id: res.data,
                            phone: this.send.phone
                          }
                        });
                      };
                    }
                  )
                }
              }
            )
          }

        }
      }
    },
    created() {
      this.$api.getlist().then(
        res => {
          this.list = res.data
        }
      )
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
  .register {
    width: 100vw;
    height: 100vh;
    background: url(../assets/img/reg-back.png) no-repeat;
    background-size: 100% 100%;
    position: relative;

    .box {
      width: 1216px;
      height: 740px;
      background: rgba(255, 255, 255, 1);
      border-radius: 19px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 14px;
      display: flex;
    }

    .menu {
      margin-top: 102px;
      margin-left: 92px;

      .title {
        margin-left: 2px;
        font-size: 30px;
        margin-bottom: 32px;

        &.title2 {
          margin-bottom: 16px;
        }
      }

      input {
        -moz-appearance: textfield;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }

      .country,
      .phone {
        width: 405px;
        height: 51px;
        margin-top: 30px;
        padding-left: 22px;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 10px;
        color: #000;
      }

      .select-box {
        position: absolute;
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

          &.code2 {
            width: 405px;
          }
        }

        .text {
          right: 0;
          font-size: 14px;
          color: #8099E3;
          line-height: 51px;
          cursor: pointer;
          padding-right: 20px;
          text-align: right;

          &.arrow-down {
            width: 405px;
          }

          .el-icon--right {
            font-size: 20px;
          }
        }

        .text2 {
          line-height: 51px;
          color: #999;
        }
      }

      .code-2 {
        width: 405px;
        height: 51px;
        position: relative;
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

          &.code2 {
            width: 405px;
          }
        }

        .text {
          position: absolute;
          right: 0;
          width: 405px;
          font-size: 14px;
          color: #8099E3;
          line-height: 51px;
          cursor: pointer;
          padding-right: 20px;
          text-align: right;

          .el-icon--right {
            font-size: 20px;
          }
        }

        .text2 {
          line-height: 51px;
          color: #999;
        }
      }

      .after {
        width: 405px;
        color: #949CA4;
        margin-top: 23px;
      }

      .next {
        width: 405px;
        margin-top: 54px;
        height: 51px;
        background: rgba(128, 153, 227, 1);
        border-radius: 10px;
        color: #fff;
        text-align: center;
        line-height: 51px;
        cursor: pointer;
      }
    }
  }
</style>