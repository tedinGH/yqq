<template>
  <div>
    <div
      class="history-item clearfix"
      :id="source.mId"
      :class="{
              'more-select': showMore,
              active: atId == source.mId ,
              hide:(currentSession.fromType == '0' &&source.mId <friendInfo.firstMsgId) ||(currentSession.fromType == '1' &&  source.mId <lastGroupMsg.firstMsgId) }"
      :key="source.mId"
    >
      <!-- <div>{{item}}</div> -->
      <div class="no-more" v-if="source.mId == (mewMsgId+1) && goto == 'top'">
        <span class="text">{{ $t("msg.chatPanel.latestMessage") }}</span>
      </div>
      <div class="tips-bg" v-if="source.noChatInfo" ondragstart="return false">
        <!-- 红包提示、转账提示、音视频提示 -->
        <span
          class="text"
          v-if="source.bodyType == '6' || source.bodyType == '8' || source.bodyType == '38'"
        >{{ source.msgContent }}</span>
        <span class="text" v-else-if="source.bodyType == '57'">{{$t("msg.common.service")}}</span>
        <!-- 群通知提示、好友请求、消息被拒收、撤回 -->
        <span class="text" v-else v-html="source.preview"></span>
      </div>
      <!-- 消息 -->
      <div class="history-content" :class="{ self: userId == source.bodyFrom }" v-else>
        <span class="select" :class="{ active: source.checked }"></span>
        <span class="selectArea" v-show="showMore" @click="historySelect(source)"></span>
        <!-- 日期 -->
        <div class="tips-bg" v-if="source.showTime" ondragstart="return false">
          <span class="text">{{ source.bodyTime | timeFilter2 }}</span>
        </div>
        <div class="msg-content clearfix">
          <!-- 群聊头像 -->
          <div
            class="avatar"
            v-if="currentSession.fromType == '1' && userId != source.bodyFrom"
            @click.stop="showmemberProfile(source.bodyFrom)"
            :data-index="
                    `{%type%:%avatar%,%uId%:${source.bodyFrom},%gId%:${currentSession.paramId}}`
                  "
          >
            <img
              class="img"
              ondragstart="return false"
              :src="global.fileDownUrl + 'compress/' +source.chatInfo.headImg"
              v-headError
            />
            <span
              :class="{manager: source.chatInfo.isAdmin == 2, owner: source.chatInfo.isAdmin == 1}"
            ></span>
          </div>
          <!-- 文字信息  链接信息 -->
          <div
            class="msg-detail"
            ondragstart="return false"
            :data-index="`{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            v-if="source.bodyType == '1' || source.bodyType == '13' || source.bodyType == '49'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div
              class="name"
              :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              v-if="userId != source.bodyFrom && currentSession.isShowMemberNick == '1'"
              v-nikename="source.chatInfo.userId"
              v-html="source.chatInfo.nickName"
            ></div>
            <p v-text="source.msgContent" v-to-face @click="interceptor($event, source)"></p>
            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read: source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!--  @信息 -->
          <div
            class="msg-detail"
            ondragstart="return false"
            :data-index="`{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            v-if="source.bodyType == '24'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div
              class="name"
              :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              v-if="userId != source.bodyFrom && currentSession.isShowMemberNick == '1'"
              v-nikename="source.chatInfo.userId"
              v-html="source.chatInfo.nickName"
            ></div>
            <!-- <p>{{item}}</p> -->
            <p v-text="source.msgContent" v-to-face @click="interceptor($event, source)"></p>
            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read: source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 自定义表情 -->
          <div
            class="msg-detail msg-img"
            ondragstart="return false;"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            v-imagePreview
            v-if="source.bodyType == '2'"
          >
            <img
              height="130"
              width="130"
              :src="global.fileDownUrl + 'compress/' + source.msgContent.bqUrl"
            />
            <div
              class="msg-status display-flex"
              :class="{
                      hide:!source.readNum ||
                        userId != source.bodyFrom
                    }"
            >
              <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 图片 -->
          <div
            class="msg-detail msg-img"
            ondragstart="return false;"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            :style="{
                    width:
                      source.msgContent.imgWidth > 254 ||
                      source.msgContent.imgHeigh > 142
                        ? source.msgContent.imgWidth / source.msgContent.imgHeigh >
                          254 / 142
                          ? 254 + 'px'
                          : (source.msgContent.imgWidth /
                              source.msgContent.imgHeigh) *
                              142 +
                            'px'
                        : source.msgContent.imgWidth + 'px',
                    height:
                      source.msgContent.imgWidth > 254 ||
                      source.msgContent.imgHeigh > 142
                        ? source.msgContent.imgWidth / source.msgContent.imgHeigh <
                          254 / 142
                          ? 142 + 'px'
                          : (source.msgContent.imgHeigh /
                              source.msgContent.imgWidth) *
                              254 +
                            'px'
                        : source.msgContent.imgHeigh + 'px'
                  }"
            v-imagePreview
            v-if="source.bodyType == '3'"
          >
            <!-- class="img thumbnails"   请勿随意修改此属性值，修改时，请同步修改chat-panel.js中的loadOriginalImg方法对应值 -->
            <img
              class="img thumbnails"
              ondragstart="return false"
              :data-idx="index"
              :src="source.msgContent.imgUrl?(source.msgContent.imgUrl.indexOf('data:')<0?global.fileDownUrl + 'low/' + source.msgContent.imgUrl:source.msgContent.imgUrl):''"
              v-viewer="source.mId"
              @load="loadOriginalImg($event,source.msgContent.imgUrl)"
            />
            <div
              class="msg-status display-flex"
              :class="{
                      hide:!source.readNum>0 ||
                        userId != source.bodyFrom
                    }"
            >
              <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 语音 -->
          <div
            class="msg-detail voice"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            v-if="source.bodyType == '4'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div class="voice-pannel">
              <div class="voice-left">
                <i
                  class="icon-play"
                  @click.stop="voicePlay(item, index)"
                  :class="{ active: source.msgContent.isPlaying }"
                ></i>
              </div>
              <div class="voice-right">
                <div class="voice-progress">
                  <span
                    class="open-progress"
                    :style="{ width:pxNum(source.msgContent.proNum,source.msgContent.duration)}"
                  ></span>
                  <span
                    class="poyt"
                    :style="{left:pxNum(source.msgContent.proNum,source.msgContent.duration)}"
                  ></span>
                  <!-- <span class="unread-progress"
                          v-if="!source.msgContent.isPlay && userId != source.bodyFrom"
                  ></span>-->
                </div>
                <div class="voice-detail">
                  <span class="duration">{{source.msgContent.duration}}"</span>
                  <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
                </div>
              </div>
              <span
                class="voice-unread"
                v-if="!source.msgContent.isPlay && userId != source.bodyFrom"
              ></span>
            </div>
          </div>
          <!-- 视频 -->
          <div
            class="msg-detail msg-video"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            :style="{
                    width:
                      source.msgContent.imgWidth > 254 ||
                      source.msgContent.imgHeigh > 142
                        ? source.msgContent.imgWidth / source.msgContent.imgHeigh >
                          254 / 142
                          ? 254 + 'px'
                          : (source.msgContent.imgWidth /
                              source.msgContent.imgHeigh) *
                              142 +
                            'px'
                        : source.msgContent.imgWidth + 'px',
                    height:
                      source.msgContent.imgWidth > 254 ||
                      source.msgContent.imgHeigh > 142
                        ? source.msgContent.imgWidth / source.msgContent.imgHeigh <
                          254 / 142
                          ? 142 + 'px'
                          : (source.msgContent.imgHeigh /
                              source.msgContent.imgWidth) *
                              254 +
                            'px'
                        : source.msgContent.imgHeigh + 'px'
                  }"
            v-videoError
            v-if="source.bodyType == '5'"
          >
            <img
              class="img"
              ondragstart="return false"
              :src="global.fileDownUrl + 'compress/' + source.msgContent.videoUrl + '.png'"
              :data-idx="index"
              v-viewer="source.mId"
            />
            <div class="msg-status display-flex" :class="{ hide: userId != source.bodyFrom }">
              <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 文件 -->
          <div
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
            class="msg-file display-flex"
            ondragstart="return false"
            @mouseenter="mouseEnter($event, source.msgContent)"
            @mouseleave="mouseLeave($event)"
            :data-index="`{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            v-if="source.bodyType == '18'"
          >
            <div class="file-icon" :class="source.msgContent.name | fileFitler"></div>
            <div class="file-info display-flex-item">
              <p class="title">{{ source.msgContent.name | fileName(15) }}</p>
              <div class="size display-flex">
                <span
                  v-if="source.msgContent.progress == 100 || (source.loading == 2 && source.msgContent.progress == 500)"
                >
                  {{
                  source.msgContent.size | fileSize
                  }}
                </span>
                <div class="progress-bar" v-if="source.msgContent.progress < 100">
                  <span class="bar" :style="{ width: source.msgContent.progress + '%' }"></span>
                </div>
                <span v-if="source.msgContent.progress < 100">
                  {{
                  source.msgContent.progress > 0
                  ? source.msgContent.progress
                  : 0
                  }}%
                </span>
                <a
                  class="download display-flex-item"
                  v-if="source.msgContent.progress == 100"
                  :href="global.fileDownUrl + 'html/download1.html#'+source.msgContent.dl64"
                  target="_blank"
                  :alt="source.msgContent.name"
                >{{ $t("msg.common.download") }}</a>
              </div>
              <div class="msg-status display-flex">
                <span
                  class="uploading flex-item-nowrap"
                  v-if="source.msgContent.progress == -1"
                >{{ $t("msg.chatPanel.wait") }}</span>
                <span
                  class="uploading display-flex-item"
                  v-if="source.loading == 2 && source.msgContent.progress == 500"
                >{{ $t("msg.chatPanel.network") }}</span>
                <span
                  class="cannel display-flex-item"
                  v-if="
                          source.msgContent.progress >= 0 &&
                            source.msgContent.progress < 100
                        "
                  @click="cancelUpload(source)"
                  href="javascript:;"
                >{{ $t("msg.common.cancel") }}</span>
                <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
                <span
                  class="send"
                  :class="{
                          loading: source.loading == 0 || source.msgContent.progress < 100,
                          read:source.readNum>0,
                          fail: source.loading == 2,
                          fail: source.loading == 3,
                        }"
                  @click="reSend(source)"
                ></span>
              </div>
            </div>
          </div>
          <!-- 编辑 -->
          <div
            class="msg-detail"
            ondragstart="return false"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            v-if="
                    source.bodyType == '28' &&
                      source.mId == source.msgContent.mId &&
                      source.msgContent.editType != 30
                  "
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div v-text="source.msgContent.content" v-to-face @click="interceptor($event, source)"></div>
            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <div
            class="msg-detail replied"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            v-if="
                    source.bodyType == '28' &&
                      source.mId == source.msgContent.mId &&
                      source.msgContent.editType == 30
                  "
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
            @click="goFocus(source.msgContent.content.repliedId)"
          >
            <div class="replied-name">{{ source.msgContent.content.repliedName }}：</div>
            <div
              class="replied-text"
              v-if="
                      source.msgContent.content.msgType != 2 &&
                        source.msgContent.content.msgType != 3 &&
                        source.msgContent.content.msgType != 5
                    "
              v-text="source.msgContent.content.repliedContent"
              v-to-face
            ></div>
            <div
              v-if="
                      source.msgContent.content.msgType == 2 ||
                        source.msgContent.content.msgType == 3
                    "
            >
              <img
                class="img"
                :src="
                        global.fileDownUrl +
                          'compress/' +
                          source.msgContent.content.repliedContent
                      "
                v-imagePreview
                ondragstart="return false"
              />
            </div>
            <div v-if="source.msgContent.content.msgType == 5" class="reply-video position">
              <img
                class="img"
                :src="
                        global.fileDownUrl +
                          'compress/' +
                          source.msgContent.content.repliedContent
                      "
                v-videoError
                ondragstart="return false"
              />
            </div>
            <div class="reply-content" v-html="source.msgContent.content.content" v-to-face></div>
            <div class="msg-status display-flex">
              <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 30人以上群聊 -->
          <div
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
            class="msg-detail group-invite display-flex"
            @click="groupInvite(source)"
            :data-index="`{%type%:%message%,%mid%:${source.mId}}`"
            v-if="source.bodyType == '29'"
          >
            <div class="display-flex-item">
              <p class="title">{{ $t("msg.chatPanel.inviteJoin") }}</p>
              <p class="text">{{ source.preview }}</p>
              <p class="text display-flex-item">{{ $t("msg.chatPanel.detail") }}</p>
            </div>
            <div>
              <img
                class="img"
                v-if="source.msgContent.gAvatar"
                ondragstart="return false"
                :src="global.fileDownUrl + 'compress/' + source.msgContent.gAvatar"
                v-headErrors
              />
              <img
                class="person-avatar"
                src="../../assets/images/error-head.png"
                v-if="!source.msgContent.gAvatar"
              />
              <!-- <span
                    class="default"
                    v-defaultHead
                    v-if="!source.msgContent.gAvatar" v-html="source.msgContent.gName"
              ></span>-->
              <div class="msg-status display-flex">
                <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
                <span
                  class="send"
                  :class="{
                          loading: source.loading == 0,
                          read:source.readNum>0,
                          fail: source.loading == 2,
                          fail: source.loading == 3,
                        }"
                  @click="reSend(source)"
                ></span>
              </div>
            </div>
          </div>
          <!-- 回复 -->
          <div
            ondragstart="return false;"
            class="msg-detail replied"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            v-if="source.bodyType == '30'"
            @click="goFocus(source.msgContent.repliedId)"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div class="position">
              <div class="replied-name">{{ source.msgContent.repliedName }}：</div>
              <div
                @click="interceptor($event, source)"
                class="replied-text"
                v-if="
                        source.msgContent.msgType != 2 &&
                          source.msgContent.msgType != 3 &&
                          source.msgContent.msgType != 5
                      "
                :title="source.msgContent.repliedContent"
                v-to-face
                v-text="source.msgContent.repliedContent"
              ></div>
              <div
                class="replied-img"
                v-if="
                        source.msgContent.msgType == 2 ||
                          source.msgContent.msgType == 3
                      "
              >
                <img
                  class="img"
                  ondragstart="return false"
                  :src="global.fileDownUrl + 'compress/' + source.msgContent.repliedContent"
                  v-imagePreview
                  v-imageI
                />
              </div>
              <div v-if="source.msgContent.msgType == 5" class="reply-video">
                <img
                  class="img"
                  ondragstart="return false"
                  :src="global.fileDownUrl + 'compress/' + source.msgContent.repliedContent+'.png'"
                  v-imageV
                />
              </div>
              <div
                class="reply-content"
                v-text="source.msgContent.content"
                v-to-face
                @click="interceptor($event, source)"
              ></div>
            </div>
            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 名片 -->
          <div
            class="msg-card"
            :data-index="
                    `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`
                  "
            @click.stop="showmemberProfile(source.msgContent.userId)"
            v-if="source.bodyType == '32'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div class="person-title">{{ $t("msg.common.card") }}</div>
            <div class="person-content">
              <img
                class="person-avatar"
                :src="global.fileDownUrl + 'compress/' + source.msgContent.avatar"
                v-headError
              />
              <!-- <span class="default" v-defaultHead v-if="!source.msgContent.avatar">{{
                      source.msgContent.nickName
              }}</span>-->
              <img
                class="person-avatar"
                src="../../assets/images/error-head.png"
                v-if="!source.msgContent.avatar"
              />
              <div class="name-id">
                <span class="person-name" v-text="source.msgContent.nickName"></span>
                <span
                  class="person-id"
                  v-if="source.msgContent.alias"
                >@{{ source.msgContent.alias }}</span>
              </div>
            </div>
            <div
              class="person-remark"
              v-if="source.msgContent.remark && source.msgContent.remark.length"
              v-text="source.msgContent.remark"
            ></div>
            <div class="msg-status display-flex">
              <span class="time">{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read:source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 公告 -->
          <div
            class="msg-affiche"
            :data-index="`{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            v-if="source.bodyType == '47'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <div class="affiche-title">
              <i></i>
              {{ $t("msg.groupInfo.affiche") }}
            </div>
            <div class="affiche-content">
              <p v-html="source.msgContent.affiche"></p>
            </div>

            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                        loading: source.loading == 0,
                        read: source.readNum>0,
                        fail: source.loading == 2,
                        fail: source.loading == 3,
                      }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <!-- 聊天记录 -->
          <div
            class="msg-detail chat-list"
            :data-index=" `{%type%:%message%,%mid%:${source.mId},%msgType%:${source.bodyType}}`"
            @click="openRecord(source.msgContent)"
            v-if="source.bodyType == '51'"
            :style="{'background':userId == source.bodyFrom?bubbles.mybackground:bubbles.adversebackground}"
          >
            <!-- <span>{{item}}</span> -->
            <div v-if="source.msgContent.chatUsers.length==1" class="title">
              <div v-if="$i18n.locale == 'zh_CN'">来自"{{source.msgContent.chatUsers[0]}}"群的聊天记录</div>
              <div
                v-else-if="$i18n.locale == 'my'"
              >"{{source.msgContent.chatUsers[0]}}"ဂရု(ပ်)၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
              <div v-else>From the chat history of "{{source.msgContent.chatUsers[0]}}"</div>
            </div>
            <div v-else class="title">
              <div
                v-if="$i18n.locale == 'zh_CN'"
              >来自"{{source.msgContent.chatUsers[0]}}"和"{{source.msgContent.chatUsers[1]}}"的聊天记录</div>
              <div
                v-else-if="$i18n.locale == 'my'"
              >"{{source.msgContent.chatUsers[0]}}" နှင့် "{{source.msgContent.chatUsers[1]}}" တို့၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
              <div
                v-else
              >From the chat history of "{{source.msgContent.chatUsers[0]}}" and "{{source.msgContent.chatUsers[1]}}"</div>
            </div>
            <li class="list" v-for="(i,idx) in source.msgContent.contents" :key="idx">
              <div v-if="idx<=2" class="list-item">
                {{i.nickName}}:
                <span
                  v-if="i.msgType==1||i.msgType==28||i.msgType==30||i.msgType==13"
                >{{i.message}}</span>
                <span v-if="i.msgType==2">[{{ $t("msg.common.emoji") }}]</span>
                <span v-if="i.msgType==3">[{{ $t("msg.common.image") }}]</span>
                <span v-if="i.msgType==5">[{{ $t("msg.common.video") }}]</span>
                <span v-if="i.msgType==18">[{{ $t("msg.common.file") }}]</span>
                <span v-if="i.msgType==51">[{{ $t("msg.common.chatRecord") }}]</span>
                <span v-if="i.msgType==24" v-to-face v-text="i.message"></span>
              </div>
            </li>
            <span class="list-p" v-if="source.msgContent.contents.length>3">...</span>
            <!-- <span>{{source.msgContent}}</span> -->
            <div class="msg-status display-flex">
              <span
                class="time"
                :style="{'color':(myself&&userId == source.bodyFrom)||(!myself&&userId != source.bodyFrom)?'#607280':'#607280'}"
              >{{ source.bodyTime | timeFilter1 }}</span>
              <span
                class="send"
                :class="{
                          loading: source.loading == 0,
                          read: source.readNum>0,
                          fail: source.loading == 2,
                          fail: source.loading == 3,
                        }"
                @click="reSend(source)"
              ></span>
            </div>
          </div>
          <div class="icon-edit" v-if="source.bodyType == '28'"></div>
        </div>
        <group-readed
          v-if="
                  currentSession.fromType == '1' &&
                    lastGroupMsg.msgId == source.mId &&
                    lastGroupMsg.readNum > 0
                "
        ></group-readed>
      </div>
    </div>
    <div v-show="showMore" style="height:66px;"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "msg-list-item",
  props: {
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
    goto: {
      type: String,
    },
    atId: {
      type: String,
    },
    friendInfo: {
      type: Object,
    },
    qrCode: {
      type: Object,
    },
    firstMsgId: {
      type: Number,
    },
    mewMsgId: {
      type: Number,
    },
    myself: {
      type: Boolean,
    },
    show: {
      type: Boolean,
    },
    showMore: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters([
      "userId",
      "userInfo",
      "currentSession",
      "session",
      "message",
      "progress",
      "lastGroupMsg",
      "hasCurrentMsg",
      "atObj",
      "verifyGroup",
      "activityGroupMembers",
      "layout",
      "bubbles",
      "backurl",
      "windowSize",
    ]),
  },
  inject: [
    "interceptor",
    "reSend",
    "cancelUpload",
    "voicePlay",
    "showmemberProfile",
    "historySelect",
    "openRecord",
    "goFocus",
    "groupInvite",
    "loadOriginalImg",
    "mouseEnter",
    "mouseLeave",
  ],
};
</script>
<style lang="scss" scoped>
@import "./msg-list";
</style>