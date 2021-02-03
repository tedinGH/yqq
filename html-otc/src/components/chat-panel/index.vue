<template>
  <div class="chat-panel" :style="{ width: width + 'px'}">
    <header class="pannel-header" >
      <!-- 单聊、系统推送 -->
      <div class="chat-info display-flex" ondragstart="return false"
        v-if="currentSession.fromType == '0' || currentSession.fromType == '2'">
        <div class="user-avatar">
          <img  class="img" :src="global.fileDownUrl + 'compress/'+currentSession.img" v-headError @click.stop="showmemberProfile(currentSession.paramId)" />
          <img class="img" src="../../assets/images/error-head.png"  v-if="currentSession.fromType == 0 && !currentSession.img" @click.stop="showmemberProfile(currentSession.paramId)">
          <!-- <span class="default" v-defaultHead v-if="currentSession.fromType == 0 && !currentSession.img"
            v-html="currentSession.name"  @click.stop="showmemberProfile(currentSession.paramId)" ></span> -->
        </div>
        <div v-if="currentSession.fromType == '0'">
          <p>{{ currentSession.name }}</p>
          <p class="member-number" v-if="(currentSession.describe || friendInfo.sourceDescribe) && currentSession.temp">
            <span class="sub-text" v-if="!otherIsTyping">(
              {{ $t("msg.detail.from") }}：
              {{ currentSession.describe || friendInfo.sourceDescribe | sourceFitler }}
              )</span>
            <!-- 对方正在输入 -->
            <span class="typing-text" v-if="otherIsTyping">
              {{(isTyping.type == 0 ? $t("msg.chatPanel.isTyping"):$t("msg.chatPanel.isTalking"))}}
              <span class="typing-loading">
                <span></span><span></span><span></span>
              </span>
            </span>
          </p>
          <p class="member-number" v-else>
            <span class="online" v-if="friendInfo.imOfflineState == 0 && !otherIsTyping">{{
              $t("msg.chatPanel.online")
            }}</span>
            <span class="sub-text" v-if="friendInfo.imOfflineState == 1 && !otherIsTyping &&friendInfo.imLogoutTime">{{ $t("msg.chatPanel.last")
              }}{{ friendInfo.imLogoutTime | timeFilter }}</span>
            <!-- 对方正在输入 -->
            <span class="typing-text" v-if="otherIsTyping">
              {{(isTyping.type == 0 ? $t("msg.chatPanel.isTyping"):$t("msg.chatPanel.isTalking"))}}
              <span class="typing-loading">
                <span></span><span></span><span></span>
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
        <p class="sub-text" v-if="$i18n.locale == 'en_US'">
          {{goupMemberNum + " " + $t("msg.groupInfo.groupUser")}}
        </p>
        <p class="sub-text" v-else>
          {{ "(" + $t("msg.groupInfo.groupUser") + "：" +goupMemberNum + ")" }}
        </p>
      </div>
      <!-- 菜单栏 -->
      <chat-header ref="chatheader"></chat-header>
    </header>
    <div id="draguplod" @drop="dropArea($event)">
    
      <section class="message-box" id="message-box" :class="{system: currentSession.fromType == '2'}"
        @mousedown="scorllBox()">
        <div v-if="backurl.url!=''&&currentSession.fromType != '2'"
          :class="backurl.isdim=='2'?'back-box isdim':'back-box'">
          <img :src="global.fileDownUrl+'original/'+backurl.url">
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
          <span class="close"  @click.stop="deleteAffiche"></span>
          <p class="name">{{$t("msg.groupInfo.affiche")}}</p>
          <p>
            <span v-html="groupAffiche.bodyContent.affiche"></span>
          </p>
        </div>
        <!-- 群聊邀请审核提示 -->
        <div class="verify" v-if="inviter && inviter.length">
          <span>{{
            inviter[0].operatorName +
              $t("msg.chatPanel.invite") +
              inviter[0].inviterNum +
              $t("msg.chatPanel.userJoin")
          }}</span>
          <span class="goto-verify" @click="$refs.inviter.show(inviter[0])">{{ $t("msg.chatPanel.goToView") }}>>
          </span>
        </div>
        <!-- 群聊和单聊 -->
        <ul class="message-list" ref="list" v-if="currentSession.fromType == '0' || currentSession.fromType == '1'"
          @ps-y-reach-start="loadMore" @ps-y-reach-end="scrollY" v-scrollBar>
          <div class="no-more">
            <span class="text" v-if="scrollFlag == 2">{{ $t("msg.chatPanel.none") }}</span>
          </div>
          <loading v-if="scrollFlag == 1"></loading>
          <li class="history-item clearfix" :id="item.mId" :class="{
              'more-select': showMore,
              active: atId == item.mId ,
              hide:(currentSession.fromType == '0' &&item.mId <friendInfo.firstMsgId) ||(currentSession.fromType == '1' &&  item.mId <lastGroupMsg.firstMsgId) }" 
              v-for="(item, index) in chatHistory" :key="item.mId">
              <!-- <div>{{item}}</div> -->
            <div class="no-more" v-if="item.mId == (mewMsgId+1) && goto == 'top'">
              <span class="text">{{ $t("msg.chatPanel.latestMessage") }}</span>
            </div>
            <div class="tips-bg" v-if="item.noChatInfo" ondragstart="return false">
              <!-- 红包提示、转账提示、音视频提示 -->
              <span class="text"
                v-if="item.bodyType == '6' || item.bodyType == '8' || item.bodyType == '38'">{{ item.msgContent }}</span>
                <span class="text" v-else-if="item.bodyType == '57'">{{$t("msg.common.service")}}</span>
              <!-- 群通知提示、好友请求、消息被拒收、撤回 -->
              <span class="text" v-else v-html="item.preview"></span>
            </div>
            <!-- 消息 -->
            <div class="history-content" :class="{ self: userId == item.bodyFrom }" v-else>
              <span class="select" :class="{ active: item.checked }"></span>
              <span class="selectArea" v-show="showMore" @click="historySelect(item)"></span>
              <!-- 日期 -->
              <div class="tips-bg" v-if="item.showTime" ondragstart="return false">
                <span class="text">{{ item.bodyTime | timeFilter2 }}</span>
              </div>
              <div class="msg-content clearfix">
                <!-- 群聊头像 -->
                <div class="avatar" v-if="currentSession.fromType == '1' && userId != item.bodyFrom"
                  @click.stop="showmemberProfile(item.bodyFrom)" :data-index="
                    `{%type%:%avatar%,%uId%:${item.bodyFrom},%gId%:${currentSession.paramId}}`
                  "
                >
                  <img class="img" ondragstart="return false"  :src="global.fileDownUrl + 'compress/' +item.chatInfo.headImg" v-headError />
                  <span :class="{manager: item.chatInfo.isAdmin == 2, owner: item.chatInfo.isAdmin == 1}"></span>
                </div>
                <!-- 文字信息  链接信息 -->
                <div class="msg-detail"
                  ondragstart="return false"
                  :data-index="`{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                  v-if="item.bodyType == '1' || item.bodyType == '13' || item.bodyType == '49'"
                    :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div
                    class="name"
                    :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}"
                    v-if="userId != item.bodyFrom && currentSession.isShowMemberNick == '1'" v-nikename="item.chatInfo.userId" v-html="item.chatInfo.nickName">
                  </div>
                  <p v-text="item.msgContent" v-to-face @click="interceptor($event, item)" ></p>
                  <div class="msg-status display-flex">
                    <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read: item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!--  @信息 -->
                <div class="msg-detail"
                  ondragstart="return false"
                  :data-index="`{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                  v-if="item.bodyType == '24'"
                    :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div
                    class="name"
                    :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}"
                    v-if="userId != item.bodyFrom && currentSession.isShowMemberNick == '1'"  v-nikename="item.chatInfo.userId" v-html="item.chatInfo.nickName"
                  >
                  </div>
                    <!-- <p>{{item}}</p> -->
                  <p v-text="item.msgContent" v-to-face  @click="interceptor($event, item)"></p>
                  <div class="msg-status display-flex">
                    <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read: item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 自定义表情 -->
                <div
                  class="msg-detail msg-img"
                  ondragstart="return false;"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  v-imagePreview
                  v-if="item.bodyType == '2'"
                >
                  <img
                    height="130"
                    width="130"
                    :src="global.fileDownUrl + 'compress/' + item.msgContent.bqUrl"
                  />
                  <div
                    class="msg-status display-flex"
                    :class="{
                      hide:!item.readNum ||
                        userId != item.bodyFrom
                    }"
                  >
                    <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 图片 -->
                <div
                  class="msg-detail msg-img"
                  ondragstart="return false;"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  :style="{
                    width:
                      item.msgContent.imgWidth > 254 ||
                      item.msgContent.imgHeigh > 142
                        ? item.msgContent.imgWidth / item.msgContent.imgHeigh >
                          254 / 142
                          ? 254 + 'px'
                          : (item.msgContent.imgWidth /
                              item.msgContent.imgHeigh) *
                              142 +
                            'px'
                        : item.msgContent.imgWidth + 'px',
                    height:
                      item.msgContent.imgWidth > 254 ||
                      item.msgContent.imgHeigh > 142
                        ? item.msgContent.imgWidth / item.msgContent.imgHeigh <
                          254 / 142
                          ? 142 + 'px'
                          : (item.msgContent.imgHeigh /
                              item.msgContent.imgWidth) *
                              254 +
                            'px'
                        : item.msgContent.imgHeigh + 'px'
                  }"
                  v-imagePreview
                  v-if="item.bodyType == '3'"
                >
                <!-- class="img thumbnails"   请勿随意修改此属性值，修改时，请同步修改chat-panel.js中的loadOriginalImg方法对应值 -->
                  <img
                    class="img thumbnails"
                    ondragstart="return false" 
                    :data-idx="index"
                    :src="item.msgContent.imgUrl?(item.msgContent.imgUrl.indexOf('data:')<0?global.fileDownUrl + 'low/' + item.msgContent.imgUrl:item.msgContent.imgUrl):''"
                    v-viewer="item.mId"
                    @load="loadOriginalImg($event,item.msgContent.imgUrl)"
                  />
                  <div
                    class="msg-status display-flex"
                    :class="{
                      hide:!item.readNum>0 ||
                        userId != item.bodyFrom
                    }"
                  >
                    <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 语音 -->
                <div
                  class="msg-detail voice"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                  v-if="item.bodyType == '4'"
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div class="voice-pannel">
                    <div class="voice-left">
                      <i class="icon-play" @click.stop="voicePlay(item, index)" :class="{ active: item.msgContent.isPlaying }"></i>
                    </div>
                    <div class="voice-right">
                      <div class="voice-progress">
                        <span class="open-progress" :style="{ width:pxNum(item.msgContent.proNum,item.msgContent.duration)}"></span>
                        <span class="poyt" :style="{left:pxNum(item.msgContent.proNum,item.msgContent.duration)}"></span>
                        <!-- <span class="unread-progress"
                          v-if="!item.msgContent.isPlay && userId != item.bodyFrom"
                        ></span> -->
                      </div>
                      <div class="voice-detail">
                        <span class="duration">{{item.msgContent.duration}}"</span>
                        <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                      </div>
                    </div>
                    <span
                      class="voice-unread"
                      v-if="!item.msgContent.isPlay && userId != item.bodyFrom"
                    ></span>
                  </div>
                </div>
                <!-- 视频 -->
                <div
                  class="msg-detail msg-video"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  :style="{
                    width:
                      item.msgContent.imgWidth > 254 ||
                      item.msgContent.imgHeigh > 142
                        ? item.msgContent.imgWidth / item.msgContent.imgHeigh >
                          254 / 142
                          ? 254 + 'px'
                          : (item.msgContent.imgWidth /
                              item.msgContent.imgHeigh) *
                              142 +
                            'px'
                        : item.msgContent.imgWidth + 'px',
                    height:
                      item.msgContent.imgWidth > 254 ||
                      item.msgContent.imgHeigh > 142
                        ? item.msgContent.imgWidth / item.msgContent.imgHeigh <
                          254 / 142
                          ? 142 + 'px'
                          : (item.msgContent.imgHeigh /
                              item.msgContent.imgWidth) *
                              254 +
                            'px'
                        : item.msgContent.imgHeigh + 'px'
                  }"
                  v-videoError
                  v-if="item.bodyType == '5'"
                >
                  <img
                    class="img"
                    ondragstart="return false" 
                    :src="global.fileDownUrl + 'compress/' + item.msgContent.videoUrl + '.png'"
                    :data-idx="index"
                    v-viewer="item.mId"
                  />
                  <div
                    class="msg-status display-flex"
                    :class="{ hide: userId != item.bodyFrom }"
                  >
                    <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 文件 -->
                <div
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                  class="msg-file display-flex"
                  ondragstart="return false"
                  @mouseenter="mouseEnter($event, item.msgContent)"
                  @mouseleave="qrCode.show = false"
                  :data-index="`{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                  v-if="item.bodyType == '18'"
                >
                  <div
                    class="file-icon"
                    :class="item.msgContent.name | fileFitler"
                  ></div>
                  <div class="file-info display-flex-item">
                    <p class="title">{{ item.msgContent.name | fileName(15) }}</p>
                    <div class="size display-flex">
                      <span v-if="item.msgContent.progress == 100 || (item.loading == 2 && item.msgContent.progress == 500)">{{
                        item.msgContent.size | fileSize
                      }}</span>
                      <div
                        class="progress-bar"
                        v-if="item.msgContent.progress < 100"
                      >
                        <span
                          class="bar"
                          :style="{ width: item.msgContent.progress + '%' }"
                        ></span>
                      </div>
                      <span v-if="item.msgContent.progress < 100"
                        >{{
                          item.msgContent.progress > 0
                            ? item.msgContent.progress
                            : 0
                        }}%</span
                      >
                      <a
                        class="download display-flex-item"
                        v-if="item.msgContent.progress == 100"
                        :href="global.fileDownUrl + 'html/download1.html#'+item.msgContent.dl64"
                        target="_blank"
                        :alt="item.msgContent.name"
                        >{{ $t("msg.common.download") }}</a
                      >
                    </div>
                    <div class="msg-status display-flex">
                      <span
                        class="uploading flex-item-nowrap"
                        v-if="item.msgContent.progress == -1"
                        >{{ $t("msg.chatPanel.wait") }}</span
                      >
                      <span
                        class="uploading display-flex-item"
                        v-if="item.loading == 2 && item.msgContent.progress == 500"
                        >{{ $t("msg.chatPanel.network") }}</span
                      >
                      <span
                        class="cannel display-flex-item"
                        v-if="
                          item.msgContent.progress >= 0 &&
                            item.msgContent.progress < 100
                        "
                        @click="cancelUpload(item)"
                        href="javascript:;"
                        >{{ $t("msg.common.cancel") }}</span
                      >
                      <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                      <span
                        class="send"
                        :class="{
                          loading: item.loading == 0 || item.msgContent.progress < 100,
                          read:item.readNum>0,
                          fail: item.loading == 2,
                          fail: item.loading == 3,
                        }"
                        @click="reSend(item)"
                      ></span>
                    </div>
                  </div>
                </div>
                <!-- 编辑 -->
                <div
                  class="msg-detail"
                   ondragstart="return false"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  v-if="
                    item.bodyType == '28' &&
                      item.mId == item.msgContent.mId &&
                      item.msgContent.editType != 30
                  "
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div v-text="item.msgContent.content" v-to-face  @click="interceptor($event, item)"></div>
                  <div class="msg-status display-flex">
                    <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <div
                  class="msg-detail replied"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  v-if="
                    item.bodyType == '28' &&
                      item.mId == item.msgContent.mId &&
                      item.msgContent.editType == 30
                  "
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                  @click="goFocus(item.msgContent.content.repliedId)"
                >
                  <div class="replied-name">{{ item.msgContent.content.repliedName }}：</div>
                  <div
                    class="replied-text"
                    v-if="
                      item.msgContent.content.msgType != 2 &&
                        item.msgContent.content.msgType != 3 &&
                        item.msgContent.content.msgType != 5
                    "
                    v-text="item.msgContent.content.repliedContent"
                    v-to-face
                  ></div>
                  <div
                    v-if="
                      item.msgContent.content.msgType == 2 ||
                        item.msgContent.content.msgType == 3
                    "
                  >
                    <img
                      class="img"
                      :src="
                        global.fileDownUrl +
                          'compress/' +
                          item.msgContent.content.repliedContent
                      "
                      v-imagePreview
                      ondragstart="return false" 
                    />
                  </div>
                  <div
                    v-if="item.msgContent.content.msgType == 5"
                    class="reply-video position "
                  >
                  
                    <img
                      class="img"
                      :src="
                        global.fileDownUrl +
                          'compress/' +
                          item.msgContent.content.repliedContent
                      "
                      v-videoError
                      ondragstart="return false" 
                    />
                  </div>
                  <div
                    class="reply-content"
                    v-html="item.msgContent.content.content"
                    v-to-face
                  ></div>
                  <div class="msg-status display-flex">
                    <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 30人以上群聊 -->
                <div
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                  class="msg-detail group-invite display-flex"
                  @click="groupInvite(item)"
                  :data-index="`{%type%:%message%,%mid%:${item.mId}}`"
                  v-if="item.bodyType == '29'"
                >
                  <div class="display-flex-item">
                    <p class="title">{{ $t("msg.chatPanel.inviteJoin") }}</p>
                    <p class="text">{{ item.preview }}</p>
                    <p class="text display-flex-item">
                      {{ $t("msg.chatPanel.detail") }}
                    </p>
                  </div>
                  <div>
                    <img
                      class="img"
                      v-if="item.msgContent.gAvatar"
                      ondragstart="return false" 
                      :src="global.fileDownUrl + 'compress/' + item.msgContent.gAvatar"
                      v-headErrors
                    />
                    <img class="person-avatar" src="../../assets/images/error-head.png"  v-if="!item.msgContent.gAvatar">
                    <!-- <span
                    class="default"
                    v-defaultHead
                    v-if="!item.msgContent.gAvatar" v-html="item.msgContent.gName"
                    ></span> -->
                    <div class="msg-status display-flex">
                      <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                      <span
                        class="send"
                        :class="{
                          loading: item.loading == 0,
                          read:item.readNum>0,
                          fail: item.loading == 2,
                          fail: item.loading == 3,
                        }"
                        @click="reSend(item)"
                      ></span>
                    </div>
                  </div>
                </div>
                <!-- 回复 -->
                <div
                  ondragstart="return false;"
                  class="msg-detail replied"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  v-if="item.bodyType == '30'"
                  @click="goFocus(item.msgContent.repliedId)"
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div class="position">
                    <div class="replied-name">{{ item.msgContent.repliedName }}：</div>
                    <div
                      @click="interceptor($event, item)"
                      class="replied-text"
                      v-if="
                        item.msgContent.msgType != 2 &&
                          item.msgContent.msgType != 3 &&
                          item.msgContent.msgType != 5
                      "
                      :title="item.msgContent.repliedContent"
                      v-to-face 
                      v-text="item.msgContent.repliedContent"
                    ></div>
                    <div
                      class="replied-img"
                      v-if="
                        item.msgContent.msgType == 2 ||
                          item.msgContent.msgType == 3
                      "
                    >
                      <img
                        class="img"
                        ondragstart="return false" 
                        :src="global.fileDownUrl + 'compress/' + item.msgContent.repliedContent"
                        v-imagePreview
                        v-imageI
                      />
                    </div>
                    <div v-if="item.msgContent.msgType == 5" class="reply-video">
                      <img
                        class="img"
                        ondragstart="return false" 
                        :src="global.fileDownUrl + 'compress/' + item.msgContent.repliedContent+'.png'"
                        v-imageV
                      />
                    </div>
                    <div
                      class="reply-content"
                      v-text="item.msgContent.content"
                      v-to-face
                      @click="interceptor($event, item)"
                    ></div>
                  </div>
                  <div class="msg-status display-flex">
                    <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 名片 -->
                <div
                  class="msg-card"
                  :data-index="
                    `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`
                  "
                  @click.stop="showmemberProfile(item.msgContent.userId)"
                  v-if="item.bodyType == '32'"
                  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                >
                  <div class="person-title">{{ $t("msg.common.card") }}</div>
                  <div class="person-content">
                    <img
                      class="person-avatar"
                      :src="global.fileDownUrl + 'compress/' + item.msgContent.avatar"
                      v-headError
                    />
                    <!-- <span class="default" v-defaultHead v-if="!item.msgContent.avatar">{{
                      item.msgContent.nickName
                    }}</span> -->
                    <img class="person-avatar" src="../../assets/images/error-head.png"  v-if="!item.msgContent.avatar">
                    <div class="name-id">
                        <span
                        class="person-name"
                        v-text="item.msgContent.nickName"
                      ></span>
                      <span class="person-id" v-if="item.msgContent.alias">
                      @{{ item.msgContent.alias }}
                      </span>
                    </div>
                  </div>
                  <div
                    class="person-remark"
                    v-if="item.msgContent.remark && item.msgContent.remark.length"
                    v-text="item.msgContent.remark"
                  ></div>
                  <div class="msg-status display-flex">
                    <span class="time">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read:item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 公告 -->
                <div class="msg-affiche" 
                  :data-index="`{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                    v-if="item.bodyType == '47'"
                    :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                  >
                  <div class="affiche-title"><i></i>{{ $t("msg.groupInfo.affiche") }}</div>
                  <div class="affiche-content">
                    <p v-html="item.msgContent.affiche"></p>
                  </div>
                  
                  <div class="msg-status display-flex">
                    <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                    <span
                      class="send"
                      :class="{
                        loading: item.loading == 0,
                        read: item.readNum>0,
                        fail: item.loading == 2,
                        fail: item.loading == 3,
                      }"
                      @click="reSend(item)"
                    ></span>
                  </div>
                </div>
                <!-- 聊天记录 -->
                <div
                    class="msg-detail chat-list"
                    :data-index=" `{%type%:%message%,%mid%:${item.mId},%msgType%:${item.bodyType}}`"
                    @click=" openRecord(item.msgContent)"
                    v-if="item.bodyType == '51'"  :style="{'background':userId == item.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
                  >
                  <!-- <span>{{item}}</span> -->
                  <div v-if="item.msgContent.chatUsers.length==1"  class="title">
                    <div v-if="$i18n.locale == 'zh_CN'">来自"{{item.msgContent.chatUsers[0]}}"群的聊天记录</div>
                    <div v-else-if="$i18n.locale == 'my'">"{{item.msgContent.chatUsers[0]}}"ဂရု(ပ်)၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
                    <div v-else>From the chat history of "{{item.msgContent.chatUsers[0]}}"</div>
                  </div>
                  <div v-else class="title">
                    <div v-if="$i18n.locale == 'zh_CN'">来自"{{item.msgContent.chatUsers[0]}}"和"{{item.msgContent.chatUsers[1]}}"的聊天记录</div>
                    <div v-else-if="$i18n.locale == 'my'">"{{item.msgContent.chatUsers[0]}}" နှင့် "{{item.msgContent.chatUsers[1]}}" တို့၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
                    <div v-else>From the chat history of "{{item.msgContent.chatUsers[0]}}" and "{{item.msgContent.chatUsers[1]}}"</div>
                  </div>
                  <li class="list" v-for="(i,idx) in item.msgContent.contents" :key='idx'>
                    <div  v-if="idx<=2" class="list-item">
                    {{i.nickName}}: 
                      <span v-if="i.msgType==1||i.msgType==28||i.msgType==30||i.msgType==13">{{i.message}}</span>
                      <span v-if="i.msgType==2">[{{ $t("msg.common.emoji") }}]</span>
                      <span v-if="i.msgType==3">[{{ $t("msg.common.image") }}]</span>
                      <span v-if="i.msgType==5">[{{ $t("msg.common.video") }}]</span>
                      <span v-if="i.msgType==18">[{{ $t("msg.common.file") }}]</span>
                      <span v-if="i.msgType==51">[{{ $t("msg.common.chatRecord") }}]</span>
                      <span v-if="i.msgType==24" v-to-face v-text="i.message"></span>
                    </div>
                  </li>
                  <span class="list-p" v-if="item.msgContent.contents.length>3">...</span>
                  <!-- <span>{{item.msgContent}}</span> -->
                  <div class="msg-status display-flex">
                      <span class="time" :style="{'color':(myself&&userId == item.bodyFrom)||(!myself&&userId != item.bodyFrom)?'#607280':'#607280'}">{{ item.bodyTime | timeFilter1 }}</span>
                      <span
                        class="send"
                        :class="{
                          loading: item.loading == 0,
                          read: item.readNum>0,
                          fail: item.loading == 2,
                          fail: item.loading == 3,
                        }"
                        @click="reSend(item)"
                      ></span>
                    </div>
                </div>
                <div class="icon-edit" v-if="item.bodyType == '28'"></div>
              </div>
              <group-readed
                v-if="
                  currentSession.fromType == '1' &&
                    lastGroupMsg.msgId == item.mId &&
                    lastGroupMsg.readNum > 0
                "
              ></group-readed>
            </div>
          </li>
          <li v-show="showMore" style="height:66px;"></li>
        </ul>
        <!-- 系统推送信息 -->
        <ul
          class="message-list"
          ref="list"
          v-if="currentSession.fromType == '2'"
          @ps-y-reach-start="loadMore"
          v-scrollBar
        >
          <li class="history-item" v-for="item in chatHistory" :key="item.mId" :id="item.mId">
            <div class="push" v-if="item.bodyType == 45">
              <div class="push-header display-flex">
                <span class="title">{{item.bodyContent.title}}</span>
                <span class="time">{{ item.bodyTime | timeFilter }}</span>
              </div>
              <div>{{item.bodyContent.content}}</div>
            </div>
            <!-- 投诉 -->
            <div class="push" v-else-if="item.bodyType == 33">
              <!-- <span>{{item}}</span> -->
              <div class="push-header display-flex">
                <span class="title" v-if="item.bodyContent.type==0">{{$t('msg.complaint.submitted')}}</span>
                <span class="title" v-if="item.bodyContent.type==1">{{$t('msg.complaint.success')}}</span>
                <span class="title" v-if="item.bodyContent.type==-1">{{$t('msg.complaint.unsuccess')}}</span>
                <span class="title" v-if="item.bodyContent.type==2">{{$t('msg.complaint.Warningnotice')}}</span>
                <span class="title" v-if="item.bodyContent.type==3">{{$t('msg.complaint.Violationof')}}</span>
                <span class="title" v-if="item.bodyContent.type==4">{{$t('msg.complaint.Bannednotice')}}</span>
                <span class="title" v-if="item.bodyContent.type==5">{{$t('msg.complaint.Accountnotice')}}</span>
                <span class="time">{{ item.bodyTime | timeFilter }}</span>
              </div>
              <div class="push-content">
                <div v-if="item.bodyContent.type == 0||item.bodyContent.type== 1||item.bodyContent.type== -1">{{$t('msg.complaint.object')}}{{item.bodyContent.nickName}}</div>
                <div>{{$t('msg.complaint.number')}}{{item.bodyContent.complaintCode}}</div>
                <div v-if="item.bodyContent.type!=0">{{$t('msg.complaint.results')}}{{item.bodyContent.auditResult}}</div>
                <div v-if="item.bodyContent.type!=0">{{$t('msg.complaint.method')}}
                  <span v-if="item.bodyContent.treatment== 0">{{$t('msg.complaint.notprocessed')}}</span>
                  <span v-if="item.bodyContent.treatment== 1">{{$t('msg.complaint.Title')}}</span>
                  <span v-if="item.bodyContent.treatment== 2">{{$t('msg.complaint.Accountfreeze')}}</span>
                  <span v-if="item.bodyContent.treatment== 3">{{$t('msg.complaint.Warning')}}</span>
                  <span v-if="item.bodyContent.treatment== 4">{{$t('msg.complaint.Deduction')}}</span>
                </div> 
              </div>
              <div class="push-text" v-if="item.bodyContent.type== 0">{{$t('msg.complaint.subText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== 1">{{$t('msg.complaint.succText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== -1">{{$t('msg.complaint.unText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== 2">{{$t('msg.complaint.WarningText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== 3">{{$t('msg.complaint.ViolationText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== 4">{{$t('msg.complaint.BannedText')}}</div>
              <div class="push-text" v-if="item.bodyContent.type== 5">{{$t('msg.complaint.AccountText')}}</div>
            </div>
          <!-- 安全验证 -->
            <div class="push" v-else-if="item.bodyType == 53">
              <!-- <div>{{item}}</div> -->
              <div class="push-header display-flex">
                <span class="title" v-if="item.bodyContent.type==10004">{{$t('msg.complaint.Loginverification')}}</span>
                <span class="title" v-else>{{$t('msg.complaint.Accountsecurity')}}</span>
                <span class="time">{{ item.bodyTime | timeFilter }}</span>
              </div>
              <div v-if="item.bodyContent.type==10004">{{$t('msg.complaint.Code')}}{{item.bodyContent.code}}</div>
              <div>
                <span class="push-text" v-if="item.bodyContent.type==10004" v-html="$t('msg.complaint.text10004')"></span>
                <span class="push-text" v-if="item.bodyContent.type==10017">{{$t('msg.complaint.text10017')}}</span>
                <span class="push-text" v-if="item.bodyContent.type==10001">{{$t('msg.complaint.text10001')}}</span>
                <span class="push-text" v-if="item.bodyContent.type==10018">{{$t('msg.complaint.text10018')}}</span>
                <span class="push-text" v-if="item.bodyContent.type==10007">{{$t('msg.complaint.text10007')}}</span>
              </div>
            </div>
            <!-- 安全通知 -->
            <div class="push" v-else-if="item.bodyType == 54">
              <!-- <div>{{item}}</div> -->
              <div class="push-header display-flex">
                <span class="title" v-if="item.bodyContent.type==10010">{{$t('msg.complaint.Psdchange')}}</span>
                <span class="title" v-if="item.bodyContent.type==10017||item.bodyContent.type==17">{{$t('msg.complaint.Accountsuccess')}}</span>
                <span class="title" v-if="item.bodyContent.type==10018||item.bodyContent.type==18">{{$t('msg.complaint.Accountunsuccess')}}</span>
                <span class="title" v-if="item.bodyContent.type==10006">{{$t('msg.complaint.phonechanged')}}</span>
                <span class="time">{{ item.bodyTime | timeFilter }}</span>
              </div>
              <div class="information">
                <span v-if="item.bodyContent.type==10010">{{$t('msg.complaint.psdchangeText')}}</span>
                <span v-if="item.bodyContent.type==10017">{{$t('msg.complaint.AccountsucText')}}</span>
                <span v-if="item.bodyContent.type==10018">{{$t('msg.complaint.AccountunText')}}</span>
                <span v-if="item.bodyContent.type==17">{{$t('msg.complaint.systemsucText')}}</span>
                <span v-if="item.bodyContent.type==18">{{$t('msg.complaint.systemunText')}}</span>
                <span v-if="item.bodyContent.type==10006">{{$t('msg.complaint.phonechangedText')}}{{item.bodyContent.accountCode}}</span>
              </div>
              <div v-if="item.bodyContent.type==10017||item.bodyContent.type==10018||item.bodyContent.type==10010">
                {{$t('msg.complaint.Account')}}{{item.bodyContent.accountCode}}
              </div>
              <div  v-if="item.bodyContent.type==10017||item.bodyContent.type==10018||item.bodyContent.type==10010||item.bodyContent.type==10006">
                {{$t('msg.complaint.Device')}}{{item.bodyContent.device}}
              </div>
              <div  v-if="item.bodyContent.type==10017||item.bodyContent.type==10018||item.bodyContent.type==10010||item.bodyContent.type==10006">
                {{$t('msg.complaint.IP')}}{{item.bodyContent.IP}}
              </div>
              <div>
                {{$t('msg.complaint.time')}}{{item.bodyContent.time | timeFilter3}}
              </div>
            </div>
            <div class="push"  v-else>
              <span v-html="item.bodyType" ></span>
              <div class="msg-status display-flex">
                <span class="time">{{ item.bodyTime | timeFilter }}</span>
              </div>
            </div>
          </li>
        </ul>
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
          <div class="input-placeholder" v-if="editFocus">
            {{ $t("msg.chatPanel.say") }}
          </div>
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
        <div class="more-then" v-if="moreThan">
          {{ $t("msg.chatPanel.moreThan") }}
        </div>
        <emoji ref="emoji"></emoji>
        <!-- 发送按钮 -->
        <send-button  @send="sendMsg"></send-button>
        <!-- @列表 -->
      </div>
    
    <!-- 多选 -->
    <div class="message-more display-flex" v-if="showMore">
      <i @click="showMore = false"></i>
      <div class="forward-more" >
        <div class="img-forward" :class="{ disable: forwardStatus }" @click="showForward"></div>
        <p>{{ $t("msg.menu.forward") }}</p>
      </div>
      <div class="delete-more">
        <div class="img-delete" :class="{ disable: deleteStatues }" @click="showDelete"></div>
        <p>{{ $t("msg.menu.delete") }}</p>
      </div>
    </div>
    <!-- 禁言状态 -->
    <div
      class="message-input"
      :class="{ forbidden: forbiddenWord > 0 }"
      v-if="forbiddenWord > 0"
    >
      <span v-if="forbiddenWord == 1">{{ $t("msg.chatPanel.allMute") }}</span>
      <span v-else-if="forbiddenWord == 2">{{$t("msg.chatPanel.managerMute")}}</span>
      <span v-else-if="forbiddenWord == 3">{{$t("msg.chatPanel.privateMute")}}</span>
    </div>
  </div>
    <!-- 转发选择 -->
    <Popup :hideHeader='true' :hide-close="true" :radius="'8'" v-if="forwordSelect" :ifclose="true">
      <div class="Select" @click.stop="" slot="body">
        <div @click="goforList" class="check"><span class="select"  :class="{active:forwordState==1}"></span>{{$t("msg.forward.history")}}</div>
        <div @click="goforNew" class="check"><span class="select" :class="{active:forwordState==2}"></span>{{$t("msg.forward.messages")}}</div>
      </div>
    </Popup>
    <!-- 超过100 -->
    <Popup :hideHeader='true' v-if="exceed" :hide-close="true">
      <div @click.stop="" slot="body">
        <div class="default-box">
         <p>{{ $t("msg.forward.exceed")}}</p> 
        </div>
        <div class="default-but display-flex">
          <div class="two-btn delete" @click="exceed = false;forwordSelect=false">
            {{ $t("msg.common.ensure") }}
          </div>
        </div>
      </div>
    </Popup>
    <friend-information v-if="layout.module == 'fd-inf' && layout.child == 'fi'"></friend-information>
    <group-information ref="groupInformation" v-if="layout.module == 'gp-inf' && (layout.child == 'gi' || layout.child == 'mr')"></group-information>
    <!-- <message-operation ref="operation"></message-operation> -->
    <file-popup ref="sendFile" :fileInfo="dropFileInfo"></file-popup>
    <picture-popup ref="sendPicture"  :imgInfo="pasteImage"></picture-popup>
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
  .Select{
    width: 300px;
    height: 120px;
    display: flex;
    font-size: 14px;
    // padding: 25px 0;
    flex-direction:column;
    justify-content:center;
    .check{
      padding-left: 30px;
      height:50px;
      display: flex;
      align-items:center;
      color: #5F717F;
      cursor: pointer;
      &:hover{
        background: $active-backgroup;
      }
      .select{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background: url(../../assets/images/icon/select.png);
        &.active{
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
        position:relative;
        width: 46px;
        height: 46px;
        margin-right: 16px;
        .default{
          position:absolute;
          top:0;left:0;
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
      .typing-text{
        font-size: 14px;
        color:$color-theme;
        .typing-loading{
          height: 6px;
          span{
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-right: 5px;
            margin-bottom: 2px;
            border-radius: 50%;
            background: $color-theme;
            -webkit-animation: load 1.3s ease infinite;
          }
          @-webkit-keyframes load{
            0%{
              opacity: 1;
            }
            100%{
              opacity: .4;
            }
          }
          span:nth-child(1){
            -webkit-animation-delay: .3s;
          }
          span:nth-child(2){
            -webkit-animation-delay: .5s;
          }
          span:nth-child(3){
            -webkit-animation-delay: .7s;
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
  #draguplod{
    width: 100%;
    height: 606px;
  }
  .draguplod{
    position: absolute;
    top:67px;
    width: 100%;
    height: 606px;
    background:rgba(255,255,255,0.85);
    z-index: 10;
    div{
      width: 100%;
      height:100%;
      text-align: center;
      line-height:571px;
      border:3px dashed #999
    }
  }
  .message-box {
    position: relative;
    width: 100%;
    height: 606px;
    // border-left: 1px solid $border-color;
    .back-box{
      width: 100%;
      height: 606px;
      position: absolute;
      img{
      width: 100%;
      height: 606px;
      }
      &.isdim{
        -webkit-filter: blur(4px);
        -moz-filter: blur(4px);
        -o-filter: blur(4px);
        -ms-filter: blur(4px);
        filter: blur(4px);
        opacity:0.6;
      }
    }
    .message-list {
      position: relative;
      height: 606px;
      width: 100%;
      &.more{
        padding-bottom:66px;
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
    }
    .message-goto {
      z-index: 20;
      position: absolute;
      top: 430px;
      right: 0px;
      cursor: pointer;
      &.at {
        top: 385px;
        .goto-box{
          .goto-icon{
          width: 32px;
          left: 10px;
          top:4px;
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
          top:4px;
          height: 32px;
          background: url(../../assets/images/chat/goto.png);
        }
        .goto-text {
          display: inline-block;
          position: absolute;
          top:4px;
          left: 32px;
          line-height: 18px;
          text-align: center;
          width: 28px;
          height: 18px;
          color: #fff;
          background: #ED6C67;
          border-radius: 9px;
        }
        .goto-close {
          display: block;
          position: absolute;
          top: 7px;
          right: 10px;
          width: 24px;
          height: 24px;
          background: url(../../assets/images/icon/close3.png) center
          center no-repeat;
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
    .affiche{
      position: absolute;
      z-index: 19;
      width: 691px;
      height: 60px;
      padding: 0 15px;
      line-height: 58px;
      background-color: #fff;
      padding-left:64px;
      margin-left: 20px;
      box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
      
      border-radius: 8px;
      cursor:pointer;
      .close{
        display:inline-block;
        position:absolute;
        right:16px;top:18px;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-image: url(../../assets/images/icon/close3.png);
        cursor:pointer;
      }
      i{
        display:inline-block;
        position:absolute;
        left:16px;top:12px;
        height:33px;width:33px;
        margin-right:10px;
        vertical-align: middle;
        background-size: 100% 100%;
        background-image: url(../../assets/images/icon/affiche.png);
      }
      p{
        line-height:21px;
        font-size:14px;
        &.name{
          margin-top:8px;
          font-size:12px;
          color:$title-color
        }
        span{
          display:inline-block;
          width:auto;
          max-width:465px;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow:hidden;
          margin-right:25px;
          color: #8D95A2;
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
    &.system {
      height: 678px;
      background-color: #f2f2f2;
      .message-list {
        height: 678px;
        padding: 20px 15px 0 15px;
      }
      .pay-item {
        width: 270px;
        height: 170px;
        margin: 15px auto;
        background: #fff;
        border-radius: 4px;

        .pay-item-head {
          padding: 5px 10px;
          line-height: 33px;
          font-size: 13px;
          .pay-right {
            float: right;
            font-size: 14px;
            color: #fea405;
          }
          .img {
            height: 33px;
            width: 33px;
            padding-right: 3px;
            border-radius: 50%;
            vertical-align: text-bottom;
          }
          span.head-name {
            display: inline-block;
            width: 150px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .pay-item-content {
          text-align: center;
          font-size: 13px;
          color: #bbb;
          h4 {
            font-size: 17px;
            padding: 20px 0;
            span {
              color: #000;
            }
          }
          .pay-detail {
            position: relative;
            height: 40px;
            margin: 0 10px;
            border-top: 1px solid #bbb;
            line-height: 40px;
            font-size: 14px;
            text-align: left;
            .arrow-right {
              position: absolute;
              top: 50%;
              right: -2px;
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-top: -8px;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url(../../assets/images/chat/icon-arrow-right.png);
            }
          }
        }
      }
      .push {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 15px;
        padding: 15px 20px;
        border-radius: 20px;
        border: 1px solid $border-color;
        font-size: 14px;
        line-height: 30px;
        background-color: #fff;
        color: #122030;
        .push-header {
          justify-content: space-between;
          color: #122030;
          .time {
            color: #838287;
          }
        }
        .push-content{
          padding-bottom: 20px;
          border-bottom: 1px solid #E1E6EC;
          margin-bottom: 20px;
        }
        .push-text{
          line-height: 24px;
        }
        .title {
          font-size: 16px;
          padding-bottom: 8px;
        }
      }
    }
  }
  .message-more {
    z-index: 110;
    position: absolute;
    left: 20px;
    bottom: 10px;
    width: 692px;
    height: 120px;
    background: #ECF7F6;
    border: 1px solid #DBEFEB;
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
    bottom:0px;
    width: 100%;
    height: auto;
    min-height: 72px;
    max-height: 145px;
    z-index: 11;
    // border-top: 1px solid $border-color;
    background: #fff;
    padding: 30px 0 20px 0;
    .icon-image {
    position:absolute;
    bottom:16px;
    left: 22px;
    display: inline-block;
    width: 34px;
    height: 34px;
    cursor: pointer;
    background:url(../../assets/images/chat/up1.png);
    &:hover {
      background:url(../../assets/images/chat/up2.png);
    }
    .lable{
    display: block;
    width: 34px;
    height: 34px;
    }
  }
    .input-area {
      position: relative;
      left:65px;
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
}

.more-select {
  .history-content {
    padding-left: 45px;
    .select {
      display: block;
    }
  }
}
.group-invite{
  .default{
    display: block;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    margin-left: 10px;
    text-align: center;
    line-height: 75px;
    font-size: 26px;
    color: #fff;
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
.thumbnails{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    filter: blur(4px);
    transition: all 0.2s;
}
.complete{
    filter: blur(0);
}
.default-box{
  width: 346px;
  height: 150px;
  padding-top: 75px;
  padding-left: 20px;
  padding-right: 30px;
  word-wrap:break-word; 
}
  .default-but {
      width: 100%;
      margin-bottom: 10px;
      justify-content: flex-end;
      .delete {
        color:#fff;
        border-radius: 5px;
        background: $color-theme;
        margin-right: 14px;
        text-align: center;
        line-height: 34px ;
        cursor: pointer;
        height: 34px;
        width: 78px;
      }
  }
</style>
