<template>
  <div class="setpassword">
    <div class="info"><span>old password： <input class="input-text" placeholder="Please enter old password" type="text" v-model="old"></span></div>
    <div class="info">
      <span>new password： <input class="input-text" type="text" v-model="news" placeholder="Please enter a password containing 8-16 digits and letters"></span>
    </div>
    
    <div class="info"><span>confirmed password： <input class="input-text" type="text" v-model="confirm" placeholder="Please enter the confirmation password" ></span></div>
    <div class="save" @click="save">
      Save
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Crypto } from "@/tools/crypto" 
import { validate } from '@/tools/validate';
  export default {
    name: "settings",
    data() {
      return {
        old:'',
        news:'',
        confirm:''
      }
    },
    computed: {
    
    },
    created() {
    
    },
    methods: {
      save(){
        if(this.old==''){
          this.$message({
            message:"Please enter your old password",
            type: "error"
          });
          return
        }
        if(this.news==''){
          this.$message({
            message:"Please enter your new password",
            type: "error"
          });
          return
        }
        if(this.confirm==''){
          this.$message({
            message:"Please enter confirmed password",
            type: "error"
          });
          return
        }
        if(this.old==this.news){
          this.$message({
            message:"The new password is the same as the old one, please reset",
            type: "error"
          });
          return
        }
        if(this.news!=this.confirm){
            this.$message({
            message:"The new password does not match the confirmed password, please check",
            type: "error"
          });
          return
        }else{
          if (!validate.isPsw(this.news)) {
            this.$message({
              message: "Incorrect password format，please check",
              type: "error"
            });
            return
          }else{
            let obj = {
              oriPwd:Crypto.encryptByMd5(this.old),
              password: Crypto.encryptByMd5(this.news),
            }
            this.$api.setbaseinfo(obj).then(
              res=>{
                  if(res.code != 0){
                    this.$message({
                    message: res.data,
                    type: "error"
                    });
                  }else{
                    this.$message({
                    message: "Change successfully",
                    type: "success"
                    });
                  }
              }
            )
          }
        }
          
      }
    }
  };
</script>

<style lang="scss" scoped>
  .setpassword {
    width: 100%;
    height: 100%;
    padding: 58px 74px;
    font-size: 16px;
    position: relative;
    .info{
      margin-bottom: 43px;
      .input-text {
        width: 441px;
        height: 34px;
        background: #FFFFFF;
        border: 1px solid #DCE0E7;
        border-radius: 5px;
        padding:0 10px; 
      }

    }
    .save{
      position: absolute;
      bottom: 42px;
      left: 50%;
      width: 78px;
      height: 34px;
      background: $color-theme;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
      transform: translate(-50%, 0);
    }
  }
</style>