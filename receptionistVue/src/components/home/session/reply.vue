<template>
  <div class="reply">
    <div class="tab1">
      <div class="stock" @click="cut1">
        <img src="../../../assets/img/chat/reply.png">
        {{$t('msg.chatPanel.reply')}}
      </div>
      <div class="question" @click="cut2">
        <img src="../../../assets/img/chat/question.png">
        {{$t('msg.chatPanel.question')}}
      </div>
      <div class="strip" ref="strip"></div>
    </div>
    <div class="body">
      <div v-if="tab1==1">
        <div class="tab-reply">
          <div class="personage" :class="{active:tabreply==1}" @click="cuttabreply">{{$t('msg.chatPanel.response')}}
          </div>
          <div class="general" :class="{active:tabreply==2}" @click="cuttabreply">{{$t('msg.chatPanel.generalres')}}
          </div>
        </div>
        <div v-if="tabreply==1">
          <ul class="body-list" v-scrollBar>
            <li class="group" v-for="(item,idx) in response" :key="idx">
              <div class="open" @click="open(item)" @contextmenu.prevent="onContextmenu($event,item)"><img class="img"
                  :class="{active:item.open}" src="../../../assets/img/chat/right.png">{{item.groupingName}}</div>
              <ul v-show="item.open" v-scrollBar>
                <div class="answer" v-for="(i,index) in (item.child)" :key="index" draggable="true"
                  @dragstart="drops($event,i.content)" @dblclick="filling(i.content)" @click.stop="enter(i)"
                  @contextmenu.prevent="onContextmenu2($event,i)">{{i.title}}
                  <div class="hove" v-if="i.show" v-html="i.content"></div>
                </div>
              </ul>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="body-list" v-scrollBar>
            <li class="group" v-for="(item,idx) in general" :key="idx" v-scrollBar>
              <div class="open" @click="open(item)"><img class="img" :class="{active:item.open}"
                  src="../../../assets/img/chat/right.png"> {{item.groupingName}}</div>
              <ul v-show="item.open" v-scrollBar>
                <div class="answer" v-for="(i,index) in (item.child)" :key="index" draggable="true"
                  @dragstart="drops($event,i.content)" @dblclick="filling(i.content)" @click.stop="enter(i)">{{i.title}}
                  <div class="hove" v-if="i.show" v-html="i.content"></div>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="tab-tabquestion">
          <div class="familiar" :class="{active:tabquestion==1}" @click="cuttabquestion">
            {{$t('msg.chatPanel.familiar')}}
          </div>
          <div class="hot" :class="{active:tabquestion==2}" @click="cuttabquestion">{{$t('msg.chatPanel.hot')}}</div>
        </div>
        <div class="group2" v-if="tabquestion==1">
          <ul v-scrollBar>
            <div class="answer" v-for="(item,idx) in familiar" :key="idx">{{item.title}}
            </div>
          </ul>
        </div>
        <div class="group2" v-else v-scrollBar>
          <ul v-scrollBar>
            <div class="answer" v-for="(item,idx) in hot" :key="idx">{{item.title}}</div>
          </ul>
        </div>
      </div>
    </div>
    <Popup :hideClose="true" v-if="layout.module=='session'&&layout.child=='delete'" :radius=10>
      <div class="delete" slot="body">
        <div class="content" v-if="deleteto.type==0">{{$t('msg.chatPanel.Confirm')}}</div>
        <div class="content" v-else>{{$t('msg.chatPanel.Confirm2')}}</div>
        <div class="btns">
          <button class="btn cancel" @click="cancel">{{$t('msg.common.cancel')}}</button>
          <button class="btn confirm" @click="confirm()">{{$t('msg.common.delete')}}</button>
        </div>
      </div>
    </Popup>
    <Popup title="编辑" :hideClose="false" v-if="layout.module=='session'&&layout.child=='compile'" :radius=10>
      <div class="seal" slot="body">
        <input type="text" class="title" v-model="compileto.title">
        <textarea class="content" v-model="compileto.content"></textarea>
        <div class="btn" @click="compile">{{$t('msg.common.Save')}}</div>
      </div>
    </Popup>
    <Popup :hideClose="false" v-if="layout.module=='session'&&layout.child=='compile2'" :radius=10>
      <div class="seal" slot="body">
        <input type="text" class="title" v-model="compileto.title">
        <div class="btn" @click="compile2">{{$t('msg.common.Save')}}</div>
      </div>
    </Popup>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapGetters } from "vuex";
  import { Util } from "@/tools/utils";
  export default {
    name: "reply",
    data() {
      return {
        tab1: 1,
        tabreply: 1,
        tabquestion: 1,
        response: [],
        general: [],
        menuShow: false
      }
    },
    computed: {
      ...mapGetters(["userInfo", 'hot', 'familiar', 'deleteto', 'layout', 'compileto']),
    },
    methods: {
      //切换回复
      cut1() {
        if (this.tab1 == 1) {
          return
        } else {
          this.tab1 = 1
          this.$refs.strip.style.left = '30px'

        }
      },
      cuttabreply() {
        if (this.tabreply == 1) {
          this.tabreply = 2
          this.getdata2()
        } else {
          this.tabreply = 1
          this.getdata()
        }
      },
      //切换问题库
      cut2() {
        if (this.tab1 == 2) {
          return
        } else {
          this.tab1 = 2
          this.$refs.strip.style.left = '182px'
        }
      },
      cuttabquestion() {
        if (this.tabquestion == 1) {
          this.tabquestion = 2
          this.getdata4()
        } else {
          this.tabquestion = 1
          this.getdata3()
        }
      },
      open(item) {
        item.open = !item.open
      },
      drops(event, data) {
        event.dataTransfer.setData('text/plain', data)
      },
      filling(item) {
        let regex = /(<([^>]+)>)/ig
        item = item.replace(regex, "")
        this.$parent.editFocus=false
        Util.insert(this.$parent.$refs.editMsg, item, false);
      },
      enter(i) {
        if (i.show == false) {
          i.show = true
          this.$forceUpdate()
          return
        }
        if (i.show == true) {
          i.show = false
          this.$forceUpdate()
          return
        }
      },
      //分组右键菜单
      onContextmenu(event, item) {
        this.$contextmenu({
          items: [{
              label: "Edit",
              onClick: () => {
                let obj = {
                  id: item.id,
                  title: item.groupingName,
                }
                this.store.commit("SET_COMPILETO", obj);
                this.store.dispatch("setLayout", ["session", "compile2", false]);
              }
            },
            {
              label: "Delete",
              onClick: () => {
                let obj = {
                  id: item.id,
                  type: 1
                }
                this.store.commit("SET_DELETETO", obj);
                this.store.dispatch("setLayout", ["session", "delete", false]);
              }
            },
          ],
          event,
          zIndex: 3,
          minWidth: 60
        });
        return false;
      },
      //详情右键菜单
      onContextmenu2(event, item) {
        this.$contextmenu({
          items: [{
              label: "Edit",
              onClick: () => {
                let obj = {
                  id: item.id,
                  groupingId: item.groupingId,
                  title: item.title,
                  content: item.content
                }
                this.store.commit("SET_COMPILETO", obj);
                this.store.dispatch("setLayout", ["session", "compile", false]);
              }
            },
            {
              label: "Delete",
              onClick: () => {
                let obj = {
                  id: item.id,
                  groupingId: item.groupingId,
                  type: 0
                }
                this.store.commit("SET_DELETETO", obj);
                this.store.dispatch("setLayout", ["session", "delete", false]);
              }
            },
          ],
          event,
          zIndex: 3,
          minWidth: 60
        });
        return false;
      },
      //取消
      cancel() {
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      //确认删除
      confirm() {
        let data = {
          id: this.deleteto.id
        }
        if (this.deleteto.type == 0) {
          this.$api.deletedetails(data).then(
            res => {
              if (res.state == 'success') {
                this.response.forEach(e => {
                  if (e.id == this.deleteto.groupingId) {
                    for (let i = 0; i < e.child.length; i++) {
                      if (e.child[i].id == this.deleteto.id) {
                        e.child.splice(i, 1);
                      }
                    }
                  }
                })
                this.$forceUpdate()
                let obj = {}
                this.$store.commit("SET_DELETETO", obj)
                this.$store.dispatch("setLayout", ["", "", false]);
              }

            }
          )
        } else {
          this.$api.deletegrouping(data).then(
            res => {
              if (res.state == 'success') {
                for (let i = 0; i < this.response.length; i++) {
                  if (this.response[i].id == this.deleteto.id) {
                    this.response.splice(i, 1);
                  }
                }
                this.$forceUpdate()
                let obj = {}
                this.$store.commit("SET_DELETETO", obj)
                this.$store.dispatch("setLayout", ["", "", false]);
              }
            }
          )
        }

      },
      //编辑内容
      compile() {
        let data = {
          id: this.compileto.id,
          content: this.compileto.content,
          title: this.compileto.title,
        }
        this.$api.editdetails(data).then(
          res => {
            if (res.state == 'success') {
              this.response.forEach(e => {
                if (e.id == this.compileto.groupingId) {
                  for (var i = 0; i < e.child.length; i++) {
                    if (e.child[i].id == this.compileto.id) {
                      e.child[i].content = this.compileto.content
                      e.child[i].title = this.compileto.title
                    }
                  }
                }
              })
              this.$forceUpdate()
              let obj = {}
              this.$store.commit("SET_DELETETO", obj)
              this.$store.dispatch("setLayout", ["", "", false]);
            }
          }
        )
      },
      //编辑分组
      compile2() {
        let data = {
          id: this.compileto.id,
          groupingName: this.compileto.title,
        }
        this.$api.editgrouping(data).then(
          res => {
            if (res.state == 'success') {
              this.response.forEach(e => {
                if (e.id == this.compileto.id) {
                  e.groupingName = this.compileto.title
                }
              })
              this.$forceUpdate()
              let obj = {}
              this.$store.commit("SET_DELETETO", obj)
              this.$store.dispatch("setLayout", ["", "", false]);
            }
          }
        )
      },
      //获取个人回复
      getdata() {
        let personage = {
          userId: this.userInfo.userId,
          replyType: 2
        }
        this.$api.getgrouping(personage).then(
          res => {
            res.list.forEach(v => {
              v.open = false
            })
            res.list.forEach(e => {
              let data = {
                groupingId: e.id
              }
              this.$api.getDetails(data).then(
                res => {
                  res.list.forEach(c => {
                    c.show = false
                  })
                  e.child = res.list
                }
              )
            })
            this.response = res.list
          }
        )
      },
      //通用回复
      getdata2() {
        let general = {
          replyType: 1
        }
        this.$api.getgrouping(general).then(
          res => {
            res.list.forEach(v => {
              v.open = false
            })
            res.list.forEach(e => {
              let data = {
                groupingId: e.id
              }
              this.$api.getDetails(data).then(
                res => {
                  res.list.forEach(c => {
                    c.show = false
                  })
                  e.child = res.list
                }
              )
            })
            this.general = res.list
            // this.$store.commit("SET_GENERALRES", res.list);
          }
        )
      },
      //常见问题
      getdata3() {
        let familiar = {
          companyId: this.userInfo.companyId,
          type: 1
        }
        this.$api.getqueslist(familiar).then(
          res => {
            this.$store.commit("SET_FAMILIAR", res.list);
          }
        )
      },
      //热点问题
      getdata4() {
        let hot = {
          companyId: this.userInfo.companyId,
          type: 2
        }
        this.$api.getqueslist(hot).then(
          res => {
            this.$store.commit("SET_HOT", res.list);
          }
        )
      }
    },
    mounted() {
      this.getdata()
      this.getdata2()
      this.getdata3()
      this.getdata4()
    }
  };
</script>

<style lang="scss" scoped>
  .reply {
    width: 310px;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    border-left: 1px solid #E1E5F1;

    .tab1 {
      height: 67px;
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #DCE0E7;
      display: flex;
      align-items: center;
      position: relative;

      .stock {
        width: 155px;
        text-align: center;
        cursor: pointer;
      }

      .question {
        width: 155px;
        text-align: center;
        cursor: pointer;
      }

      .strip {
        position: absolute;
        width: 102px;
        height: 3px;
        background: $color-theme;
        border-radius: 2px;
        bottom: 0;
        left: 30px;
        transition: .5s ease;
      }
    }

    .body {
      width: 308px;

      .tab-reply {
        width: 100%;
        height: 44px;
        display: flex;
        line-height: 44px;
        background: #fff;
        border-bottom: 1px solid #DCE0E7;
        cursor: pointer;

        .personage {
          width: 50%;
          text-align: center;
          color: #949CA4;
        }

        .general {
          width: 50%;
          text-align: center;
          color: #949CA4;
          border-left: 1px solid #DCE0E7;
        }

        .active {
          color: $color-theme;
        }
      }

      .body-list {
        height: calc(100vh - 171px);
        position: relative;
      }

      .group {
        width: 98%;

        .open {
          cursor: pointer;
          height: 45px;
          line-height: 45px;

          .img {
            margin-left: 10px;
            margin-right: 10px;
            transition: transform .5s;

            &.active {
              transform: rotate(90deg);
            }
          }
        }

        ul {
          max-height: 400px;
          position: relative;

          .answer {
            cursor: pointer;
            margin-left: 18px;
            margin-bottom: 14px;
            color: #949CA4;

            .hove {
              margin: 0 9px;
              padding: 11px 14px;
              font-size: 14px;
              background: linear-gradient(0deg, rgba(234, 237, 242, 1), rgba(255, 255, 255, 1));
              border: 1px solid rgba(225, 229, 241, 1);
              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.24);
              border-radius: 10px;
            }
          }
        }
      }

      .group2 {
        ul {
          padding-top: 25px;
          height: calc(100vh - 171px);
          position: relative;

          .answer {
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 18px;
            margin-right: 10px;
            margin-bottom: 14px;

            &:hover {
              overflow: visible;
              word-wrap: break-word;
              white-space: pre-wrap;
              margin: 0 9px;
              padding: 11px 14px;
              font-size: 14px;
              background: linear-gradient(0deg, rgba(234, 237, 242, 1), rgba(255, 255, 255, 1));
              border: 1px solid rgba(225, 229, 241, 1);
              box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.24);
              border-radius: 10px;
            }
          }
        }
      }

      .tab-tabquestion {
        width: 100%;
        height: 44px;
        display: flex;
        line-height: 44px;
        border-bottom: 1px solid #DCE0E7;
        cursor: pointer;

        .familiar {
          width: 50%;
          text-align: center;
          color: #949CA4;
        }

        .hot {
          width: 50%;
          text-align: center;
          color: #949CA4;
          border-left: 1px solid #DCE0E7;
        }

        .active {
          color: $color-theme;
        }
      }
    }

    .delete {
      width: 400px;
      padding: 15px 15px 10px 15px;

      .content {
        margin-top: 59px;
        margin: auto;
        font-size: 14px;
        text-align: center;
      }

      .btns {
        margin-top: 45px;
        margin-bottom: 10px;
        text-align: right;

        .btn {
          display: inline-block;
          margin: 0;
          padding: 10px 25px;
          background: #fff;
          border: 1px solid $color-theme;
          border-radius: 5px;
          color: $color-theme;
          cursor: pointer;
        }

        .confirm {
          margin-left: 25px;
          border-color: $color-theme;
          background-color: $color-theme;
          color: #fff;
        }
      }
    }

    .seal {
      width: 420px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        width: 380px;
        height: 34px;
        border: 1px solid rgba(220, 224, 231, 1);
        border-radius: 5px;
        margin-top: 24px;
        padding: 10px;
      }

      .content {
        resize: none;
        outline: none;
        width: 380px;
        height: 92px;
        border: 1px solid rgba(220, 224, 231, 1);
        border-radius: 5px;
        margin-top: 12px;
        padding: 10px;
      }

      .btn {
        width: 78px;
        height: 34px;
        background: #7F99E3;
        color: #fff;
        text-align: center;
        line-height: 34px;
        border-radius: 5px;
        margin-top: 29px;
        cursor: pointer;
      }
    }
  }
</style>