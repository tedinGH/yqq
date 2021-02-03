<template>
  <div class="floatR">
	  <button class="get-code" type="button" @click="getCode" :disabled="isClick">{{txt}}</button>
  </div>
</template>
<script>
  import api from '@/api'
  import { validate } from '@/utils/validate';
  export default {
    data (){
      return {
        isClick: false,
        txt: "获取验证码"
      }
    },	
    props: {
      value: {
        type: String
      },
      indx: {
        type: String
      },
      codeKey: {
        type: Boolean
      }
    },
    computed:{
      idxCode() {
        return this.indx;
      },
      selectionCodeKey() {
        return this.$store.state.selectionCodeKey;
      }
    },			
    methods: {
      getCode() {
        if(!validate.isPhone(this.value)) { 
          app.myalert(this.$t('msg').tip.phoneError);
          return;
        }
        if(this.codeKey){
          this.$parent.showcode(1);
        } else {
          this.getCodeApi();
        }
      },
      getCodeApi() {
        let obj = {
          mobileNo: this.value,
          indx: this.idxCode
        }
        if (this.codeKey) {
          obj.selectionCodeKey = this.selectionCodeKey;
          api.getSmsCodeNo(obj).then(
            data => {
              app.myalert(data);
              this.isClick = true;
              this.resetCode();
            },() => {}
          )
        } else {
          obj.selectionCodeKey = this.selectionCodeKey;
          api.getSmsCode(obj).then(
            data => {
              app.myalert(data);
              this.isClick = true;
              this.resetCode();
            },() => {}
          )
        }
      },
      resetCode() {
        let second = 60,
          timer = null;
        timer = setInterval(() => {
          second --;
          if (second > 0) {
            this.txt = '(' + second + 's)';
          } else {
            clearInterval(timer);
            this.txt = this.$t('msg').tip.codeText;
            this.isClick = false;
          }
        }, 1000)
      }
    },
    mounted(){
      this.txt = this.$t('msg').tip.codeText;
    }
  }
</script>

<style lang="scss" scoped>
.floatR{
  position: absolute;
  top: 0;
  right: 0;
  button.get-code {
    position: absolute;
    top: 1.05rem;
    right: 0;
    height: .43rem;
    line-height: .43rem;
    width: 1.57rem;
    font-size: .28rem;
    text-align: center;
    color:#46B4AA;
    border: 0;
    background: transparent;
    outline: none;
    border-left: 1px solid #d9d9d9;
  }
}
</style>




