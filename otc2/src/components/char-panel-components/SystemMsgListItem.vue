<template>
  <div class="history-item">
    <div class="push" v-if="source.bodyType == 45">
      <div class="push-header display-flex">
        <span class="title">{{source.bodyContent.title}}</span>
        <span class="time">{{ source.bodyTime | timeFilter }}</span>
      </div>
      <div>{{source.bodyContent.content}}</div>
    </div>
    <!-- 投诉 -->
    <div class="push" v-else-if="source.bodyType == 33">
      <!-- <span>{{item}}</span> -->
      <div class="push-header display-flex">
        <span class="title" v-if="source.bodyContent.type==0">{{$t('msg.complaint.submitted')}}</span>
        <span class="title" v-if="source.bodyContent.type==1">{{$t('msg.complaint.success')}}</span>
        <span class="title" v-if="source.bodyContent.type==-1">{{$t('msg.complaint.unsuccess')}}</span>
        <span class="title" v-if="source.bodyContent.type==2">{{$t('msg.complaint.Warningnotice')}}</span>
        <span class="title" v-if="source.bodyContent.type==3">{{$t('msg.complaint.Violationof')}}</span>
        <span class="title" v-if="source.bodyContent.type==4">{{$t('msg.complaint.Bannednotice')}}</span>
        <span class="title" v-if="source.bodyContent.type==5">{{$t('msg.complaint.Accountnotice')}}</span>
        <span class="time">{{ source.bodyTime | timeFilter }}</span>
      </div>
      <div class="push-content">
        <div
          v-if="source.bodyContent.type == 0||source.bodyContent.type== 1||source.bodyContent.type== -1"
        >{{$t('msg.complaint.object')}}{{source.bodyContent.nickName}}</div>
        <div>{{$t('msg.complaint.number')}}{{source.bodyContent.complaintCode}}</div>
        <div
          v-if="source.bodyContent.type!=0"
        >{{$t('msg.complaint.results')}}{{source.bodyContent.auditResult}}</div>
        <div v-if="source.bodyContent.type!=0">
          {{$t('msg.complaint.method')}}
          <span
            v-if="source.bodyContent.treatment== 0"
          >{{$t('msg.complaint.notprocessed')}}</span>
          <span v-if="source.bodyContent.treatment== 1">{{$t('msg.complaint.Title')}}</span>
          <span v-if="source.bodyContent.treatment== 2">{{$t('msg.complaint.Accountfreeze')}}</span>
          <span v-if="source.bodyContent.treatment== 3">{{$t('msg.complaint.Warning')}}</span>
          <span v-if="source.bodyContent.treatment== 4">{{$t('msg.complaint.Deduction')}}</span>
        </div>
      </div>
      <div class="push-text" v-if="source.bodyContent.type== 0">{{$t('msg.complaint.subText')}}</div>
      <div class="push-text" v-if="source.bodyContent.type== 1">{{$t('msg.complaint.succText')}}</div>
      <div class="push-text" v-if="source.bodyContent.type== -1">{{$t('msg.complaint.unText')}}</div>
      <div class="push-text" v-if="source.bodyContent.type== 2">{{$t('msg.complaint.WarningText')}}</div>
      <div
        class="push-text"
        v-if="source.bodyContent.type== 3"
      >{{$t('msg.complaint.ViolationText')}}</div>
      <div class="push-text" v-if="source.bodyContent.type== 4">{{$t('msg.complaint.BannedText')}}</div>
      <div class="push-text" v-if="source.bodyContent.type== 5">{{$t('msg.complaint.AccountText')}}</div>
    </div>
    <!-- 安全验证 -->
    <div class="push" v-else-if="source.bodyType == 53">
      <!-- <div>{{item}}</div> -->
      <div class="push-header display-flex">
        <span
          class="title"
          v-if="source.bodyContent.type==10004"
        >{{$t('msg.complaint.Loginverification')}}</span>
        <span class="title" v-else>{{$t('msg.complaint.Accountsecurity')}}</span>
        <span class="time">{{ source.bodyTime | timeFilter }}</span>
      </div>
      <div
        v-if="source.bodyContent.type==10004"
      >{{$t('msg.complaint.Code')}}{{source.bodyContent.code}}</div>
      <div>
        <span
          class="push-text"
          v-if="source.bodyContent.type==10004"
          v-html="$t('msg.complaint.text10004')"
        ></span>
        <span
          class="push-text"
          v-if="source.bodyContent.type==10017"
        >{{$t('msg.complaint.text10017')}}</span>
        <span
          class="push-text"
          v-if="source.bodyContent.type==10001"
        >{{$t('msg.complaint.text10001')}}</span>
        <span
          class="push-text"
          v-if="source.bodyContent.type==10018"
        >{{$t('msg.complaint.text10018')}}</span>
        <span
          class="push-text"
          v-if="source.bodyContent.type==10007"
        >{{$t('msg.complaint.text10007')}}</span>
      </div>
    </div>
    <!-- 安全通知 -->
    <div class="push" v-else-if="source.bodyType == 54">
      <!-- <div>{{item}}</div> -->
      <div class="push-header display-flex">
        <span class="title" v-if="source.bodyContent.type==10010">{{$t('msg.complaint.Psdchange')}}</span>
        <span
          class="title"
          v-if="source.bodyContent.type==10017||source.bodyContent.type==17"
        >{{$t('msg.complaint.Accountsuccess')}}</span>
        <span
          class="title"
          v-if="source.bodyContent.type==10018||source.bodyContent.type==18"
        >{{$t('msg.complaint.Accountunsuccess')}}</span>
        <span
          class="title"
          v-if="source.bodyContent.type==10006"
        >{{$t('msg.complaint.phonechanged')}}</span>
        <span class="time">{{ source.bodyTime | timeFilter }}</span>
      </div>
      <div class="information">
        <span v-if="source.bodyContent.type==10010">{{$t('msg.complaint.psdchangeText')}}</span>
        <span v-if="source.bodyContent.type==10017">{{$t('msg.complaint.AccountsucText')}}</span>
        <span v-if="source.bodyContent.type==10018">{{$t('msg.complaint.AccountunText')}}</span>
        <span v-if="source.bodyContent.type==17">{{$t('msg.complaint.systemsucText')}}</span>
        <span v-if="source.bodyContent.type==18">{{$t('msg.complaint.systemunText')}}</span>
        <span
          v-if="source.bodyContent.type==10006"
        >{{$t('msg.complaint.phonechangedText')}}{{source.bodyContent.accountCode}}</span>
      </div>
      <div
        v-if="source.bodyContent.type==10017||source.bodyContent.type==10018||source.bodyContent.type==10010"
      >{{$t('msg.complaint.Account')}}{{source.bodyContent.accountCode}}</div>
      <div
        v-if="source.bodyContent.type==10017||source.bodyContent.type==10018||source.bodyContent.type==10010||source.bodyContent.type==10006"
      >{{$t('msg.complaint.Device')}}{{source.bodyContent.device}}</div>
      <div
        v-if="source.bodyContent.type==10017||source.bodyContent.type==10018||source.bodyContent.type==10010||source.bodyContent.type==10006"
      >{{$t('msg.complaint.IP')}}{{source.bodyContent.IP}}</div>
      <div>{{$t('msg.complaint.time')}}{{source.bodyContent.time | timeFilter3}}</div>
    </div>
    <div class="push" v-else>
      <span v-html="source.bodyType"></span>
      <div class="msg-status display-flex">
        <span class="time">{{ source.bodyTime | timeFilter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sys-msg-list-item",
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
  },
};
</script>
<style lang="scss" scoped>
@import "./msg-list";
</style>