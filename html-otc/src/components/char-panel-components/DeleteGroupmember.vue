<template>
<Popup :hide-close="true" :hideHeader='true' :radius="'10'" v-if="deleteGroupmember.show">
        <div class="content" @click.stop="" slot="body">
          <div>
            <span class="affirm">{{ $t("msg.group.content") }}</span> 
            <div class="isforbid-box">
              <div v-if="!isforbid" style="width: 16px;height: 15px; margin-right:20px;"><img ref="isforbid"  src="../../assets/images/icon/select.png" @click="checkout" class="isforbid"></div>
              <div v-if="isforbid" style="width: 16px;height: 15px; margin-right:20px;"><img ref="isforbid"  src="../../assets/images/icon/select-blue.png" @click="checkout" class="isforbid"></div>
              <div style="margin-top:5px">{{ $t("msg.group.groupagain") }}</div>
            </div>
          </div>
          <div class="btn">
            <button class="cancel" @click="closeConfirm ">
            {{ $t("msg.common.cancel") }}
            </button>
            <button class="ensure" @click="deleteGroupUser(deleteGroupmember.id)">
              {{ $t("msg.common.ensure") }}
            </button>
          </div>
        </div>
      </Popup>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DeleteGroupmember",
  data() {
    return {
      isforbid: false
    };
  },
  computed: {
    ...mapGetters(["userId","deleteGroupmember",'currentSession'])
  },
  methods: {
      closeConfirm(){
        this.$store.commit("SET_DELETEGROUPMEMBER", {});
        this.isforbid=false
      },
      checkout(){
      this.isforbid=!this.isforbid
    },
     deleteGroupUser(id) {
      let isForbid 
      if(this.isforbid){
          isForbid = 1
      }else{
          isForbid = 0
      }
      this.$http
        .deleteGroupUser({
          groupId: this.currentSession.paramId,
          inviter: id,
          isForbid:isForbid
        })
        .then(
          () => {
            this.$store.dispatch("getGroupMember", { groupId: this.currentSession.paramId });
            this.$store.commit("SET_DELETEGROUPMEMBER", {});
            this.$store.dispatch("setLayout", ["", "", false]);
          },
          () => {}
        );
      this.isforbid=false
    },
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var";
.content{
  width: 420px;
  height: 200px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
  
  border-radius: 8px;
  padding-top: 56px;
    .affirm{
      display: block;
      margin-left: 20px;
      text-align: left;
      }
    .isforbid-box{
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      height: 100%;
      align-items:center;
      .isforbid{
          cursor: pointer;
          display: inline-block;
      }
    }
    .btn{
      display: flex;
      margin:33px 40px 18px 40px;
      justify-content:space-between;
      .cancel{
      width:78px;
      height:34px;
      color:$color-theme;
      background: #fff;
      border:1px solid $color-theme;
      border-radius:5px;
      }
      .ensure{
        width:78px;
        height:34px;
        color: #fff;
        background:$color-theme;
        border:1px solid $color-theme;
        border-radius:5px;
      }
    }
  }
</style>
