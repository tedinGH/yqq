<template>
  <div class="floatR">
	  <button class="get-code" type="button" @click="getCode" :disabled="isClick">{{txt}}</button>
    <select-code ref="code" @codeConfirm="confirmHandler"></select-code>
  </div>
</template>

<script>
  import api from '@/api'
  import { validate } from '@/utils/validate';
  import SelectCode from '@/components/common/CodeComponent.vue'

  export default {
    data (){
      return {
        isClick: false,
        txt: "获取验证码",
        locales: {}
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
    components: {
      SelectCode
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
        if(!validate.isEmail(this.value)) { 
          this.$toast(this.locales.emailError);
          return;
        }

        if(this.codeKey){
          this.$refs.code.showcode();
        } else {
          this.getCodeApi();
        }
      },
      confirmHandler() {
        this.getCodeApi();
      },
      getCodeApi() {
        let obj = {
          email: this.value,
          indx: this.idxCode
        }

        if (this.codeKey) {
          obj.selectionCodeKey = this.selectionCodeKey;
          api.getEmailCodeNo(obj).then(
            data => {
              this.$toast(data);
              this.isClick = true;
              this.resetCode();
            },() => {}
          )
        } else {
          api.getEmailCode(obj).then(
            data => {
              this.$toast(data);
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
            this.txt = this.locales.resend+'(' + second + 's)';
          } else {
            clearInterval(timer);
            this.txt = this.locales.codeText;
            this.isClick = false;
          }
        }, 1000)
      }
    },
    mounted(){
      this.locales = this.$store.state.langData;
      this.txt = this.locales.codeText;
    }
  }
</script>




