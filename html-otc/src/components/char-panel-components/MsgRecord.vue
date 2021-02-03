<template>
  <transition name="scale-x">
    <div class="my-popup msg-record" v-if="showBox">
      <div class="my-popup-content">
        <h3 class="my-popup-title">
          {{ title }}
        </h3>
        <span class="forward" @click="forward()"></span>
        <span class="close" @click="hide" ></span>
        <div class="message-box" ref="rocord">
          <ul class="message-list" v-scrollBar>
            <li class="history-item" v-for="(item, index) in msgList" :key="index">
              <div class="history-content">
                <div class="msg-content display-flex">
                  <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.avatar" v-headError v-if="item.avatar" />
                  <img class="avatar" src="../../assets/images/error-head.png" v-if="!item.avatar">
                  <div class="display-flex-item" :data-index="`{%type%:%forword%,%mid%:${index},%msgType%:${item.bodyType}}`">
                    <div class="msg-info display-flex">
                      <span class="flex-item-nowrap">{{ item.nickName }}</span>
                      <span class="time">{{ item.bodyTime | timeFilter3 }}</span>
                    </div>
                    <!-- 文字信息 @信息 链接信息 -->
                    <div  v-if="
                        item.bodyType == '1' ||
                        item.bodyType == '13' ||
                        item.bodyType == '24'
                      " >
                      <!-- <span>{{item}}</span> -->
                      <span class="msgtext" v-text="item.bodyContent" v-to-face @click="interceptor($event, item)"></span>
                    </div>
                    <!-- 自定义表情 -->
                    <div class="msg-detail msg-img" v-if="item.bodyType == '2'"  v-imagePreview>
                      <img height="130" width="130" :src="global.fileDownUrl +'compress/' +  item.bodyContent.bqUrl"/>
                    </div>
                    <!-- 图片 -->
                    <div class="msg-detail msg-img" :style="{
                        width:
                          item.bodyContent.imgWidth > 254 ||
                          item.bodyContent.imgHeigh > 142
                            ? item.bodyContent.imgWidth /
                                item.bodyContent.imgHeigh >
                              254 / 142
                              ? 254 + 'px'
                              : (item.bodyContent.imgWidth /
                                  item.bodyContent.imgHeigh) *
                                  142 +
                                'px'
                            : item.bodyContent.imgWidth + 'px',
                        height:
                          item.bodyContent.imgWidth > 254 ||
                          item.bodyContent.imgHeigh > 142
                            ? item.bodyContent.imgWidth /
                                item.bodyContent.imgHeigh <
                              254 / 142
                              ? 142 + 'px'
                              : (item.bodyContent.imgHeigh /
                                  item.bodyContent.imgWidth) *
                                  254 +
                                'px'
                            : item.bodyContent.imgHeigh + 'px',
                      }" v-if="item.bodyType == '3'">
                      <img class="img" :src="
                          global.fileDownUrl +
                          'compress/' +
                          item.bodyContent.imgUrl
                        " :data-idx="index" v-viewers="{data:item}" />
                    </div>
                    <!-- 语音 -->
                    <!-- <div class="msg-detail" v-if="item.bodyType == '4'">
                      <div class="voice-box display-flex" :class="{ active: item.bodyContent.isPlaying }">
                        <i class="icon-voice"></i>
                        <span class="text"
                          :class="{ active: item.bodyContent.isPlaying }">{{ item.bodyContent.duration }}''</span>
                        <span>转发语音不可播放</span>
                      </div>
                    </div> -->
                    <!-- 视频 -->
                    <div class="msg-detail msg-video" :style="{
                        width:
                          item.bodyContent.imgWidth > 254 ||
                          item.bodyContent.imgHeigh > 142
                            ? item.bodyContent.imgWidth /
                                item.bodyContent.imgHeigh >
                              254 / 142
                              ? 254 + 'px'
                              : (item.bodyContent.imgWidth /
                                  item.bodyContent.imgHeigh) *
                                  142 +
                                'px'
                            : item.bodyContent.imgWidth + 'px',
                        height:
                          item.bodyContent.imgWidth > 254 ||
                          item.bodyContent.imgHeigh > 142
                            ? item.bodyContent.imgWidth /
                                item.bodyContent.imgHeigh <
                              254 / 142
                              ? 142 + 'px'
                              : (item.bodyContent.imgHeigh /
                                  item.bodyContent.imgWidth) *
                                  254 +
                                'px'
                            : item.bodyContent.imgHeigh + 'px',
                      }"  v-if="item.bodyType == '5'"   v-videoError>
                      <img class="img" :src="
                          global.fileDownUrl +
                          'compress/' +
                          item.bodyContent.videoUrl + '.png'
                        " :data-idx="index" v-viewers="{data:item}" />
                        <span>{{ item.bodyContent}}</span>
                    </div>
                    <!-- 文件 -->
                    <div class="msg-file display-flex" v-if="item.bodyType == '18'">
                      <div class="file-icon" :class="item.bodyContent.name | fileFitler">
                        <!-- <circle-bar v-model="item.bodyContent.progress" v-if="item.bodyContent.progress < 100">
                        </circle-bar> -->
                      </div>
                      <div class="file-info display-flex-item">
                        <p class="title">{{ item.bodyContent.name | fileName(20)}}</p>
                        <div class="size">
                          <span>{{ item.bodyContent.size | fileSize }}</span>
                          <a class="download display-flex-item" :href="global.fileDownUrl + 'html/download1.html#'+item.bodyContent.dl64"
                          target="_blank" :alt="item.bodyContent.name">点击下载</a>
                        </div>
                        <!-- <div class="msg-status display-flex">
                        </div> -->
                      </div>
                    </div>
                    <!-- 编辑 -->
                    <div  v-if="
                        item.bodyType == '28' && item.bodyContent.editType != 30
                      ">
                      <div v-html="item.bodyContent.content"></div>
                    </div>
                    <div class="msg-detail" v-if="
                        item.bodyType == '28' && item.bodyContent.editType == 30
                      ">
                      <div>"{{ item.bodyContent.content.repliedName }}</div>
                      <div v-if="
                          item.bodyContent.content.msgType != 2 &&
                          item.bodyContent.content.msgType != 3 &&
                          item.bodyContent.content.msgType != 5
                        " v-html="item.bodyContent.content.repliedContent"></div>
                      <div class="position replied-img" v-if="
                          item.bodyContent.content.msgType == 2 ||
                          item.bodyContent.content.msgType == 3
                        ">
                        <img class="img" :src="
                            global.fileDownUrl +
                            'compress/' +
                            item.bodyContent.content.repliedContent
                          " v-imageError />
                      </div>
                      <div v-if="item.bodyContent.content.msgType == 5" class="reply-video position">
                        <img class="img" :src="
                            global.fileDownUrl +
                            'compress/' +
                            item.bodyContent.content.repliedContent
                          " v-imageError />
                      </div>
                      <div v-to-face class="reply-content" v-text="item.bodyContent.content.content"></div>
                    </div>
                    <!-- 30人以上群聊 -->
                    <!-- <div class="msg-detail group-invite display-flex" @click="$parent.groupInvite(item)" :data-index="`{%type%:%message%,%mid%:${item.mId}}`"
                      v-if="item.bodyType == '29'"
                    >
                      <div class="display-flex-item">
                        <p class="title">邀请你加入群聊</p>
                        <p class="text">{{ item.preview }}</p>
                        <p class="text display-flex-item">点击查看详情</p>
                      </div>
                      <div>
                        <img
                          class="img"
                          :src="
                            global.fileDownUrl +
                            'compress/' +
                            item.bodyContent.gAvatar
                          "
                          v-headError
                        />
                      </div>
                    </div> -->
                    <!-- 回复 -->
                    <div class="msg-detail reply" v-if="item.bodyType == '30'">
                      <div class="position">
                        <div class="name">{{ item.bodyContent.repliedName }}：</div>
                        <div  class="name"
                          v-if="
                            item.bodyContent.msgType != 2 &&
                            item.bodyContent.msgType != 3 &&
                            item.bodyContent.msgType != 5
                          "
                          v-html="item.bodyContent.repliedContent"
                        ></div>
                        <div
                          class="replied-img"
                          v-if="
                            item.bodyContent.msgType == 2 ||
                            item.bodyContent.msgType == 3
                          "
                        >
                          <img
                            class="img"
                            :src="
                              global.fileDownUrl +
                              'compress/' +
                              item.bodyContent.repliedContent
                            "
                            v-imageError
                          />
                        </div>
                        <div
                          v-if="item.bodyContent.msgType == 5"
                          class="reply-video"
                        >
                          <img
                            class="img"
                            :src="
                              global.fileDownUrl +
                              'compress/' +
                              item.bodyContent.repliedContent
                            "
                            v-imageError
                          />
                        </div>
                        <div
                          class="reply-content"
                          v-to-face
                          v-text="item.bodyContent.content"
                        ></div>
                      </div>
                    </div>
                    <!-- 名片 -->
                    <!-- <div class="msg-detail" v-if="item.bodyType == '32'">
                      <span>[个人名片]</span>
                    </div> -->
                    <!-- 聊天记录 -->
                    <div
                      class="msg-detail chat-list"
                      v-if="item.bodyType == 51"
                      @click="show(item.bodyContent)"
                    >
                      <!-- <span>{{item}}</span> -->
                      <div v-if="item.bodyContent.chatUsers.length==1"  class="title">
                        <div v-if="$i18n.locale == 'zh_CN'">来自"{{item.bodyContent.chatUsers[0]}}"群的聊天记录</div>
                        <div v-else-if="$i18n.locale == 'my'">"{{item.bodyContent.chatUsers[0]}}"ဂရု(ပ်)၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
                        <div v-else>From the chat history of " {{item.bodyContent.chatUsers[0]}}"</div>
                      </div>
                      <div v-else class="title">
                        <div v-if="$i18n.locale == 'zh_CN'">来自"{{item.bodyContent.chatUsers[0]}}"和"{{item.bodyContent.chatUsers[1]}}"的聊天记录</div>
                        <div v-else-if="$i18n.locale == 'my'">"{{item.bodyContent.chatUsers[0]}}" နှင့် "{{item.bodyContent.chatUsers[1]}}" တို့၏ ချက်တ်တင်သမိုင်းမှ လာသည်</div>
                        <div v-else>From the chat history of "{{item.bodyContent.chatUsers[0]}}" and "{{item.bodyContent.chatUsers[1]}}"</div>
                      </div>
                      
                      <li class="list" v-for="(i,idx) in item.bodyContent.contents" :key='idx'>
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
                    </div>
                    <!-- <div class="icon-edit" v-if="item.bodyType == '28'"></div> -->
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <loading v-if="loading"></loading>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import Msg from "@/tools/msg";
import { MessageHandler } from "@/tools/messageHandler";
export default {
  name: "msg-record",
  data() {
    return {
      showBox: false,
      title: "",
      loading: true,
      msgList: [],
      idList: [],
      idx: 0,
      // msgRecord: {},
      msg:null
    };
  },
  methods: {
    show(obj) {
      this.msg=obj
      this.showBox = true;
      this.loading = true;
      this.$http.getRecordList({ id: obj.historyId }).then((data) => {
        for (let i = 0; i < data.list.length; i++) {
          data.list[i] = this.formatMsg(data.list[i]);
        }
        this.msgList = data.list;
        this.$store.commit("SET_RECORDS",this.msgList);
        if(obj.chatUsers.length==1){
          if(this.$i18n.locale == 'zh_CN') this.title = '来自"'+ obj.chatUsers[0] + '"群的聊天记录'
          else if(this.$i18n.locale == 'my') this.title = '"'+ obj.chatUsers[0] + '"ဂရု(ပ်)၏ ချက်တ်တင်သမိုင်းမှ လာသည်'
          else this.title = 'From the chat history of "'+ obj.chatUsers[0] + '"'
        }else{
          if(this.$i18n.locale == 'zh_CN') this.title = '来自"' + obj.chatUsers[0]+'"和"'+obj.chatUsers[1] + '"的聊天记录'
          else if(this.$i18n.locale == 'my') this.title = '"' + obj.chatUsers[0]+'"နှင့်"'+obj.chatUsers[1] + '"တို့၏ ချက်တ်တင်သမိုင်းမှ လာသည်'
          else this.title = 'From the chat history of "' + obj.chatUsers[0]+'" and "'+obj.chatUsers[1] + '"'
        }
        this.loading = false;
      });
    },
    hide() {
      this.showBox = false;
      this.msgList = [];
      this.idList = [];
      this.idx = 0;
    },
    interceptor(e,item){
      this.$parent.interceptor(e,item)
    },
    forward(){
    let arr = [];
    let  body={
      msgType: 51,
      bodyContent: this.msg,
      bodyContent: this.msg
    }
    arr.push(body)
      let forwardInfo = {
        show: true,
        body: arr,
      };
    
      this.$store.commit("SET_FORWARD_INFO", forwardInfo);
    },
    formatMsg(content) {
      switch (content.bodyType + "") {
        case "1":
        case "13":
        case "24":
          content.bodyContent =content.bodyContent
          break;
        case "2":
        case "3":
        case "4":
        case "5":
        case "18":
        case "51":
          content.bodyContent = JSON.parse(content.bodyContent);
          break;
        case "28":
          content.bodyContent = JSON.parse(content.bodyContent);
          if (content.bodyContent.editType == 30) {
            let replied = content.bodyContent.content;
            replied.content = MessageHandler.textToHtml(replied.content);
            if (replied.repliedContent) {
              if (
                !(
                  replied.msgType == 2 ||
                  replied.msgType == 3 ||
                  replied.msgType == 4 ||
                  replied.msgType == 5 ||
                  replied.msgType == 18
                )
              ) {
                replied.repliedContent = MessageHandler.textToHtml(
                  replied.repliedContent
                );
              }
            }
          } else {
            content.bodyContent.content = MessageHandler.textToHtml(
              content.bodyContent.content
            );
          }
          break;
        case "30":
          content.bodyContent = JSON.parse(content.bodyContent);
          let msgType = content.bodyContent.msgType;

          if (content.bodyContent.repliedContent) {
            content.bodyContent.content = MessageHandler.textToHtml(
              content.bodyContent.content
            );
            if (
              msgType == 1 ||
              msgType == 13 ||
              msgType == 28 ||
              msgType == 30
            ) {
              content.bodyContent.repliedContent = MessageHandler.textToHtml(
                content.bodyContent.repliedContent
              );
            }
          }
          break;
        default:
          break;
      }
      return content;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped="" type="text/css">
@import "../../assets/css/var";

.msg-record {
  .my-popup-content {
    width: 732px;
    height: 718px;
    border-radius: 8px;
    .my-popup-title{
      height: 52px;
      line-height: 52px;
      padding-left:20px;
      color: #838287;
    }
    .close{
      display: inline-block;
      position: absolute;
      top: 7px;
      right: 10px;
      cursor: pointer;
      width: 23px;
      height:23px;
      background: url(../../assets/images/icon/close3.png);
    }
    .forward{
      display: inline-block;
      position: absolute;
      top: 7px;
      right: 33px;
      cursor: pointer;
      width: 23px;
      height:23px;
      background: url(../../assets/images/icon/list-forward.png);
    }
    .message-box {
      position: relative;
      height: 666px;
    }
    .message-list {
      position: relative;
      height: 666px;
      padding: 0 30px;
      text-align: left;
    }
    .history-item {
      padding: 15px 0;
      border-bottom: 1px solid $border-color;
      font-size: 14px;
      &:last-child {
        border: 0;
      }
      .history-content {
        padding: 0;
      }
    }
   
    .msg-content {
      align-items: flex-start;
      .avatar {
        float: none;
        border-radius: 50%;
      }
      .msg-info {
        justify-content: space-between;
        padding-bottom: 10px;
        font-size: 14px;
        color: $color-grey;
        .time {
          font-size: 12px;
          color: #838287;
        }
      }
      .msgtext{
          display: inline-block;
          max-width: 520px;
          word-wrap:break-word;
          word-break:normal;  
        }
      .msg-detail {
        min-height: 32px;
        border-radius: 0 10px 10px 10px;
        text-align: left;
        &.reply{
          border:0;
          .name{
            color: $color-theme;
          }
        }
        &.msg-img{
          border-radius: 10px;
        }
        &.none {
          padding: 0;
          border: 0;
        }
      }
      .icon-edit {
        margin: 13px 0 0 12px;
      }
      .msg-file {
        border-radius: 0 10px 10px 10px;
      }
      .chat-list {
        width: 273px;
        cursor: pointer;
          .title{
            color: #122030;
            font-size: 14px;
            padding: 0;
            border: 0;
            display: inline-block;
            overflow: hidden;                 
            white-space:nowrap;                
            text-overflow:ellipsis;  
          }
          .list{
            line-height: 18px;
          }
          .list-item{
            font-size: 12px;  
            color: #5F717F;
            display: inline-block;
            max-width: 252px;
            overflow: hidden;                 
            white-space:nowrap;                
            text-overflow:ellipsis;          
          }
          .list-p{
            color: #5F717F;
            line-height: 12px;
          }
        // background-color: $active-backgroup;
      }
    }
  }
}
</style>
