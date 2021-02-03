<template>
  <div class="toast-box" v-if="text">
    <div class="content">
     <span>{{text}}</span> 
      <div class="btn" @click="close">{{$t("msg.common.ensure")}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  computed: {
    text() {
      return this.$store.state.toastBox;
    }
  },
  methods:{
    close(){
      this.$store.commit("SET_TOAST_BOX", "");
    }
  },
  mounted() {
    
  }
};
</script>
<style  lang="scss" scoped>
.toast-box{
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99999;
  background-color:#fff;
  transform: translate(-50%, -50%);
  border-radius:10px;
  .content{
    width:315px;
    border-radius:10px;
    text-align: center;
    span{
      display: block;
      margin-top:62px ;
    }
    .btn{
      margin: 40px  auto 20px ;
      width:78px;
      height:34px;
      line-height: 34px;
      color: #fff;
      background:rgba(53,146,216,1);
      border:1px solid rgba(53,146,216,1);
      border-radius:5px;
      cursor: pointer
    }
  }
}
</style>