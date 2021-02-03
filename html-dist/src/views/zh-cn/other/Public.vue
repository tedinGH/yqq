<template>
  <div class="flex-wrapper">
    <header class="other-header" v-show="show">
			<div class="container">
				<div class="logo" @click="gotosite">
					<img class="img-left" src="../../../assets/images/logo/logo.png" />
          <p  class="logo-text">EchatAPP</p>
				</div>
				<div class="right">
					<div class="language"  @click="showLang=!showLang">{{languageList.name}}
            <i class="arrow"></i>
						<ul :class="['nav-drop',showLang?'active':'']">
							<li v-for="(item,index) in languageList.list" :key="index" @click="setLanguage(index)">{{item.name}}</li>
						</ul>
					</div>
				</div> 
			</div>
    </header>
		<router-view></router-view>
  </div>
</template>

<script>
	import lang from '../../mixins/lang';

  export default {
    name: 'other-public',
    mixins: [lang],
    data (){
      return {
      screenWidth: document.body.clientWidth,
      show:false,
      }
		},
		watch: {
			screenWidth (val) { 
				let winWidth = Math.min(window.innerWidth ? window.innerWidth : 1e5, window.screen.availWidth ? window.screen.availWidth : 1e5);
				let size = (winWidth / 160 * 6);
				document.getElementsByTagName('html')[0].style.fontSize = size + 'px';
			}
		},
    methods: {
    },
    created(){
      console.log(this.$route.name);
        if(this.$route.name==='scan-login'){
          this.show=true
        }else if(this.$route.name==='login'){
          this.show=true
        }else if(this.$route.name==='register'){
          this.show=true
        }
        else{
          this.show=false
        }
    },
    mounted() {
      //屏幕宽度事件
      window.onresize = () => {
        window.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      }
      let winWidth = Math.min(window.innerWidth ? window.innerWidth : 1e5, window.screen.availWidth ? window.screen.availWidth : 1e5);
      let size = (winWidth / 160 * 6);
      document.getElementsByTagName('html')[0].style.fontSize = size + 'px';
    }
  }
</script>
<style lang="scss">
@import "../../../assets/scss/login.scss"; 
</style>
