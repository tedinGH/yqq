<template>
  <div class="session-box">
    <div class="search-box">
      <div class="search-input">
        <i class="icon-search"></i>
        <input
          type="text"
          :placeholder="$t('msg.menu.search')"
          v-model="searchKey"
        />
        <i class="icon-delete" @click="searchKey = ''" v-show="searchKey"></i>
      </div>
    </div>
    <div :class="searchKey?'session-tip session-nottop display-flex':'session-tip display-flex'">
      <label
        class="menu "
        @click="tipType = 1"
        :class="{ active: tipType == 1 }"
        :title="$t('msg.menu.contact')"
        >{{ $t("msg.menu.contact") }}</label
      >
      <label
        class="menu menu2 "
        @click="tipType = 2"
        :class="{ active: tipType == 2 }"
        :title="$t('msg.menu.group')"
        >{{ $t("msg.menu.group") }}</label
      >
      <!-- <label
        class="menu flex-item-nowrap"
        @click="tipType = 3"
        :class="{ active: tipType == 3 }"
        :title="$t('msg.menu.newFriend')"
        >{{ $t("msg.menu.newFriend") }}
        <span class="red-point" v-show="newFriendsNum > 0">{{
          newFriendsNum
        }}</span>
      </label> -->
    </div>
    <!-- 搜索结果 -->
    <ul class="session-list friend" v-scrollBar v-if="searchKey">
      <div class="search-title" v-show="friendsResult && friendsResult.length">
        {{ $t("msg.menu.contact") }}
      </div>
      <li
        class="session-list-item display-flex"
        :class="{ search: item.userId == detailId }"
        @click="clickFriend(item, 0)"
        v-for="(item, idx) in friendsResult"
        :key="idx + 999"
      >
        <div class="item-left">
          <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError ondragstart="return false" />
          <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
          <img class="avatar" src="../assets/images/error-head2.png"  v-if="item.fromType == 1 && !item.img">
          <!-- <span class="default" v-defaultHead v-if="!item.headImg">{{ item.notes || item.nickName || item.userName }}</span> -->
        </div>
        <div class="item-right">
          <span class="name-top" v-html="item.tempName"></span>
          <img src="../assets/images/service.png"  class="verifys" v-if="item.userId==1001446 || item.userId==1014217" style="margin-top:-20px" />
          <p v-if="item.tempalias!='undefined'" class="name-bottom">{{$t("msg.user.userName")}}:@<span v-html="item.tempalias"></span></p>
        </div>
      </li>
      <div class="search-title" v-show="groupResult && groupResult.length">
        {{ $t("msg.menu.group") }}
      </div>
      <li
        class="session-list-item display-flex"
        :class="{ search: item.groupId == detailId }"
        @click="clickFriend(item, 1)"
        v-for="(item, index) in groupResult"
        :key="index"
      >
        <div class="item-left">
          <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError ondragstart="return false" />
          <!-- <span class="default" v-defaultHead v-if="!item.headImg">{{ item.groupName }}</span> -->
          <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !item.img">
            <img class="avatar" src="../assets/images/error-head2.png"  v-if="item.fromType == 1 && !item.img">
        </div>
        <div class="item-right">
          <p class="name-top" v-html="item.tempName"></p>
          <p class="name-bottom">
            {{ $t("msg.friendList.group") }} ID：<span
              v-html="item.tempId"
            ></span>
          </p>
        </div>
      </li>
      <div
        class="search-all"
        v-show="!showAll && allLength > 5"
        @click="showAll = true"
      >
        {{ $t("msg.friendList.showAll") }}({{ allLength }})
      </div>
      <div
        class="search-all"
        v-show="showAll && allLength > 5"
        @click="showAll = false"
      >
        {{ $t("msg.friendList.pickUp") }}
      </div>
      <div
        class="search-none"
        v-show="
          !(
            (groupResult && groupResult.length) ||
            (friendsResult && friendsResult.length)
          )
        "
      >
        <img class="img" src="../assets/images/search/datanone.png" />
        <p class="text">{{ $t("msg.friendList.searchKey") }}</p>
      </div>
    </ul>
    <!-- 正常列表 -->
    <div class="contact-list friend" v-scrollBar v-show="!searchKey">
      <div class="group-friends" v-if="tipType == '1'">
        <div v-for="item in sortFriends" :key="item.letter">
          <div v-if="item.data.length > 0" class="sort-letter">
            {{ item.letter }}
          </div>
          <ul class="session-list">
            <li
              class="session-list-item display-flex"
              :class="{ active: data.userId == detailId, hide: data.temp }"
              @click="clickFriend(data, 0)"
              v-for="data in item.data"
              :key="data.userId"
            >
              <div class="item-left">
                <img class="avatar" :src="global.fileDownUrl + 'compress/' + data.headImg" v-headError ondragstart="return false" />
                <!-- <span class="default" v-defaultHead v-if="!data.headImg">{{ data.notes || data.nickName || data.userName }}</span> -->
              <img class="avatar" src="../assets/images/error-head.png" v-if="item.fromType == 0 && !data.headImg">
              
              </div>
              <div class="item-right">
                <!-- <span>{{data}}</span> -->
                <p
                  class="name-line"
                >{{data.notes || data.nickName || data.userName}} <img src="../assets/images/service.png"  class="verifys" v-if="data.userId==1001446 || data.userId==1014217" style="margin-top:-2px" /></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="group-friends" v-if="tipType == '2'">
        <div v-for="(item, idx) in sortGroups" :key="idx">
          <div v-if="item.data.length > 0" class="sort-letter">
            {{ item.letter }}
          </div>
          <ul class="session-list">
            <li
              class="session-list-item display-flex"
              :class="{ active: data.groupId == detailId }"
              @click="clickFriend(data, 1)"
              v-for="(data, id) in item.data"
              :key="id"
            >
              <div class="item-left">
                <img
                  class="avatar"
                  :src="global.fileDownUrl + 'compress/' + data.headImg"
                  v-headErrors
                  v-if="data.headImg"
                  ondragstart="return false"
                />
                <img class="avatar" src="../assets/images/error-head2.png"  v-else-if="item.fromType == 1 && !data.headImg">
                <img class="avatar" src="../assets/images/error-head2.png"  v-else>
              </div>
              <div class="item-right">
                <p class="name-line" v-text="data.groupName"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="group-friends" v-if="tipType == '3'">
        <ul class="session-list">
          <li
            class="session-list-item border-none display-flex"
            :class="{ active: item.verifyId == detailId }"
            @click.stop="clickHistory(item)"
            v-for="(item, idx) in newFriendsList"
            :key="idx + 'n'"
          >
            <div class="item-left">
              <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError ondragstart="return false"/>
            </div>
            <div class="item-right">
              <p class="name-line2" v-text="item.nickName"></p>
              <span class="accept" :title="$t('msg.friendList.requestAdd')" v-show="item.state == 2">{{
                $t("msg.friendList.requestAdd")
              }}</span>
              <span
                class="verify"
                :title="$t('msg.detail.accepted')"
                v-show="item.state == 1 || item.state == 9"
                >{{ $t("msg.detail.accepted") }}</span
              >
              <span class="verify" :title="$t('msg.detail.refused')" v-show="item.state == 0">{{
                $t("msg.detail.refused")
              }}</span>
            </div>
          </li>
          <li
            class="session-list-item border-none display-flex"
            :class="{ active: item.verifyId == detailId }"
            @click.stop="clickHistory(item)"
            v-for="(item, index) in verifyHistory"
            :key="index"
          >
            <div class="item-left">
              <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.headImg" v-headError ondragstart="return false"/>
            </div>
            <div class="item-right">
              <p class="name-line2" v-text="item.nickName"></p>
              <span class="verify" :title="$t('msg.detail.accepted')" v-show="item.state == 1">{{
                $t("msg.detail.accepted")
              }}</span>
              <span class="verify" :title="$t('msg.detail.refused')" v-show="item.state == 0">{{
                $t("msg.detail.refused")
              }}</span>
            </div>
          </li>
        </ul>
        <div
          class="search-nodata"
          v-show="newFriendsList.length == 0 && verifyHistory.length == 0"
        >
          {{ $t("msg.friendList.noData") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { localStore } from "@/tools/localStorage";
import { Util } from "@/tools/utils";
import "@/common/pinyin";
import { sessionUtil } from "@/session/sessionUtil";
import {friendDB} from "@/session/friend/friendDB";
import {friend} from "@/session/friend";
import {group} from "@/session/group";

export default {
  name: "friend",
  data() {
    return {
      searchKey: "",
      friendsResult: [],
      tempFriend: [],
      groupResult: [],
      tempGroup: [],
      showAdd: false,
      showGroup: false,
      showFriend: false,
      showNewFriends: false,
      showAll: false,
      allLength: 0,
      tipType: 1,
      detailId: "",
      verifyHistory:[],
      newFriendsList:[],
      sortGroups:[],
      sortFriends:[],
    };
  },
  computed: {
    routeName() {
      return this.$store.state.routeName;
    },
    newFriendsNum() {
      return this.$store.state.redPoint.newFriendsNum;
    },
  },
  watch: {
    searchKey(ov, nv) {
      this.tempGroup = this.groupQuery(
        Object.values(this.$store.state.groupList),
        ov
      );
      this.tempFriend = this.friendsQuery(
        Object.values(this.$store.state.friendList),
        ov
      );
      this.resultFilter();
    },
    showAll() {
      this.resultFilter();
    }
  },
  methods: {
    resultFilter() {
      let friendLength = this.tempFriend.length;
      let groupLength = this.tempGroup.length;
      this.allLength = friendLength + groupLength;
      if (!this.showAll) {
        if (friendLength > 5) {
          this.friendsResult = this.tempFriend.slice(0, 5);
          this.groupResult = [];
        } else {
          this.friendsResult = this.tempFriend;
          this.groupResult = this.tempGroup.slice(0, 5 - friendLength);
        }
      } else {
        this.friendsResult = this.tempFriend;
        this.groupResult = this.tempGroup;
      }
    },
    clickFriend(item, type) {
      item.fromType=type
      this.$emit("detailHandler", item);
    },
    clickHistory(item) {
      this.detailId = item.verifyId;
      this.$http.getVerifyDetail({ verifyId: item.verifyId }).then(
        data => {
          data.headImg = data.avatar;
          data.verifyId = item.verifyId;
          this.$parent.showDetail(data, 2);
        },
        () => {}
      );
    },
    //添加群聊成功自动跳转到新群聊天窗口页面
    groupJump(groupId) {
      var item = window.getChatInfo(1, groupId);
      var newChat = {
        img: item.img,
        lastReadId: 1,
        mId: 1,
        name: item.name,
        paramId: item.id,
        fromType: 1,
        msgType: 1,
        preview: "",
        userTime: new Date().getTime()
      };
      group.getGroupAll(true);
      this.$store.commit("SET_ROUTE_NAME", "chat"); 
      setTimeout(() => {

        let sessionCache= this.$store.state.session.record;
        for(let key in sessionCache){
          if(sessionCache[key].isActivity){
            sessionCache[key].isActivity=false;
          }        
        }
        newChat.isActivity=true;

        this.$store.commit("UPDATE_CURRENT_SESSION", newChat);
      }, 500);
    },
    keywordDelete() {
      this.searchKey = "";
    },
    //群组模糊搜索
    groupQuery(list, keyWord) {
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        var item = list[i],
          tempName = item.groupName,
          tempId = item.groupId;
        if (item.groupName && item.groupId) {
          let m = PinyinMatch.match(item.groupName, keyWord);
          if (m || (item.groupId + "").indexOf(keyWord) >= 0) {
            if (m) item["tempName"] = this.redFont(tempName, m[0], m[1]);
            else item["tempName"] = tempName;
            var findId = (tempId + "").split(this.searchKey);
            tempId = findId.join(
              '<span class="search-key">' + this.searchKey + "</span>"
            );
            item["tempId"] = tempId;
            arr.push(item);
          }
        }
      }
      if (keyWord == "") arr = list;
      return arr;
    },
    //联系人模糊搜索
    friendsQuery(list, keyWord) {
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        var item = list[i],
          tempName = item.notes || item.nickName || item.userName,
          tempalias = item.alias;
        if (item.nickName || item.alias) {
          let m = PinyinMatch.match(tempName, keyWord);
          if (m || (item.alias + "").indexOf(keyWord) >= 0) {
            if (m) item["tempName"] = this.redFont(tempName, m[0], m[1]);
            else item["tempName"] = tempName;
            var findId = (tempalias + "").split(this.searchKey);
            tempalias = findId.join(
              '<span class="search-key">' + this.searchKey + "</span>"
            );
            item["tempalias"] = tempalias;
            arr.push(item);
          }
        }
      }
      if (keyWord == "") arr = list;
      return arr;
    },
    redFont(str, start, end) {
      return (
        str.substring(0, start) +
        '<span class="search-key">' +
        str.substring(start, end + 1) +
        "</span>" +
        str.substring(end + 1)
      );
    },
    initNewFriendsList(){
      //请求网络
      let nFriendList=sessionUtil.getNewFirendListSessionStorage();
      this.newFriendsList=nFriendList;
      // this.verifyHistory=nFriendList;
    },
    initFriendsList(){
      //请求网络
      friend.getFriendAll(true).then(data=>{
        this.sortFriends= Util.sortByLetter(this.$store.state.friendList); 
      });
      this.sortFriends= Util.sortByLetter(this.$store.state.friendList); 
    },
    initGroupsList(){
      //请求网络
      group.getGroupAll(true).then(data=>{
        this.$store.commit("SET_GROUP_LIST", data);
        this.sortGroups= Util.sortByLetter(this.$store.state.groupList, "group");
      });
      this.sortGroups= Util.sortByLetter(this.$store.state.groupList, "group");
    }
  },
  mounted() {
    // console.log(this.$options.name+" 被加载");
    this.initNewFriendsList();
    this.initFriendsList();
    this.initGroupsList();
    this.$store.state.activityComponents[this.$options.name]=this;//注册
    // this.verifyHistory=nFriendList;
  },
  destroyed(){
    // console.log(this.$options.name+" 被销毁");
    delete this.$store.state.activityComponents[this.$options.name] ; //销毁
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var";
//添加好友弹窗
.sort-letter {
  position: relative;
  // margin-top: 10px;
  padding-left: 15px;
  line-height: 22px;
  font-size: 14px;
  background: #f7f8fd;
  color: #8E959F;
}
.search-box {
  .search-input {
    padding: 0 32px;
    z-index: 11;
    width: 254px;
    height: 29px;
    input{
      font-size: 14px;
    }
    .search-boxinput{
      padding: 0 22px;
    }
  }
}
.default{
  position:absolute;
  top:0;left:0;
}
.menu{
  width: 140px;
  height: 32px;
  // background: #FFFFFF;
  background: #FFFFFF url(../assets/images/icon/friends.png) no-repeat;
  border: 1px solid $color-theme;
  border-radius: 16px;
  line-height: 32px;
  color: $color-theme;
  background-position: 11px 5px;
&.active {
    color: #FFFFFF;
    // background: ;
    background:$color-theme url(../assets/images/icon/friend.png) no-repeat;
    background-position: 11px 5px;
  }
}
.menu2{
  width: 140px;
  height: 32px;
  // background: #FFFFFF;
  background:#FFFFFF url(../assets/images/icon/groups.png) no-repeat;
  border: 1px solid $color-theme;
  border-radius: 16px;
  line-height: 32px;
  color: $color-theme;
  background-position: 11px 5px;
&.active {
    color: #FFFFFF;
    // background: ;
    background:$color-theme url(../assets/images/icon/group.png) no-repeat;
    background-position: 11px 5px;
  }
}
</style>
