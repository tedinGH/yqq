<template>
  <transition name="pop">
    <div class="my-popup" v-if="value">
      <div class="my-popup-content success">
        <img class="img" src="../../assets/images/chat/upload-success.png">
        <p style="color:#122030">{{title}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
	export default {
    name: 'loading',
    data (){
			return {
			}
    },
    props: {
      value: {
        type: Boolean
      },
      title: {
        type: String
      }
    },
    mounted(){
      setTimeout(() => {
        this.$emit('input', false)
      }, 1500)
    }
	}
</script>

<style lang="scss" scoped>
@import '../../assets/css/var';

.success{
  width: 300px;
  height: 196px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px 0px rgba(83, 112, 193, 0.24);
  
  border-radius: 8px;
  .img{
    width: 122px;
    height: 122px;
    margin: 20px 0 0;
  }
}
</style>