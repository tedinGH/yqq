<template>
  <div class="chat-panel" :style="{ width: width + 'px'}">
    <header class="pannel-header">
      <!-- 单聊、系统推送 -->
      <div
        class="chat-info display-flex"
        ondragstart="return false"
        v-if="currentSession.fromType == '0' || currentSession.fromType == '2'"
      >
        <div class="user-avatar">
          <img
            class="img"
            :src="global.fileDownUrl + 'compress/'+currentSession.img"
            v-headError
            @click.stop="showmemberProfile(currentSession.paramId)"
          />
          <img
            class="img"
            src="../../assets/images/error-head.png"
            v-if="currentSession.fromType == 0 && !currentSession.img"
            @click.stop="showmemberProfile(currentSession.paramId)"
          />
          <!-- <span class="default" v-defaultHead v-if="currentSession.fromType == 0 && !currentSession.img"
          v-html="currentSession.name"  @click.stop="showmemberProfile(currentSession.paramId)" ></span>-->
        </div>
        <div v-if="currentSession.fromType == '0'">
          <p>{{ currentSession.name }}</p>
          <p
            class="member-number"
            v-if="(currentSession.describe || friendInfo.sourceDescribe) && currentSession.temp"
          >
            <span class="sub-text" v-if="!otherIsTyping">
              (
              {{ $t("msg.detail.from") }}：
              {{ currentSession.describe || friendInfo.sourceDescribe | sourceFitler }}
              )
            </span>
            <!-- 对方正在输入 -->
            <span class="typing-text" v-if="otherIsTyping">
              {{(isTyping.type == 0 ? $t("msg.chatPanel.isTyping"):$t("msg.chatPanel.isTalking"))}}
              <span
                class="typing-loading"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </p>
          <p class="member-number" v-else>
            <span class="online" v-if="friendInfo.imOfflineState == 0 && !otherIsTyping">
              {{
              $t("msg.chatPanel.online")
              }}
            </span>
            <span
              class="sub-text"
              v-if="friendInfo.imOfflineState == 1 && !otherIsTyping &&friendInfo.imLogoutTime"
            >
              {{ $t("msg.chatPanel.last")
              }}{{ friendInfo.imLogoutTime | timeFilter }}
            </span>
            <!-- 对方正在输入 -->
            <span class="typing-text" v-if="otherIsTyping">
              {{(isTyping.type == 0 ? $t("msg.chatPanel.isTyping"):$t("msg.chatPanel.isTalking"))}}
              <span
                class="typing-loading"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </p>
        </div>
        <div v-else>
          <p>{{ currentSession.name }}</p>
        </div>
      </div>
      <!-- 群聊 -->
      <div class="chat-info" ondragstart="return false" v-else>
        <p @click.stop="showInformation">{{ currentSession.name }}</p>
        <p
          class="sub-text"
          v-if="$i18n.locale == 'en_US'"
        >{{goupMemberNum + " " + $t("msg.groupInfo.groupUser")}}</p>
        <p
          class="sub-text"
          v-else
        >{{ "(" + $t("msg.groupInfo.groupUser") + "：" +goupMemberNum + ")" }}</p>
      </div>
      <!-- 菜单栏 -->
      <chat-header ref="chatheader"></chat-header>
    </header>
    <div id="draguplod" @drop="dropArea($event)">
      <section
        class="message-box"
        id="message-box"
        :class="{system: currentSession.fromType == '2'}"
        @mousedown="scorllBox()"
      >
        <div
          v-if="backurl.url!=''&&currentSession.fromType != '2'"
          :class="backurl.isdim=='2'?'back-box isdim':'back-box'"
        >
          <img :src="global.fileDownUrl+'original/'+backurl.url" />
        </div>
        <!-- 有人@我  -->
        <div class="message-goto at" v-if="at && at.length">
          <div class="goto-box" @click="readAt">
            <span class="goto-icon" :class="{ top: goto == 'top' }"></span>
            <span class="goto-text">{{at.length}}</span>
            <span class="goto-close" @click.stop="readAt('all')"></span>
          </div>
        </div>
        <!-- 浏览记录时新接收消息提示 -->
        <div class="message-goto" :class="{ top: goto == 'top' }" v-if="currentUnread.num>0">
          <div class="goto-box" @click="gotoUnread()">
            <span class="goto-icon"></span>
            <span class="goto-text">{{ currentUnread.num }}</span>
            <span class="goto-close" @click.stop="currentUnread = {num:0,lastReadId:0}"></span>
          </div>
        </div>
        <!-- 群公告置顶 -->
        <div class="affiche" v-if="groupAffiche" @click="getAfficheDetail">
          <i></i>
          <span class="close" @click.stop="deleteAffiche"></span>
          <p class="name">{{$t("msg.groupInfo.affiche")}}</p>
          <p>
            <span v-html="groupAffiche.bodyContent.affiche"></span>
          </p>
        </div>
        <!-- 群聊邀请审核提示 -->
        <div class="verify" v-if="inviter && inviter.length">
          <span>
            {{
            inviter[0].operatorName +
            $t("msg.chatPanel.invite") +
            inviter[0].inviterNum +
            $t("msg.chatPanel.userJoin")
            }}
          </span>
          <span
            class="goto-verify"
            @click="$refs.inviter.show(inviter[0])"
          >{{ $t("msg.chatPanel.goToView") }}>></span>
        </div>
        <!-- 群聊和单聊 -->
        <div
          class="message-list"
          v-if="currentSession.fromType == '0' || currentSession.fromType == '1'"
        >
          <virtual-list
            style="height: 100%; overflow-y: auto;"
            ref="list"
            :data-key="'mId'"
            :data-sources="chatHistory"
            :extra-props="{atId,friendInfo,firstMsgId,mewMsgId,myself, goto, showMore}"
            :data-component="MsgListItemComponent"
            :keeps="30"
            :estimate-size="30"
            @totop="loadMore"
          >
            <div slot="header" class="header">
              <div class="no-more" v-if="scrollFlag == 2">
                <span class="text">{{ $t("msg.chatPanel.none") }}</span>
              </div>
              <loading v-if="scrollFlag == 1"></loading>
            </div>
          </virtual-list>
        </div>
        <!-- 系统推送信息 -->
        <div class="message-list" v-if="currentSession.fromType == '2'">
          <virtual-list
            style="height: 100%; overflow-y: auto;"
            ref="list"
            :data-key="'mId'"
            :data-sources="chatHistory"
            :extra-props="{atId,friendInfo,firstMsgId,mewMsgId,myself, goto, showMore}"
            :data-component="SystemMsgListItemComponent"
            :keeps="30"
            :estimate-size="30"
            @totop="loadMore"
          >
            <div slot="header" class="header">
              <div class="no-more" v-if="scrollFlag == 2">
                <span class="text">{{ $t("msg.chatPanel.none") }}</span>
              </div>
              <loading v-if="scrollFlag == 1"></loading>
            </div>
          </virtual-list>
        </div>
        <!-- 下载二维码 -->
        <div
          class="qr-code"
          v-show="qrCode.show"
          :style="{ top: qrCode.top - 160 + 'px', left: qrCode.left - 75 + 'px' }"
          id="qrcode"
        >
          <canvas id="qrcodeCanvas"></canvas>
        </div>
      </section>
      <!-- 发送信息编辑框 -->

      <div
        class="message-input"
        ondragstart="return false"
        v-if="forbiddenWord == 0 && currentSession.fromType != '2'"
      >
        <message-operation ref="operation"></message-operation>
        <at-box v-model="atList" @change="selectAtItem"></at-box>
        <!-- <input-menu :friend="friendInfo"></input-menu> -->
        <a class="icon icon-image">
          <label class="lable" for="upAll"></label>
          <input
            type="file"
            hidden="true"
            id="upAll"
            multiple
            @change="selectAll($event)"
            accept="*"
          />
        </a>
        <div class="input-area" v-scrollBar>
          <div class="input-placeholder" v-if="editFocus">{{ $t("msg.chatPanel.say") }}</div>
          <pre
            class="input-msg"
            contenteditable="true"
            ref="editMsg"
            @focus="editFocus = false"
            @blur="saveDraft()"
            @paste="pasteMessage($event)"
            @keyup="msgChange($event)"
            @keydown="preKeydown($event)"
          ></pre>
        </div>
        <div class="more-then" v-if="moreThan">{{ $t("msg.chatPanel.moreThan") }}</div>
        <emoji ref="emoji"></emoji>
        <!-- 发送按钮 -->
        <send-button @send="sendMsg"></send-button>
        <!-- @列表 -->
      </div>

      <!-- 多选 -->
      <div class="message-more display-flex" v-if="showMore">
        <i @click="showMore = false"></i>
        <div class="forward-more">
          <div class="img-forward" :class="{ disable: forwardStatus }" @click="showForward"></div>
          <p>{{ $t("msg.menu.forward") }}</p>
        </div>
        <div class="delete-more">
          <div class="img-delete" :class="{ disable: deleteStatues }" @click="showDelete"></div>
          <p>{{ $t("msg.menu.delete") }}</p>
        </div>
      </div>
      <!-- 禁言状态 -->
      <div class="message-input" :class="{ forbidden: forbiddenWord > 0 }" v-if="forbiddenWord > 0">
        <span v-if="forbiddenWord == 1">{{ $t("msg.chatPanel.allMute") }}</span>
        <span v-else-if="forbiddenWord == 2">{{$t("msg.chatPanel.managerMute")}}</span>
        <span v-else-if="forbiddenWord == 3">{{$t("msg.chatPanel.privateMute")}}</span>
      </div>
    </div>
    <!-- 转发选择 -->
    <Popup :hideHeader="true" :hide-close="true" :radius="'8'" v-if="forwordSelect" :ifclose="true">
      <div class="Select" @click.stop slot="body">
        <div @click="goforList" class="check">
          <span class="select" :class="{active:forwordState==1}"></span>
          {{$t("msg.forward.history")}}
        </div>
        <div @click="goforNew" class="check">
          <span class="select" :class="{active:forwordState==2}"></span>
          {{$t("msg.forward.messages")}}
        </div>
      </div>
    </Popup>
    <!-- 超过100 -->
    <Popup :hideHeader="true" v-if="exceed" :hide-close="true">
      <div @click.stop slot="body">
        <div class="default-box">
          <p>{{ $t("msg.forward.exceed")}}</p>
        </div>
        <div class="default-but display-flex">
          <div
            class="two-btn delete"
            @click="exceed = false;forwordSelect=false"
          >{{ $t("msg.common.ensure") }}</div>
        </div>
      </div>
    </Popup>
    <friend-information v-if="layout.module == 'fd-inf' && layout.child == 'fi'"></friend-information>
    <group-information
      ref="groupInformation"
      v-if="layout.module == 'gp-inf' && (layout.child == 'gi' || layout.child == 'mr')"
    ></group-information>
    <!-- <message-operation ref="operation"></message-operation> -->
    <file-popup ref="sendFile" :fileInfo="dropFileInfo"></file-popup>
    <picture-popup ref="sendPicture" :imgInfo="pasteImage"></picture-popup>
    <!-- <card ref="card"></card> -->
    <delete-message ref="deleteInfo"></delete-message>
    <group-invite ref="groupInvite"></group-invite>
    <verify-inviter ref="inviter" v-model="inviter"></verify-inviter>
    <DeleteGroupmember></DeleteGroupmember>
    <msg-record ref="msgRecord"></msg-record>
    <announcement
      v-model="operationIndex"
      :announcement="affiche"
      :afficheType="afficheType"
      :isAdmin="isAdmin"
      @update="updateAffiche"
      v-if="operationIndex == 1"
    ></announcement>
    <success v-model="showSuccess" :title="$t('msg.tip.operateSuccess')"></success>
    <success v-model="showSuccess2" :title="$t('msg.tip.forwardedsuccess')"></success>
  </div>
