<template>
  <div class="linebox"  @click.stop="">
    <div class="text">The current state has been switched to "leave"</div>
    <div class="btn">
      <div class="recover" @click="recover">Back online</div>
      <div class="know" @click="know">I konw</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "linebox",
    data() {
      return {
      
      }
    },
    methods: {
      know(){
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      recover(){
        this.$api.setchatstatus({status:0}).then(
            res=>{
              if(res.code==0){
                this.$store.commit("SET_ONLINE", true);
                window.sessionStorage.setItem('status',0);
              }
            }
          )
        this.$store.dispatch("setLayout", ["", "", false]);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .linebox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 393px;
    height: 170px;
    background: rgba(255, 255, 255, 0.99);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    z-index: 9999;
    .text{
      margin-top:60px ;
      text-align: center;
    }
    .btn{
      display: flex;
      margin-top:44px ;
      justify-content: flex-end ;
      div{
        margin-right: 25px;
        text-align: center;
        line-height: 34px;
      }
      .know{
        width: 78px;
        height: 34px;
        background: $color-theme;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
      }
      .recover{
        width: 98px;
        height: 34px;
        color: $color-theme;
        border: 1px solid $color-theme;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
</style>