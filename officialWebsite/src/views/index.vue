<template>
  <div class="index">
    <div class="header">
      <el-row>
        <el-col :span="2">
          <div class="grid-content">
            <el-dropdown class="cutlang" trigger="click">
              <!-- <div style="cursor: pointer;">切换</div> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toggleLang('zh_CN')" :disabled="$i18n.locale == 'zh_CN'">中文
                </el-dropdown-item>
                <el-dropdown-item @click.native="toggleLang('en_US')" :disabled="$i18n.locale == 'en_US'">English
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content back">
            <img src="../assets/img/logo.png">
            <div class="router">
              <div class="router-item" :class="item.path==route?'active':''" v-for="(item,index) in router" :key="index" @click="go(item.path)">{{$t(item.name)}}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <div class="login-reg">
              <div class="login" @click="goLogin">{{$t("msg.common.Login")}}</div>
              <a class="reg" :href="'#/register/'+lang"  target="_blank" >{{$t("msg.common.Freetrial")}}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
  export default {
    name: "index",
    data() {
      return {
        editFocus: true,
        customerServiceId: 1,
        chatlist: [],
        sortJson: {}, //用于消息排序：date:[]
        moreThan: true,
        route:"",
        router: [{
            path: "home",
            name: "msg.common.home"
          },
          {
            path: "product",
            name: "msg.common.product"
          },
          {
            path: "industry",
            name: "msg.common.industry"
          },
          {
            path: "service",
            name: "msg.common.service"
          },
          {
            path: "partner",
            name: "msg.common.partner"
          },
          {
            path: "about",
            name: "msg.common.about"
          },
        ]
      };
    },
    methods: {
      go(item) {
        // this.$router.push({
        //   name: item
        // });
        // this.route= item
      },
      goLogin() {
        let lang = localStorage.getItem('locale') || 'en_US'
        window.open (window.location.origin+"/dist/#/login/"+lang) 
      },
      toggleLang(lang) {
        if (lang == "zh_CN") {
          localStorage.setItem("locale", "zh_CN");
          this.$i18n.locale = localStorage.getItem("locale");
          this.$store.commit("SET_LANG", this.$i18n.locale);

          this.$message({
            message: "切换为中文！",
            type: "success"
          });
        } else if (lang == "en_US") {
          localStorage.setItem("locale", "en_US");
          this.$i18n.locale = localStorage.getItem("locale");
          console.log(this.$i18n.locale);
          this.$store.commit("SET_LANG", this.$i18n.locale);
          this.$message({
            message: "Switch to English!",
            type: "success"
          });
        }
      },
    },
    computed: {
      ...mapGetters(["lang"]),
    },
    created() {

    },
    mounted() {
      // this.$router.push({
      //   name: "home"
      // });
      this.route= this.$route.name
    }
  }
</script>
<style lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    a{
      text-decoration:none;
    }
    .header {
      position: fixed;
      width: 100%;
      height: 90px;
      z-index: 999;
      background: #45455C;
      .grid-content {
        &.back {
          padding-top: 20px;
          display: flex;
          justify-content: flex-start;

          .router {
            display: flex;
            justify-content: space-around;
            padding-right: 20px;
            // margin-left: 76px;
            width: 100%;

            .router-item {
              font-size: 24px;
              line-height: 53px;
              color: #fff;
              cursor: pointer;
              &.active{
                color: #678EE8;
              }
            }
          }

        }

        .login-reg {
          padding-top: 20px;
          display: flex;
          justify-content: space-between;

          .login {
            width: 50%;
            height: 51px;
            color: #fff;
            border-radius: 26px;
            text-align: center;
            line-height: 51px;
            font-size: 24px;
            cursor: pointer;
          }

          .reg {
            width: 191px;
            height: 51px;
            color: #fff;
            background: rgba(71, 74, 153, 1);
            border-radius: 26px;
            text-align: center;
            line-height: 51px;
            font-size: 24px;
            cursor: pointer;
          }
        }
      }
      .cutlang{
        margin-left:20px ;
        /deep/.el-dropdown-menu {
          z-index: 1000;
        }
      }
    }
  }
</style>