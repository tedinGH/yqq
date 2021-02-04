<template>
  <transition name="scale-x">
    <div
      class="my-popup"
      :class="{ 'group-info': step == 1, 'invite-box': step == 2 }"
      @click.stop="hide"
    >
      <div class="my-popup-content" @click.stop="" v-if="step == 1">
        <h3 class="my-popup-title">{{ $t("msg.newGroup.startChat") }}</h3>
        <span class="my-popup-close" @click="hide"></span>
        <div class="display-flex">
          <!-- <div class="upload-head">
            <label class="lable" for="uploadGroupHead"></label>
            <img class="head" :src="groupHead" v-if="groupHead" />
          </div> -->
          <div class="search-box">
            <div class="search-input">
              <input
                type="text"
                :placeholder="$t('msg.newGroup.enterGroupName')"
                maxlength="20"
                v-model="groupName"
              />
              <i
                class="icon-delete"
                @click="groupName = ''"
                v-show="groupName"
              ></i>
            </div>
          </div>
          <!-- <input
            type="file"
            hidden="true"
            id="uploadGroupHead"
            @change="uploadHead($event)"
            accept=".jpg,.png,.jpeg,.ico,.bmp"
          /> -->
        </div>
        <div class="btn">
        <button class="two-btn cannel"   @click="hide">
            {{ $t("msg.common.cancel") }}
          </button>
        <button class="two-btn comfirm" @click="next">
            {{ $t("msg.common.confirm") }}
          </button>
        </div>
      </div>
      <!-- 邀请 -->
      <div class="my-popup-content" @click.stop="" v-if="step == 2">
        <span class="my-popup-close" @click="hide"></span>
        <div class="left">
        <div class="selected">{{ $t("msg.chatPanel.selected") }}</div>
        <div class="unselected-list">
          <ul class="friend-list" v-scrollBar>
            <li
              class="friend-list-item display-flex"
              v-for="(item, index) in selectList"
              :key="index"
              @click="deleteChecked(item)"
            >
              <img style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.checked">
              <div class="item-left">
              <img class="avatar" :src="global.fileDownUrl + 'compress/' + item.img"  v-if="item.img"  v-headError/>
              <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.headImg"  >
                <span
                  class="name"
                  v-text="item.name"
                  @click="item.isClick = !item.isClick"
                ></span>
                </div>
            </li>
          </ul>
          <div class="btn">
          <button class="two-btn comfirm"  @click="doCreateGroup">
            {{ $t("msg.common.confirm") }}
          </button>
          <button class="two-btn cannel"   @click="hide">
            {{ $t("msg.common.cancel") }}
          </button>
          </div>
        </div>
        </div>
        <div class="right">
          <div class="search-input">
            <input
              type="text"
              :placeholder="$t('msg.menu.search')"
              maxlength="20"
              v-model="keyword"
            />
            <i class="icon-delete" @click="keyword = ''" v-show="keyword"></i>
          </div>
          <div class="unselected-list">
          <ul class="friend-list" v-scrollBar>
            <section v-for="(data, id) in sortSelectList" :key="id">
              <div v-if="data.data && data.data.length" class="sort-letter">
                {{ data.letter }}
              </div>
              <li
                class="friend-list-item display-flex"
                :class="{ active: item.checked, hide: item.temp }"
                v-for="(item, index) in data.data"
                :key="index"
                @click="clickChecked(item)"
              >
                <img style="margin-right:12px" src="../../assets/images/active.png" v-if=" item.checked || item.disable">
                <img style="margin-right:12px" src="../../assets/images/dis.png" v-else>
                <div class="item-left">
                  <img
                    class="avatar"
                    :src="global.fileDownUrl + 'compress/' + item.img"
                    v-headError
                    v-if="item.img" 
                  />
                  <img class="avatar" src="../../assets/images/error-head.png"  v-if="!item.img"  >
                  <span
                    class="select"
                  ></span>
                </div>
                <div class="display-flex-item">
                  <span v-show="keyword == ''">{{ item.name }}</span>
                  <span
                    v-show="keyword != ''"
                    class="name-line-top"
                    v-html="item.tempName"
                  ></span>
                </div>
              </li>
            </section>
          </ul>
        </div> 
        </div>
        <success
          v-model="showSuccess"
          :title="$t('msg.tip.operateSuccess')"
        ></success>
      </div>
    </div>
  </transition>