</template>

<script src="./chat-panel.js"></script>

<style lang="scss" scoped>
@import "../../assets/css/var";

.chat-panel {
  position: relative;
  width: 730px;
  height: 754px;
  border-radius: 0 0 2px 0;
  border-left: 1px solid $border-color;
  background-color: #fff;
  .Select {
    width: 300px;
    height: 120px;
    display: flex;
    font-size: 14px;
    // padding: 25px 0;
    flex-direction: column;
    justify-content: center;
    .check {
      padding-left: 30px;
      height: 50px;
      display: flex;
      align-items: center;
      color: #5f717f;
      cursor: pointer;
      &:hover {
        background: $active-backgroup;
      }
      .select {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background: url(../../assets/images/icon/select.png);
        &.active {
          background: url(../../assets/images/icon/check.png);
        }
      }
    }
  }
  .pannel-header {
    position: relative;
    height: 76px;
    width: 100%;
    padding: 0 16px;
    // box-sizing: border-box;
    // border-left: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    line-height: 20px;
    .chat-info {
      position: relative;
      float: left;
      font-weight: 900;
      font-size: 18px;
      padding: 25px 0 0 0;
      line-height: 23px;
      cursor: pointer;
      .user-avatar {
        position: relative;
        width: 46px;
        height: 46px;
        margin-right: 16px;
        .default {
          position: absolute;
          top: 0;
          left: 0;
          width: 46px;
          height: 46px;
          background: rgb(169, 169, 169);
          border-radius: 50%;
          text-align: center;
          line-height: 46px;
          font-weight: 550;
          color: #fff;
        }
      }
      .member-number {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub-text {
        font-size: 14px;
        font-weight: 400;
        color: $color-grey;
      }
      .typing-text {
        font-size: 14px;
        color: $color-theme;
        .typing-loading {
          height: 6px;
          span {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-right: 5px;
            margin-bottom: 2px;
            border-radius: 50%;
            background: $color-theme;
            -webkit-animation: load 1.3s ease infinite;
          }
          @-webkit-keyframes load {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0.4;
            }
          }
          span:nth-child(1) {
            -webkit-animation-delay: 0.3s;
          }
          span:nth-child(2) {
            -webkit-animation-delay: 0.5s;
          }
          span:nth-child(3) {
            -webkit-animation-delay: 0.7s;
          }
        }
      }
      .online {
        font-size: 14px;
        &::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 5px;
          border-radius: 6px;
          background-color: #37e837;
        }
      }
    }
    // .header-menu {
    //   position: absolute;
    //   top: 30px;
    //   right: 16px;
    //   .menu-icon {
    //     position: relative;
    //     width: 30px;
    //     height: 30px;
    //     background: url(../../assets/images/chat/header-menu.png);
    //     cursor: pointer;
    //   }
    //   .setting {
    //     background-position: 0 0;
    //     &.active,
    //     &:hover {
    //       background-position: 0 -30px;
    //     }
    //   }
    //   .more {
    //     margin-left: 12px;
    //     background-position: -30px 0;
    //     &.active,
    //     &:hover {
    //       background-position: -30px -30px;
    //     }
    //   }
    // }
  }
  #draguplod {
    width: 100%;
    height: 606px;
  }
  .draguplod {
    position: absolute;
    top: 67px;
    width: 100%;
    height: 606px;
    background: rgba(255, 255, 255, 0.85);
    z-index: 10;
    div {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 571px;
      border: 3px dashed #999;
    }
  }
  .message-more {
    z-index: 110;
    position: absolute;
    left: 20px;
    bottom: 10px;
    width: 692px;
    height: 120px;
    background: #ecf7f6;
    border: 1px solid #dbefeb;
    border-radius: 30px;
    i {
      display: inline-block;
      position: absolute;
      top: 7px;
      right: 23px;
      height: 24px;
      width: 24px;
      background-image: url(../../assets/images/icon/close4.png);
      background-size: 100% 100%;
      cursor: pointer;
    }
    .forward-more,
    .delete-more {
      width: 50%;

      .img-forward {
        height: 60px;
        width: 60px;
        margin: 0 auto;
        border-radius: 50px;
        border: 1px solid $color-theme;
        cursor: pointer;
        background: url(../../assets/images/i-more.png) no-repeat center;
        &.disable {
          background: url(../../assets/images/i-more-dis.png) no-repeat center;
          border: 1px solid $border-color;
        }
      }
      .img-delete {
        height: 60px;
        width: 60px;
        margin: 0 auto;
        border: 1px solid $color-theme;
        border-radius: 50px;
        cursor: pointer;
        background: url(../../assets/images/i-delete.png) no-repeat center;
        &.disable {
          background: url(../../assets/images/i-delete-dis.png) no-repeat center;
          border: 1px solid $border-color;
        }
      }
      p {
        height: 14px;
        margin-top: 14px;
        font-size: 14px;
        text-align: center;
      }
    }
    .delete-more {
      left: 415px;
    }
  }
  .message-input {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: auto;
    min-height: 72px;
    max-height: 145px;
    z-index: 11;
    // border-top: 1px solid $border-color;
    background: #fff;
    padding: 30px 0 20px 0;
    .icon-image {
      position: absolute;
      bottom: 16px;
      left: 22px;
      display: inline-block;
      width: 34px;
      height: 34px;
      cursor: pointer;
      background: url(../../assets/images/chat/up1.png);
      &:hover {
        background: url(../../assets/images/chat/up2.png);
      }
      .lable {
        display: block;
        width: 34px;
        height: 34px;
      }
    }
    .input-area {
      position: relative;
      left: 65px;
      height: auto;
      min-height: 16px;
      max-height: 112px;
      width: 514px;
      box-sizing: border-box;
      .input-placeholder {
        position: absolute;
        color: #888;
        font-size: 14px;
        padding-left: 10px;
        pointer-events: none;
        border-left: 1px solid #999;
      }
      .input-msg {
        height: auto;
        width: 100%;
        line-height: 22px;
        font-family: "Microsoft Yahei", Tahoma, Helvetica, Arial, sans-serif !important;
        font-size: 14px;
        color: #2c2c2c;
        outline: 1px solid #fff;
        white-space: normal;
        word-break: break-all;
      }
    }
    &.forbidden {
      font-size: 18px;
      font-weight: bold;
      color: $color-grey;
      text-align: center;
      line-height: 23px;
      background-color: $active-backgroup;
    }
  }
  .message-box {
    position: relative;
    width: 100%;
    height: 606px;
    // border-left: 1px solid $border-color;
    .back-box {
      width: 100%;
      height: 606px;
      position: absolute;
      img {
        width: 100%;
        height: 606px;
      }
      &.isdim {
        -webkit-filter: blur(4px);
        -moz-filter: blur(4px);
        -o-filter: blur(4px);
        -ms-filter: blur(4px);
        filter: blur(4px);
        opacity: 0.6;
      }
    }
    .message-list {
      position: relative;
      height: 606px;
      width: 100%;
      &.more {
        padding-bottom: 66px;
      }
      > .loading {
        padding: 15px;
        text-align: center;
        .img {
          display: inline-block;
          width: 50px;
          height: 50px;
        }
      }
      > div {
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0);
          background-color: #ffffff;
          border-radius: 10px;
        }

        &::-webkit-scrollbar {
          width: 6px;
          background-color: #ffffff;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 6px;
          background-color: rgba(60, 73, 117, 0.5);
        }
      }
    }
    .message-goto {
      z-index: 20;
      position: absolute;
      top: 430px;
      right: 0px;
      cursor: pointer;
      &.at {
        top: 385px;
        .goto-box {
          .goto-icon {
            width: 32px;
            left: 10px;
            top: 4px;
            height: 32px;
            background: url(../../assets/images/chat/@.png);
          }
        }
      }
      .goto-box {
        position: relative;
        display: block;
        // height: 24px;
        // line-height: 24px;
        // padding: 0 25px;
        // box-shadow: 0 0 2px #ccc;
        // text-align: center;
        background: url(../../assets/images/chat/goto-b.png);
        width: 120px;
        height: 40px;
        // background: #fff;
        .goto {
          text-decoration: none;
          color: $color-theme;
        }
        .goto-icon {
          position: absolute;
          display: block;
          width: 32px;
          left: 10px;
          top: 4px;
          height: 32px;
          background: url(../../assets/images/chat/goto.png);
        }
        .goto-text {
          display: inline-block;
          position: absolute;
          top: 4px;
          left: 32px;
          line-height: 18px;
          text-align: center;
          width: 28px;
          height: 18px;
          color: #fff;
          background: #ed6c67;
          border-radius: 9px;
        }
        .goto-close {
          display: block;
          position: absolute;
          top: 7px;
          right: 10px;
          width: 24px;
          height: 24px;
          background: url(../../assets/images/icon/close3.png) center center
            no-repeat;
          background-size: cover;
        }
      }
      &.top {
        top: 50px;
        .goto-icon {
          transform: rotate(180deg);
        }
      }
    }
    .affiche {
      position: absolute;
      z-index: 19;
      width: 691px;
      height: 60px;
      padding: 0 15px;
      line-height: 58px;
      background-color: #fff;
      padding-left: 64px;
      margin-left: 20px;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);

      border-radius: 8px;
      cursor: pointer;
      .close {
        display: inline-block;
        position: absolute;
        right: 16px;
        top: 18px;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-image: url(../../assets/images/icon/close3.png);
        cursor: pointer;
      }
      i {
        display: inline-block;
        position: absolute;
        left: 16px;
        top: 12px;
        height: 33px;
        width: 33px;
        margin-right: 10px;
        vertical-align: middle;
        background-size: 100% 100%;
        background-image: url(../../assets/images/icon/affiche.png);
      }
      p {
        line-height: 21px;
        font-size: 14px;
        &.name {
          margin-top: 8px;
          font-size: 12px;
          color: $title-color;
        }
        span {
          display: inline-block;
          width: auto;
          max-width: 465px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-right: 25px;
          color: #8d95a2;
        }
      }
    }
    .verify {
      position: absolute;
      z-index: 19;
      width: 100%;
      height: 58px;
      padding: 0 15px;
      line-height: 58px;
      background-color: $active-backgroup;
      .goto-verify {
        margin-left: 10px;
        color: $color-theme;
        cursor: pointer;
      }
    }
  }
}

.more-then {
  position: absolute;
  right: 11px;
  bottom: 56px;
  padding: 8px 12px;
  border-radius: 5px;
  box-shadow: 0 2px 10px #ccc;
  background-color: #fff;

  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -7px;
    right: 38px;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-right: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

.complete {
  filter: blur(0);
}
.default-box {
  width: 346px;
  height: 150px;
  padding-top: 75px;
  padding-left: 20px;
  padding-right: 30px;
  word-wrap: break-word;
}
.default-but {
  width: 100%;
  margin-bottom: 10px;
  justify-content: flex-end;
  .delete {
    color: #fff;
    border-radius: 5px;
    background: $color-theme;
    margin-right: 14px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
    height: 34px;
    width: 78px;
  }
}
</style>
