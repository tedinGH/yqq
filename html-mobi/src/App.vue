<template>
  <div id="app">
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  
</template>

<script>
import { Util } from '@/utils/utils';
export default {
  name: 'app',
  data() {
    return {
      device: Util.getEnvironmet(),
      showTemp:true,
      screenWidth: document.body.clientWidth,
    }
  },
  created() {
  },
  computed:{
  },
  watch:{
    screenWidth () {
      if(this.screenWidth < 1080){
        let winWidth = Math.min(window.innerWidth ? window.innerWidth : 1e5, window.screen.availWidth ? window.screen.availWidth : 1e5)
        let size = (winWidth / 7.5)
        document.getElementsByTagName('html')[0].style.fontSize = size + 'px'
      }
    }
  },
  methods:{
  },
  mounted() {

    //修改rem值
    window.onresize = () => {
      window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWidth = window.screenWidth
    }
    let size = (this.screenWidth / 7.5)
    document.getElementsByTagName('html')[0].style.fontSize = size + 'px'

    if (localStorage.lang != this.$store.state.language) {
      localStorage.setItem('lang', this.$store.state.language)
    }
    //console.log(this.$t('msg'))
		/*//检测 IOS/Android
		if(this.device == 'IOS'){
			window.webkit.messageHandlers.hideNavbar.postMessage("");
		}
		else if(this.device == 'Android') native.hideNavbar();*/
  }
}
</script>
<style src="./assets/css/base.css"></style>
<style lang="scss" type="text/css" src="./assets/css/style.scss"></style>