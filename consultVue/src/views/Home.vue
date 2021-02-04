<template>
  <div class="home">
    <div class="top" :style="{ background: themeColour }">
      <div class="logoimg">
        <img v-if="config.imgurl" :src="config.imgurl + 'original/' + company.logo" />
        <img v-else src="../assets/img/init_logo.png" />
      </div>
      <div class="versions">{{ company.companyName }}</div>
    </div>
    <div class="body">
      <div class="nav" v-if="webstyle == 'twoNav' || webstyle == 'leftNav'">
        <img
          :src="config.imgurl + 'original/' + imgdata.leftAdvertiImg"
          @click="goto(imgdata.leftLinkUrl)"
        />
      </div>
      <div class="chat">
        <div class="user" v-if="!customerServiceId">您现在排在第 {{ num }} 位（{{ time }}）</div>
        <div class="service" v-else>
          <img
            v-if="serviceInfo.avatar != null"
            :src="config.imgurl + 'original/' + serviceInfo.avatar"
          />
          <img v-else src="../assets/img/logo.png" />
          <div class="content">{{ serviceInfo.name }}</div>
        </div>
        <!-- 拖拽功能 -->
        <!-- <div class="message-box" @drop="dropArea($event)"> -->
        <div class="message-box" id="message-box" ref="list" v-scrollBar>
          <MsgList :chatlist="chatlist" :userInfo="userInfo" :currentSession="currentSession"></MsgList>
        </div>
        <SessionInput
          ref="sessionInput"
          :msging="msging"
          :layout="layout"
          :chatlist="chatlist"
          @selectAll="selectAll"
          @send="send"
        ></SessionInput>
      </div>
      <div class="nav" v-if="webstyle == 'twoNav' || webstyle == 'rightNav'">
        <img
          :src="config.imgurl + 'original/' + imgdata.rightAdvertiImg"
          @click="goto(imgdata.rightLinkUrl)"
        />
      </div>
    </div>
    <div class="tip" v-if="showleavemsg && !customerServiceId">
      <div class="head">
        <span style="font-size: 16px">Tip</span>
        <img @click="close" src="../assets/img/chat/xx.png" />
      </div>
      <p class="official">
        Your waiting time has reached
        <span>{{ leavemsgtime }}s,</span>In order not to delay your precious time, you can choose to leave us a message
      </p>
      <div class="btns">
        <div class="keepwait" @click="close">wait</div>
        <div class="goleaveMsg" @click="goLeaveMsg">Leave a message</div>
      </div>
    </div>
    <div class="tip2" v-if="showtip">
      <p
        class="official"
      >Whether to leave the current session to leave a message, and return to the session after entering the message.You need to queue again</p>
      <div class="btns">
        <div class="keepwait" @click="showtip = false">No</div>
        <div class="goleaveMsg" @click="goLeaveMsg">Yes</div>
      </div>
    </div>
    <file-popup ref="sendFile" :fileInfo="dropFileInfo"></file-popup>
    <picture-popup ref="sendPicture" :imgInfo="pasteImage"></picture-popup>
    <Popup
      :hideClose="false"
      v-if="layout.module == 'oversize' && layout.child == 'close'"
      :radius="10"
    >
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.chatPanel.overSize") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module == 'fileTypeSupport'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.chatPanel.fileTypeSupport") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup
      :hideClose="false"
      v-if="layout.module == 'error' && layout.child == 'close'"
      :radius="10"
    >
      <div class="seal" slot="body">
        <div class="content">Error!</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <!--  v-if="layout.module == 'evaluatePop'" -->
    <Popup :hideClose="false" v-if="layout.module == 'evaluatedFirst'" :radius="10">
      <div class="seal" slot="body">
        <div class="content">{{ $t("msg.evaluate.evaluatedFirst") }}</div>
        <div class="btn" @click="confirmTips">{{ $t("msg.common.confirm") }}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module == 'evaluateInvite'" :radius="10">
      <div class="seal" slot="body">
        <img class="land-head-icon" src="../assets/img/evaluate/evaluate.png" />
        <div class="content">{{ $t("msg.evaluate.evaluateInvite") }}</div>
        <div
          class="display-flex"
          style="
              width: 260px;
          justify-content: space-around;
          "
        >
          <div class="btn" @click="confirmTips">{{ $t("msg.evaluate.evaluateNext") }}</div>
          <div class="btn" @click="acceptEvaluate">{{ $t("msg.evaluate.evaluateAccept") }}</div>
        </div>
      </div>
    </Popup>
    <EvaluatePopup
      :hideClose="false"
      :isLeave="isLeave"
      v-if="layout.module == 'evaluatePop'"
      :radius="10"
    ></EvaluatePopup>
    <div class="mask" v-if="layout.mask" @click.stop></div>
    <audio id="audio_remind_news" style="opacity: 0" src="../assets/voice/visitor.mp3" muted="true"></audio>
  </div>
