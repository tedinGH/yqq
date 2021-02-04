<template>
  <transition name="scale-x">
    <Popup :title="$t('msg.tip.prompt')" :radius="'8'" :height="'60'" :lineheight="'60'">
      <div class="prompt" slot="body">
        <div class="text">{{$t('msg.tip.promptfriend')}}</div>
        <div class="display-flex" style="justify-content:flex-end;width:420px">
          <button class="search-btn cancel" @click="cancel()">
            {{ $t("msg.common.cancel")}}
          </button>
          <button class="search-btn" @click="doSearch()">
            {{ $t("msg.common.confirms") }}
          </button>
        </div>
      </div>
    </Popup>
  </transition>
</template>
<script>
  import Vue from "vue";
  import {mapGetters} from "vuex";
  export default {
    name: "prompt",
    data() {
      return {
    
      };
    },
    components: {
      
    },
    computed:{
      ...mapGetters(["friendcard"]),
  },
    methods: {
      cancel(){
        this.$store.dispatch("setLayout", ["", "", false]);
      },
      doSearch(){
        this.$store.dispatch("setLayout", ["uc", "if", true]);
      }
    },
    mounted(){
      }
      
  };

</script>

<style lang="scss" scoped>
  @import "../../assets/css/var";
  .prompt{
      width: 420px;
      height: 145px;
      background: #FFFFFF;
      
      border-radius: 8px;
      .text{
        padding: 0 20px;
        margin: 0 0 40px 0;
        font-size: 14px;
      }
      .search-btn{
      width: 95px;
      height: 40px;
      background: $color-theme;
      border-radius: 4px;
      margin: 20px 20px 0 10px;
      &.cancel{
        background: #fff;
        color: $color-theme;
        border: solid 1px $color-theme;
      }
    }
  }

</style>