</template>
<script>
import "@/common/pinyin";
import { mapGetters } from "vuex";
import { Util } from "@/tools/utils";
import { sha1 } from "@/tools/sha1.js";
import { group } from "@/session/group";
import { api } from "@/api";
import { msgUtil} from "@/tools/msgUtil";
export default {
  name: "new-group",
  data() {
    return {
      step: 0,
      groupName: "",
      groupHead: "",
      groupHeadFile: {},
      keyword: "",
      friendList: {},
      forwardResult: {},
      selectList: {},
      sortSelectList:[],
      showSuccess: false,
      isClick: false
    };
  },
  computed: {
    ...mapGetters([
      "userId",
      "userInfo",
      "currentSession",
      "session",
      "invite"
    ]),
    unSelectList() {
      if (!this.keyword) {
        return this.friendList;
      } else {
        let list = [];
        for (let key in this.friendList) {
          let item = this.friendList[key],
          tempId = item.userId;
          let m = PinyinMatch.match(item.name, this.keyword);
          if (m) {
            item["tempName"] = this.redFont(item.name, m[0], m[1])
            list.push(item);
          }
        }
        return list;
      }
    }
  },
  watch: {
    keyword(ov, nv) {
      this.sortList();
    }
  },
  methods: {
    show() {
      this.step = 1;
      this.groupName = "";
      this.groupHead = "";
      this.isClick = false;
    },
    hide() {
      this.$store.dispatch("setLayout", ["", "", false]);
    },
    sortList(){
      this.sortSelectList = Util.sortByLetter(this.unSelectList);
    },
    // uploadHead(event) {
    //   let that = this;
    //   var file = event.target.files[0];

    //   if (file.size > 10 * 1024 * 1024) {
    //     this.$store.commit("SET_TOAST_TEXT", this.$t("msg.tip.imageBig"));
    //     return false;
    //   }

    //   that.groupHeadFile = file;

    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = function() {
    //     let img = new Image();
    //     img.src = this.result;
    //     img.onload = () => {
    //       that.groupHead = this.result;
    //     };
    //   };
    //   event.target.value = "";
    // },
    next() {
      if (
        this.groupName == "" ||
        this.groupName.replace(/(&nbsp;*)|(\s*)/g, "").length == 0
      ) {
        this.$store.commit(
          "SET_TOAST_TEXT",
          this.$t("msg.newGroup.enterGroupName")
        );
        return false;
      }
      this.step = 2;
      this.selectList = {};
      this.friendList = JSON.parse(
        JSON.stringify(this.$store.state.friendList)
      );

      for (let key in this.friendList) {
        let item = this.friendList[key];
        this.$set(this.friendList[key], "checked", false);
        this.$set(this.friendList[key], "disable", false);
        this.$set(this.friendList[key], "isClick", false);
        this.$set(this.friendList[key], "fromType", 0);
        this.$set(this.friendList[key], "img", item.headImg);
        this.$set(
          this.friendList[key],
          "name",
          item.notes || item.nickName || item.userName
        );
        this.$set(this.friendList[key], "paramId", item.userId);
      }

      this.noChecked();
    },
    setGroupHead() {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        let that=this;
      reader.readAsArrayBuffer(that.groupHeadFile);
      reader.onload = function(){
        var data = this.result;
      
            try {
              let a={fileName:that.groupHeadFile.name};
              let dataParams=JSON.stringify(a)
              let myArray=msgUtil.msgEntityToBufferV1(that.$store.getters.token,"/uploadV2/picture.htm",dataParams,data);

              var xml = new XMLHttpRequest();
              xml.open("post", base.imfileUrl+"/apiV1.htm", true);
              xml.send(myArray);
              xml.onreadystatechange = () => {
                //回调函数
                if (xml.status == 200) {
                  setTimeout(() => {
                    var b = xml.responseText;
                    var data = JSON.parse(b);
                    if (data.code == 0) {
                      resolve(data.data);
                    } else {
                      reject();
                    }
                  }, 10);
                }
              };
            } catch (error) {
              console.error(error);
            }
      }
        // this.groupHeadFile.arrayBuffer().then(data=>{
        //     try {
        //       let a={fileName:this.groupHeadFile.name};
        //       let dataParams=JSON.stringify(a)
        //       let myArray=msgUtil.msgEntityToBufferV1(this.$store.getters.token,"/uploadV2/picture.htm",dataParams,data);

        //       var xml = new XMLHttpRequest();
        //       xml.open("post", base.imfileUrl+"/apiV1.htm", true);
        //       xml.send(myArray);
        //       xml.onreadystatechange = () => {
        //         //回调函数
        //         if (xml.status == 200) {
        //           setTimeout(() => {
        //             var b = xml.responseText;
        //             var data = JSON.parse(b);
        //             if (data.code == 0) {
        //               resolve(data.data);
        //             } else {
        //               reject();
        //             }
        //           }, 10);
        //         }
        //       };
        //     } catch (error) {
        //       console.error(error);
        //     }
        // })
        
      });
    },
    setGroupHead1() {
      return new Promise((resolve, reject) => {
        var newform = new FormData();
        newform.append("mFile", this.groupHeadFile);
        newform.append("deviceType", "2");
        newform.append("cval",sha1(this.$store.getters.token + Date.parse(new Date())));
        newform.append("uid", this.userId);
        newform.append("privateFile", true);
        newform.append("rtime", Date.parse(new Date()));
        var xml = new XMLHttpRequest();
        xml.open("post", base.imfileUrl + "/upload/picture.htm", true);
        xml.setRequestHeader("token", this.$store.getters.token);
        xml.send(newform);
        xml.onreadystatechange = () => {
          //回调函数
          if (xml.status == 200) {
            setTimeout(() => {
              var b = xml.responseText;
              var data = JSON.parse(b);
              if (data.code == 0) {
                resolve(data.data);
              } else {
                reject();
              }
            }, 10);
          }
        };
      });
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
    noChecked() {
      if(this.invite.groupId!=""){
        group.getGroupMember(this.invite.groupId).then(userList =>{
            for (let key in userList) {
              let item = userList[key];
              if (this.friendList[item.userId])
                this.friendList[item.userId].disable = true;
            }
        });
      }
      this.sortList();
    },
    clickChecked(item) {
      if (item.disable) return;

      if (!item.checked) {
        this.$set(this.selectList, item.paramId, item);
        item.checked = true;
      } else {
        this.deleteChecked(item);
        item.checked = false;
      }
    },
    deleteChecked(item) {
      this.$delete(this.selectList, item.paramId);
      if (this.friendList[item.paramId])
        this.friendList[item.paramId].checked = false;
    },
    getCheckedArr(list) {
      var result = "";
      if (list) {
        for (var key in list) {
          result += list[key].paramId + ",";
        }
        result = result.substr(0, result.length - 1);
      } else {
        result = "";
      }
      return result;
    },
    doCreateGroup() {
      let ids = this.getCheckedArr(this.selectList);

      if (!ids) {
        this.$store.commit("SET_TOAST_TEXT", this.$t("msg.newGroup.info"));
        return false;
      }

      if (this.isClick) return;

      this.isClick = true;

      if (this.groupHead) {
        this.$store.commit(
          "SET_TOAST_TEXT",
          this.$t("msg.newGroup.waitUpload")
        );
        this.setGroupHead().then(
          data => {
            this.create(data, ids);
          },
          () => {
            this.$store.commit(
              "SET_TOAST_TEXT",
              this.$t("msg.newGroup.uploadFail")
            );
            this.create("", ids);
          }
        );
      } else {
        this.create("", ids);
      }
    },
    create(avatar, ids) {
      var postData = {
        groupName: this.groupName,
        groupDesc: this.groupName,
        groupAvatar: avatar,
        ids: ids
      };

      this.$http.createGroup(postData).then(
        data => {
          let paramId = data.groupId
          api.getGroupSetting({groupId: data.groupId}).then(data=>{
            var newChat = {
            img: data.avatar,
            lastReadId: 1,
            mId: 1,
            name: this.groupName,
            paramId: paramId,
            fromType: 1,
            msgType: 1,
            preview: "",
            userTime: new Date().getTime()
          };
          this.$store.commit("UPDATE_SESSION", newChat);
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
          this.step = 0;
          this.$store.dispatch("setLayout", ["", "", false]);
          group.getGroupAll(true).then(data=>{
            this.$store.commit("SET_GROUP_LIST", data);
          })
        })
        },
        data => {}
      );
    }
  },
  mounted() {
    this.show();
    this.$store.commit("SET_INVITE", {
          show: false,
          groupId:''
        });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.group-info {
  .my-popup-content {
    width: 420px;
    height: 200px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    border-radius: 8px;
    .search-box {
      margin-top: 8px;
      padding: 15px 22px;
      .search-input{
      width: 379px;
      height: 44px;
      background: #F7F8FD;
      border: 1px solid #E1E6EC;
      border-radius: 4px;
      input{
        height: 44px;
        font-size: 14px;
      }
      }
    }
      .btn{
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      .cannel{
        margin-right: 10px;
      }
      .comfirm{
        margin-right: 20px;
      }
    }
  }
}
.invite-box{
  .my-popup-content{
    width: 731px;
    height: 492px;
    background:  #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
    
    border-radius: 8px;
    display: flex;
    .left{
      width: 260px;
      height: 492px;
      background: #FFFFFF;
      .btn{
      display: flex;
      justify-content:center;
      margin-top: 40px;
      width: 100%;
      .comfirm{
        height: 40px;
        width: 115px;
        margin-left: 10px;
      }
      .cannel{
        height: 40px;
        margin-left: 10px;
        margin-right: 10px;
        width: 115px;
      }
    }
      .selected{
        color: #5F717F;
        text-align: left;
        margin: 40px 0 30px 0;
        padding-left: 20px;
      }
      .unselected-list{
        border-top:0px;
        .friend-list{
          border-top:0px;
          height: 305px;
          .friend-list-item{
            padding-left: 20px;
          }
        }
      }
    }
    .right{
      width: 471px;
      height: 492px;
      .search-input{
        margin-top:27px ;
        margin-left: 40px;
        width: 391px;
        height: 34px;
        background: #F4F7FA;
        border-radius: 17px;
        input{
          width: 391px;
          height: 34px;
          background: #F4F7FA;
          border: 1px solid #E1E6EC;
          border-radius: 17px;
          padding: 15px;
        }
        .icon-delete {
        position: absolute;
        top: 44px;
        right: 55px;
        display: block;
        margin-top: -12px;
        width: 24px;
        height: 24px;
        background-image: url(../../assets/images/search/close.png);
        background-size: 100% 100%;
        cursor: pointer;
        opacity: .7;
        &:hover {
          background-image: url(../../assets/images/search/close.png);
          opacity: 1;
        }
      }
      }
      .unselected-list{
        border-top:0px;
        .friend-list{
          border-top:0px;
          height: 426px;
        }
      }
    }
  }
  .sort-letter{
    position: relative;
    margin-top: 10px;
    padding-left: 33px;
    line-height: 22px;
    font-size: 16px;
    color: #999;
    text-align:left;
  }
}
</style>
