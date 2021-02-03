<template>
  <div class="modal-bg" v-if="show" @contextmenu.prevent="click" @click="click">
    <div class="modal-container" @click.stop="stop" @contextmenu.prevent="stop">
      <ul id="example-1">
        <li v-for="(item,index) in menuList" :key="index" @click="method(item)">
          <div class="modal-header" v-if="item.header">{{ item.title }}</div>
          <div class="modal-bottom" v-else-if="item.bottom">{{ item.title }}</div>
          <div class="modal-middle" v-else>{{ item.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { actionApi } from "@/api";
  export default {
    name: "MouseRight",
    data: {
      del: true
    },
    props: {
      event: {},
      item: {},
      title:{}
    },
    data() {
      return {
        menuList: [],
        show: true,
      };
    },
    mounted() {

    },
    methods: {
      click(event) {
        this.close(this);
        event.cancelBubble = true;
      },
      stop(event) {
        event.cancelBubble = true;
      },
      close(that) {
        that.$emit("destroy");
        that.show = false;
      },
      method(item) {
        this.$options.methods[item.method](item.item, this);
      },
      /**
       * 发起聊天
       */
      launchChat(item, that) {
        actionApi.sendMsg({
          msgType: 10,
          toId: item.chatId,
          chatType: item.chatType,
          msg: JSON.stringify({
            type: 0
          })
        });
        this.close(that);
      },
      /**
       * 强制聊天
       */
      forcedChat(item, that) {
        actionApi.sendMsg({
          msgType: 10,
          toId: item.chatId,
          chatType: item.chatType,
          msg: JSON.stringify({
            type: 1
          })
        });
        this.close(that);
      },
      location(event) {
        let that = this;
        this.menuList.push({
          title: "发起会话",
          method: "launchChat",
          item: that.item
        });
        this.menuList.push({
          title: "强制聊天",
          method: "forcedChat",
          item: that.item
        });
        setTimeout(() => {
          let node = document.querySelector(".modal-container");
          node.style.left = this.event.x + node.clientWidth / 2 + 5 + "px";
          node.style.top = this.event.y + node.clientHeight / 2 + 5 + "px";
        }, 5);
      },
      //回复语右键菜单
    }
  };
</script>
<style lang="scss" scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 10;
  }

  .modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    transform: translate(-50%, -50%);
  }

  .modal-header {
    height: 41px;
    width: 108px;
    line-height: 41px;
    padding: 0 5px;
    border: 1px solid #DCE0E7;
    border-bottom: 0px ;
    text-align: center;
    color: #2c2c2c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius:10px 10px 0 0;
    cursor: pointer;
    &:hover {
      background: #f0f4f8;
    }
  }
   .modal-bottom {
    height: 41px;
    width: 108px;
    border: 1px solid #DCE0E7;
    line-height: 41px;
    padding: 0 5px;
    text-align: center;
    color: #2c2c2c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    &:hover {
      background: #f0f4f8;
    }
  }

  .modal-main {
    padding: 15px 40px;
  }
</style>