</template>

<script>
import { actionApi } from "@/api";
import Rtc from "@/tools/rtc-message";
import { msgEnum, sessionEnum, evaluateCSEnum } from "@/common/enum";
import { msgUtil } from "@/tools/msgUtil";
import store from "@/store";
import { timeUtil } from "@/tools/timeUtil";
import { msgFormatTemplate } from "@/tools/msgFormatTemplate";
import { Util } from "@/tools/utils";
import { EchatDB } from "@/session/indexedDB";
import { msgManager } from "@/session/msgManager";
import MsgList from "@/components/home/MsgList";
import SessionInput from "@/components/home/SessionInput";
import UplaodFiles from "@/components/common/uploadFile";
import EvaluatePopup from "@/components/common/EvaluatePopup";

import { mapGetters } from "vuex";
import { Crypto } from "@/tools/crypto";
export default {
  name: "Home",
  data() {
    return {
      showtip: false,
      editFocus: true,
      // customerServiceId: 1,
      chatlist: [],
      sortJson: {}, //用于消息排序：date:[]
      moreThan: true,
      msgEnum,
      isLeave: false, // 是否离开会话
      company: {
        companyName: "",
        logo: "",
      },
      currentSession: {
        msgId: 0,
      },
      imgdata: {},
      themeColour: null,
      webstyle: "",
      num: "",
      time: "",
      hour: 0,
      minute: 0,
      second: 0, //时 分 秒
      millisecond: 0, //毫秒
      settime: null, //计算等待时间
      settime2: null, //获取排序定时
      automaticTime: null, //超时自动回复时间
      automaticContent: null, //超时自动回复内容
      Nomsgservice: null, //客服无消息内容
      Nomsgtimer: null, //客服无消息定时器
      Nomsgvisitor: {
        contentUs: null,
      }, //访客无消息内容
      Nomsgtimer2: null, //访客无消息定时器
      Closemsg: null, //关闭聊天定内容
      Closemsgtimer: null, //关闭聊天定时器
      showleavemsg: false,
      leavemsgtime: null, //
      leavemsgtimer: null, //留言弹出定时器
      duplicateRemovalCacheId: null, //去重ID集合
    };
  },
  components: {
    MsgList,
    SessionInput,
    EvaluatePopup,
  },
  mixins: [UplaodFiles],
  computed: {
    ...mapGetters(["layout", "userId", "companyId", "serviceInfo", "customerServiceId", "msging", "evaluateConf"]),
    userInfo() {
      return {
        id: this.userId,
        nickName: null,
      };
    },
  },
  watch: {
    chatlist(item, old) {
      let str = item[item.length - 1];
      let reg = RegExp(/him/);
      let reg1 = RegExp(/overtime/);
      let reg2 = RegExp(/self/);
      let reg3 = RegExp(/text/);
      let reg4 = RegExp(/closemsg/);
      //等待中
      if (reg1.test(str) == true) {
        clearInterval(this.Nomsgtimer);
        clearInterval(this.Nomsgtimer2);
        clearInterval(this.Closemsgtimer);
      }
      //访客不发消息
      if (reg.test(str) == true) {
        clearInterval(this.Nomsgtimer);
        clearInterval(this.Nomsgtimer2);
        clearInterval(this.Closemsgtimer);
        let data = `<div class="no-chat"> <span class="text">${this.Nomsgvisitor.contentUs}</span> </div> `;
        if (this.Nomsgvisitor.statusUs == 1 && this.Nomsgvisitor.cycleStatus != 1) {
          this.Nomsgtimer2 = setTimeout(() => {
            this.chatlist.push(data);
            setTimeout(() => {
              this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            }, 200);
          }, this.Nomsgvisitor.repleTimeUs * 1000);
        } else if (this.Nomsgvisitor.statusUs == 1 && this.Nomsgvisitor.cycleStatus == 1) {
          this.Nomsgtimer2 = setInterval(() => {
            this.chatlist.push(data);
            setTimeout(() => {
              this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            }, 200);
          }, this.Nomsgvisitor.repleTimeUs * 1000);
        }
      }
      //聊天超时
      if (reg.test(str) == true || reg2.test(str) == true || reg1.test(str) || reg3.test(str)) {
        if (this.Closemsg && this.Closemsg.statusUs == 1) {
          this.Closemsgtimer = setTimeout(() => {
            clearInterval(this.Nomsgtimer);
            clearInterval(this.Nomsgtimer2);
            let msg = `<div class="no-chat"> <span class="text closemsg">${this.Closemsg.contentUs}</span> </div> `;
            this.chatlist.push(msg);
            setTimeout(() => {
              this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            }, 200);
            actionApi.closeConnect(); //关闭会话
            this.$refs.sessionInput.pushEvaluate(evaluateCSEnum.invitationType.systemSessionOverPush);
            this.$store.commit("SET_MSGING", false);
          }, this.Closemsg.repleTimeUs * 1000 * 60);
        }
      }
      if (reg4.test(str) == true) {
        clearInterval(this.Nomsgtimer);
        clearInterval(this.Nomsgtimer2);
        clearInterval(this.Closemsgtimer);
      }
    },
    msging(item, old) {
      //客服关闭提示语
      if (!item) {
        clearInterval(this.Nomsgtimer);
        clearInterval(this.Nomsgtimer2);
        clearInterval(this.Closemsgtimer);
        if (this.Closemsg.contentTwoUs && this.Closemsg.statusTwoUs == 1) {
          let msg = `<div class="no-chat"> <span class="text">${this.Closemsg.contentTwoUs}</span> </div> `;
          this.chatlist.push(msg);
          setTimeout(() => {
            this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
          }, 200);
        }
      }
    },
  },
  methods: {
    cancelUploadMsg(id) {
      let mediaIndex = this.chatlist.findIndex((item) => item.id == id);
      console.log(mediaIndex);
      this.chatlist.splice(mediaIndex, 1);
    },
    goto(item) {
      if (item == "") {
        return;
      } else {
        window.open(item);
      }
    },
    send(obj) {
      if (!this.customerServiceId) {
        this.$message.warning("Please wait for customer service access");
        return;
      }
      let htmlValue = obj || this.$refs.sessionInput.$refs.editMsg.innerHTML;
      // let txtValue = face.htmlToString(htmlValue) //表情解析
      let txtValue = ""; //移除无用html标签
      let msgtype = msgEnum.text;
      if (obj && obj.type) {
        msgtype = obj.type;
        txtValue = JSON.stringify(obj);
      } else {
        txtValue = msgUtil.htmlToTxt(htmlValue); //移除无用html标签

        let regExp = new RegExp("(&nbsp*)|(<br>*)|( )", "g");
        let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)(\/?[0-9a-z_!~*^'().;?/:@&=+$,%#-]+)+)?/gi;
        if (reg.test(htmlValue) == true) {
          msgtype = msgEnum.textHyperLink;
        }

        if (txtValue.replace(regExp, "").length == 0) {
          this.$message.warning(this.$t("msg.sessionlist.notEmpty"));
          return;
        }
      }
      let arrayIndex = -1;
      //发送中
      msgFormatTemplate
        .formatMsgNew({
          isSender: true,
          fromId: this.customerServiceId,
          bodyFrom: this.userId,
          timeStamp: timeUtil.nowTimestamp(),
          id: -1,
          type: msgtype,
          body: txtValue,
        })
        .then((data) => {
          arrayIndex = this.pushMsg(data);
        });

      if (obj && !obj.uploadStatus && obj.progress < 100) {
        return;
      }

      actionApi
        .sendMsg({
          msgType: msgtype,
          toId: this.customerServiceId,
          msg: txtValue,
        })
        .then((data) => {
          msgFormatTemplate
            .formatMsgNew({
              isSender: true,
              fromId: this.customerServiceId,
              bodyFrom: this.userId,
              timeStamp: Number(data.time),
              id: data.msgId,
              type: msgtype,
              body: txtValue,
            })
            .then((data) => {
              let that = this;
              that.currentSession.msgId = data.msgId;
              let viewShow = typeof data.viewShow == "string" ? data.viewShow : { ...data.viewShow };
              const chatItem = {
                viewShow,
                id: data.id,
                item: data.viewShow,
                type: data.type,
                time: data.time,
                isSender: true,
              };
              if (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio) {
                let mediaIndex = that.chatlist.findIndex((item) => item?.item?.mediaIndex == data.viewShow.mediaIndex);
                that.$set(that.chatlist, mediaIndex, chatItem);
                that.chatlist[mediaIndex] = chatItem;
              } else {
                that.$set(that.chatlist, arrayIndex - 1, chatItem);
                that.chatlist[arrayIndex - 1] = chatItem;
              }
            });
        });
      this.$refs.sessionInput.$refs.editMsg.focus();
      this.$refs.sessionInput.$refs.editMsg.innerHTML = "";
      setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      }, 100);
      this.noMsgpush();
    },
    /**
     * 返回当前数组长度
     */
    pushMsg(data, mode = "") {
      //如何加时间上去
      // console.log(data);
      //id去重
      if (data.id != -1) {
        if (this.duplicateRemovalCacheId.has(data.id)) {
          console.log("重复ID" + data.id);
          return;
        }
        this.duplicateRemovalCacheId.add(data.id);
      }

      if (!this.sortJson.hasOwnProperty(data.date)) {
        let dateTemp;
        if (data.date == timeUtil.nowDate()) {
          let lang = this.$store.state.translate;
          dateTemp = `<div class="no-chat"> <span class="text">${lang.date.today}</span> </div> `;
        } else {
          dateTemp = `<div class="no-chat"> <span class="text">${data.date}</span> </div> `;
        }
        this.chatlist.push(dateTemp);
        this.sortJson[data.date] = [data.viewShow];
      } else {
        this.sortJson[data.date].push(data.viewShow);
      }

      const chatItem = {
        ...data,
        item: data.viewShow,
      };

      if (
        data.viewShow.uploadStatus == true &&
        mode != "init" &&
        (data.type == msgEnum.img || data.type == msgEnum.video || data.type == msgEnum.files || data.type == msgEnum.audio)
      ) {
        let mediaIndex = this.chatlist.findIndex((item) => item?.item?.mediaIndex == data.viewShow.mediaIndex);

        if (mediaIndex >= 0) {
          this.chatlist[mediaIndex] = chatItem;
        } else {
          this.chatlist.push(chatItem);
        }
      } else {
        this.chatlist.push(chatItem);
      }

      setTimeout(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      }, 100);
    },
    clearMsg() {
      this.chatlist.splice[(0, this.chatlist.length)];
    },
    up(x, y) {
      return x.id - y.id;
    },
    /**
     * 消息已读
     */
    msgRead(mId) {
      let b = document.getElementById(mId + "_state_span");
      if (b) b.className = "sendsuccess";
    },
    timer() {
      this.millisecond = this.millisecond + 1000;
      if (this.millisecond >= 1000) {
        this.millisecond = 0;
        this.second = this.second + 1;
      }
      if (this.second >= 60) {
        this.second = 0;
        this.minute = this.minute + 1;
      }
      if (this.minute >= 60) {
        this.minute = 0;
        this.hour = this.hour + 1;
      }
      this.time = this.toDub(this.hour) + ":" + this.toDub(this.minute) + ":" + this.toDub(this.second);
    },

    //补零
    toDub(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    //访客发消息客服无回复
    noMsgpush() {
      clearInterval(this.Nomsgtimer);
      clearInterval(this.Nomsgtimer2);
      clearInterval(this.Closemsgtimer);
      if (this.Nomsgservice) {
        let data = `<div class="no-chat"> <span class="text">${this.Nomsgservice.contentUs}</span> </div> `;
        if (this.Nomsgservice.statusUs == 1 && this.Nomsgservice.cycleStatus != 1) {
          this.Nomsgtimer = setTimeout(() => {
            this.chatlist.push(data);
            setTimeout(() => {
              this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            }, 200);
          }, this.Nomsgservice.repleTimeUs * 1000);
        } else if (this.Nomsgservice.statusUs == 1 && this.Nomsgservice.cycleStatus == 1) {
          this.Nomsgtimer = setInterval(() => {
            this.chatlist.push(data);
            setTimeout(() => {
              this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
            }, 200);
          }, this.Nomsgservice.repleTimeUs * 1000);
        }
      }
    },
    //去留言
    goLeaveMsg() {
      this.$router.push({
        path: "/leave",
        query: {
          id: this.$route.params.id,
          userid: this.userId,
          url: this.$route.params.url,
        },
      });
    },
    close() {
      this.showleavemsg = false;
    },
    confirmTips() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    acceptEvaluate() {
      this.$store.dispatch("setLayout", ["evaluatePop", "", true]);
    },
    //打开会话再请求rtc
    open() {
      let id = this.$route.params.id;
      let fromId = localStorage.getItem(this.$store.state.companyId + "fromId");
      store.commit("SET_USER_ID", fromId);
      this.$api
        .open({
          companyId: this.$store.state.companyId,
          visitorId: fromId,
        })
        .then((res) => {
          let serviceId = res.data.customerId;
          if (serviceId) {
            this.$store.commit("SET_CUSTOMER_SERVICE_ID", serviceId);
          }
          EchatDB.openDB(id + "-" + this.$store.state.userId).then(() => {
            Rtc.rtc();
            msgManager.getMsg(0, 0, 1000, 1, true, 100).then((data) => {
              data.sort(this.up).forEach((item) => {
                this.pushMsg(item, "init");
              });
            });
          });
          if (res.data.openState == 1) {
            let body = {};
            body.name = res.data.customerNickName;
            body.avatar = res.data.customerAvatar;
            sessionStorage.setItem("serviceInfo", JSON.stringify(body));
            store.commit("SET_SERVICEINFO", body);
            store.commit("SET_MSGING", true);
            this.getsysreple();
          }
          if (res.data.openState == 0) {
            // 查询排序
            this.$api
              .getvisitorsort({
                companyId: this.$route.params.id,
                visitorId: store.state.userId,
              })
              .then((res) => {
                this.num = res.data;
              });
          } else if (res.data.openState == -1) {
            this.$router.push({
              path: "/leave",
              query: {
                id: this.$route.params.id,
                userid: this.$store.state.userId,
                url: this.$route.params.url,
              },
            });
          }
        });
    },
    //获取自动回复
    getsysreple() {
      let id = this.$route.params.id;
      this.$api
        .getsysreplebytype({
          companyId: id,
        })
        .then((res) => {
          if (res.data) {
            let timeoutCache;
            for (let index in res.data) {
              let cache = res.data[index];
              switch (cache.type) {
                case 1:
                  timeoutCache = cache;
                  if (timeoutCache.statusUs == 1) {
                    this.automaticTime = timeoutCache.repleTimeUs;
                    this.automaticContent = timeoutCache.contentUs;
                    let data = `<div class="no-chat"> <span class="text overtime">${this.automaticContent}</span> </div> `;
                    setTimeout(() => {
                      if (!this.msging) {
                        this.chatlist.push(data);
                        setTimeout(() => {
                          this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
                        }, 200);
                      } else {
                        return;
                      }
                    }, this.automaticTime * 1000);
                    let timer;
                    if (timeoutCache.cycleStatus == 1 && !this.msging) {
                      timer = setInterval(() => {
                        this.chatlist.push(data);
                        setTimeout(() => {
                          this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
                        }, 200);
                      }, this.automaticTime * 1000);
                    } else {
                      clearInterval(timer);
                    }
                  }
                  break;
                case 2:
                  this.Nomsgservice = cache;
                  break;
                case 3:
                  this.Nomsgvisitor = cache;
                  break;
                case 4:
                  this.Closemsg = cache;
                  break;
                default:
                  break;
              }
            }
          } else {
            return;
          }
        });
    },
  },
  created() {
    let companyid = window.localStorage.getItem("companyid");
    let id = this.$route.params.id;
    if (!companyid) window.localStorage.setItem("companyid", id);
    if (companyid != id) {
      window.localStorage.removeItem(companyid + "fromId");
      window.localStorage.removeItem("channel");
      window.localStorage.setItem("companyid", id);
    }
    this.$store.commit("SET_COMPANYID", id);
    let url = encodeURIComponent(this.$route.params.url);
    let userid = this.$route.params.userid;
    let data = this.$route.params.data;
    let styleid = this.$route.params.style;
    let device = this.$route.params.device;
    let checkCode = Crypto.encryptByMd5(id + url + data + userid + styleid);
    if (checkCode != this.$route.params.checkCode) {
      this.$router.push({
        path: "/notfond",
      });
    }
    //获取样式
    if (styleid == 0 && userid == 0 && data == 0) {
      this.$api
        .getdefaultstyle({
          companyId: id,
          styleId: styleid,
        })
        .then((res) => {
          window.document.title = res.data.siteTitle;
          this.imgdata = {
            leftAdvertiImg: res.data.leftImg,
            leftLinkUrl: res.data.leftLinkUrl,
            rightAdvertiImg: res.data.rightImg,
            rightLinkUrl: res.data.rightLinkUrl,
          };
          this.themeColour = res.data.dialogSkin;
          store.commit("SET_THEMECOLOUR", res.data.dialogSkin);
          this.webstyle = res.data.webWindowStyle;
        });
    } else {
      this.$api
        .getstyle({
          companyId: id,
          styleId: styleid,
        })
        .then((res) => {
          window.document.title = res.data.siteTitle;
          this.imgdata = {
            leftAdvertiImg: res.data.leftImg,
            leftLinkUrl: res.data.leftLinkUrl,
            rightAdvertiImg: res.data.rightImg,
            rightLinkUrl: res.data.rightLinkUrl,
          };
          this.themeColour = res.data.dialogSkin;
          store.commit("SET_THEMECOLOUR", res.data.dialogSkin);
          this.webstyle = res.data.webWindowStyle;
        });
    }
    //获取公司信息
    this.$api
      .getcompanyname({
        companyId: id,
      })
      .then((res) => {
        this.company = res.data;
      });

    //获取留言设置
    this.$api
      .getleaveconf({
        companyId: id,
      })
      .then((res) => {
        if (res.data.waitStatus == 1) {
          this.leavemsgtime = res.data.waitTime;
          this.leavemsgtimer = setTimeout(() => {
            this.showleavemsg = true;
          }, res.data.waitTime * 1000);
        }
      });
    let idSeq = window.localStorage.getItem(this.$store.state.companyId + "idSeq");
    if (idSeq) {
      this.$store.state.idSeq = idSeq;
    }
    let body = JSON.parse(window.sessionStorage.getItem("serviceInfo"));
    store.commit("SET_SERVICEINFO", body);
    //查询缓存
    let channelId = localStorage.getItem("channel");
    let fromId = localStorage.getItem(this.$store.state.companyId + "fromId");
    actionApi
      .connect({
        url: url,
        companyId: id,
        visitorUuid: channelId,
        siteName: device,
      })
      .then((res) => {
        try {
          this.open();
        } catch (error) {
          console.log(res, error);
        }
      });
    console.log(this.$options.name + " 被加载");
    this.$store.state.activityComponents[this.$options.name] = this; //注册
  },
  mounted() {
    this.duplicateRemovalCacheId = new Set();
    window.addEventListener("click", (event) => {
      if (this.layout.module != "") {
        this.$store.commit("SET_LAYOUT", ["", "", false]);
      }
    });
    setTimeout(() => {
      this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
      // 获取客服评价配置
      actionApi
        .getEvaluateConf({
          userId: this.userId,
          companyId: this.companyId,
        })
        .then((res) => {
          if (res && res.code == 0) {
            this.$store.commit("SET_EVALUATE_CONF", res.data);
          }
        });
    }, 200);

    //等待时间
    this.settime = setInterval(() => {
      this.timer();
    }, 1000);
    //留言弹窗
    // 5秒后开始更新等待排序，10秒更新一次
    setTimeout(() => {
      if (this.customerServiceId == null) {
        this.settime2 = setInterval(() => {
          this.$api
            .getvisitorsort({
              companyId: this.$route.params.id,
              visitorId: this.userId,
            })
            .then((res) => {
              this.num = res.data;
            });
        }, 10000);
      } else {
        clearInterval(this.settime);
        clearInterval(this.settime2);
        clearInterval(this.leavemsgtimer);
      }
    }, 5000);
  },
  destroyed() {
    console.log(this.$options.name + " 被销毁");
    delete this.$store.state.activityComponents[this.$options.name]; //销毁
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/var";

.home {
  position: relative;

  .tip {
    width: 399px;
    height: 225px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px 18px;

    .head {
      img {
        float: right;
        cursor: pointer;
      }
    }

    .official {
      margin-top: 35px;
      padding: 0 16px;
      text-align: center;
    }

    .btns {
      display: flex;
      margin-top: 40px;
      justify-content: flex-end;

      .keepwait {
        width: 58px;
        height: 34px;
        background: #ffffff;
        border: 1px solid $color-theme;
        color: $color-theme;
        line-height: 34px;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        margin-right: 25px;
      }

      .goleaveMsg {
        width: 158px;
        height: 34px;
        color: #fff;
        background: $color-theme;
        line-height: 34px;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .tip2 {
    width: 399px;
    height: 195px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px 18px;

    .head {
      img {
        float: right;
        cursor: pointer;
      }
    }

    .official {
      margin-top: 35px;
      padding: 0 16px;
      text-align: center;
    }

    .btns {
      display: flex;
      margin-top: 40px;
      justify-content: flex-end;

      .keepwait {
        width: 58px;
        height: 34px;
        background: #ffffff;
        border: 1px solid $color-theme;
        color: $color-theme;
        line-height: 34px;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        margin-right: 25px;
      }

      .goleaveMsg {
        width: 58px;
        height: 34px;
        color: #fff;
        background: $color-theme;
        line-height: 34px;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  .top {
    height: 70px;
    width: 100%;

    .logoimg {
      position: absolute;
      top: 9px;
      left: 27px;

      img {
        width: 52px;
        height: 52px;
      }
    }

    .versions {
      font-size: 24px;
      color: #fff;
      position: absolute;
      left: 108px;
      line-height: 24px;
      top: 22px;
    }
  }

  .body {
    display: flex;

    .nav {
      width: 422px;
      height: calc(100vh - 70px);
      cursor: pointer;

      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }

    .chat {
      flex: 1;
      height: calc(100vh - 70px);

      .user {
        height: 66px;
        text-align: center;
        line-height: 66px;
        // border-bottom: 1px solid #999;
      }

      .service {
        height: 66px;
        display: flex;

        img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          // border: 2px solid $color-theme;
          margin-left: 15px;
          margin-top: 8px;
        }

        .content {
          line-height: 66px;
          margin-left: 18px;
          font-size: 18px;
        }
      }

      .message-box {
        width: 100%;
        background: #f0f2f7;
        position: relative;
        background: $backgroup-color;
        .message-list {
          position: relative;
          height: calc(100vh - 323px);
          width: 100%;
        }
      }
    }
  }
  .land-head-icon {
    position: absolute;
    top: -50px;
    left: 50%;
    margin-left: -60px;
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
}
</style>
