<template>
	<div>
		<div class="nav-bar">
			<div class="logo" @click="$router.push('index')">
				<img src="../../assets/images/logo/logo-app.png" />
			</div>
			<nav class="main-nav">
				<a :class="{active: navActive==1}"  @click="$router.push('/index')" @mouseenter="switchActive(1)">{{$t("msg.menu.index")}}</a>
				<a :class="{active: navActive==2}" href="javascript:;" @click="jumpTo(2)" @mouseenter="switchActive(2)" @mouseleave="switchActive(1)">{{$t("msg.menu.web")}}</a>
			</nav>
			<nav class="sub-nav">
				<div class="log-in-out" v-if="!loginInfo">
					<a @click="jumpTo(3)">{{$t("msg.menu.login")}}</a>
				</div>
				<div class="user" v-if="loginInfo">
					<img class="user-head" src="../../assets/images/default_head.png"/>
					<ul class="nav-drop">
						<li class="user-info">
							<span>{{$t("msg.menu.nickname")}}：{{loginInfo.nickName || '-'}}</span>
							<img class="user-img" v-if="loginInfo.avatar" :src="base.headUrl+'/'+loginInfo.avatar"/>
							<img class="user-img" v-else src="../../assets/images/img-username.png"/>
						</li>
						<li @click="goPage(1)">{{$t("msg.menu.security")}}</li>
						<li @click="goPage(2)">{{$t("msg.menu.authentication")}}</li>
						<li @click="loginOut">{{$t("msg.menu.logOut")}}</li>
					</ul>
				</div>
				<div class="help">
					<a href="javascript:;" :class="[navActive==3?'active':'']">{{$t("msg.menu.help")}}
						<ul class="nav-drop">
							<!-- <li @click="$router.push({name:'ios-install'});">{{$t("msg.menu.download")}}</li> -->
							<li @click="$router.push({name:'account-frozen'})">{{$t("msg.menu.freeze")}}</li>
							<li @click="$router.push({name:'thaw-options'})">{{$t("msg.menu.thaw")}}</li>
							<!-- <li @click="$router.push({name:'google-code'})">{{$t("msg.menu.retrieve")}}</li> -->
						</ul>
					</a>
				</div>
				<div>
					<div class="language" @click="showLang=!showLang">
						<span class="globle"></span>
						<span class="lang-name" :class="{my:language=='my'}">{{languageList.name}}</span>
						<ul :class="['nav-drop',showLang?'active':'']">
							<li v-for="(item,index) in languageList.list" :key="index" @click="setLanguage(index)">{{item.name}}</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="mobi-nav">
			<div class="logo" @click="$router.push('index')">
				<img src="../../assets/images/logo/logo-app.png" />
			</div>
			<nav>
				<a href="javascript:;" v-if="!loginInfo" @click="jumpTo(3)">{{$t("msg.menu.login")}}</a>
				<a class="mobi-menu" href="javascript:;" @click="showSide=!showSide;"></a>
			</nav>
		</div>
		<!-- 移动端侧栏 -->
		<div class="mobi-side" @click="showSide=!showSide;" :class="{active: showSide}">
			<div class="side-content" @click.stop=";">
				<div class="user-info" v-if="loginInfo">
					<a class="user-menu" href="javascript:;" @click="showSide=false;"></a>
					<img class="user-img" v-if="loginInfo.avatar" :src="base.headUrl+'/'+loginInfo.avatar" />
					<img class="user-img" v-else src="../../assets/images/img-username.png" />
					<div class="user-name" v-html="loginInfo.nickName || '-'"></div>
				</div>
				<div class="side-nav" v-if="!loginInfo">
					<a href="javascript:;" v-if="!loginInfo" @click="jumpTo(3)">{{$t("msg.menu.login")}}</a>
					<a class="side-close" href="javascript:;" @click="showSide=false;"></a>
				</div>
				<nav>
					<a class="active" @click="$router.push('/index')">{{$t("msg.menu.index")}}</a>
					<a v-if="loginInfo" href="https://chat.liveneed.net/chat/Hotline/channel.jsp?cid=5003568&cnfid=4437&j=9533413181&s=1" target="_blank">{{$t("msg.menu.help")}}</a>
					<a v-if="loginInfo" href="javascript:;" @click="loginOut">{{$t("msg.menu.logOut")}}</a>
					<div class="language">
						<span  v-for="(item,idx) in languageList.list" 
						:key="idx" @click="setLanguage(idx)" 
						:class="[language==item.lang?'active':'']">{{item.name}}<span v-if="idx<languageList.list.length-1">&emsp;/&emsp;</span></span>
					</div>
				</nav>
			</div>
		</div>
  </div>
</template>

<script>
import lang from '../../views/mixins/lang';
import { Util } from '@/utils/utils';
import api from '@/api'

export default {
	name: 'BcircleHeader',
	mixins: [lang],
	data (){
		return {
			routeName: '',
			showSide: false,
			navActive: 1, //导航栏选中  1首页 2网页聊天 3帮助
			flex: false, 
			locales: this.$store.state.langData,
			maintenText: '',
			base: base
		}
	},
	computed: {
		loginInfo() {
			return this.$store.state.loginInfo;
		},
		language(){
			return this.$store.state.language;
		}
	},			
  methods: {
		switchActive(i){
			this.navActive = i;
		},
		goPage(i){
			Util.checkCookie("eUcShEaRt").then(
				(res) => { 
					if(i==1) {
            			this.$router.push('/security');
          			} else {
            			this.$router.push('/security/authentication');
          			}
				},
				() => {

					let info = sessionStorage.getItem("eUcShEaRt");
			        if (info) {
			          	if(i==1) {
	            			this.$router.push('/security');
	          			} else {
	            			this.$router.push('/security/authentication');
	          			}
			        } else {
			          this.rejectHandler();
			        }
				}
			)
		},
		gochat(){
			let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
			var subWindow = window.open(url, '_blank');
	        //监听 message 事件
	        window.addEventListener('message', function (e) {
	        	if(e.data=='logout') sessionStorage.removeItem("eUcShEaRt");
	            window.location.reload();
	        })
			/*Util.checkCookie("eUcShEaRt").then(
				res => { 
					//window.location.href = window.location.origin + '/otc/#/';
		          	window.open(window.location.origin + '/otc/#/', '_blank');
				},
				()=>{
					let info = sessionStorage.getItem("eUcShEaRt");
			        if (info) {
			          	//window.location.href = window.location.origin + '/otc/#/';
			          	window.open(window.location.origin + '/otc/#/', '_blank');
			        } else {
			          	//this.$router.push({name: 'scan-login'});
			          	let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
						var subWindow = window.open(url, '_blank');
				        //监听 message 事件
				        window.addEventListener('message', function (e) {
				        	if(e.data=='logout') sessionStorage.removeItem("eUcShEaRt");
				            window.location.reload();
				        })
			        }
					
				}
			)*/
		},
		goOtc(){
			Util.checkCookie("eUcShEaRt").then(
				(res) => { 
			        api.queryInfo({}).then(
			            data => {
			              	if (data.auth != 2) { 
								this.$toast(this.locales.real_name);
							}else {
								let lang = this.language.toLowerCase().replace(/_/, '-');
								window.open(window.location.origin + '/dist/' + lang + '/#/otc/');
							}
			            },() => {}
			        )
				},
				()=>{
					let info = sessionStorage.getItem("eUcShEaRt");
			        if (info) {
			          	api.queryInfo({}).then(
				            data => {
				              	if (data.auth != 2) { 
									this.$toast(this.locales.real_name);
								}else {
									let lang = this.language.toLowerCase().replace(/_/, '-');
									window.open(window.location.origin + '/dist/' + lang + '/#/otc/');
								}
				            },() => {}
				        )
			        } else {
			          	this.rejectHandler()
			        }
					
				}
			)
		},
		rejectHandler(){
			if(this.loginInfo){
				this.$message.confirm(this.locales.login_invalid, this.locales.tip, {
	            	confirmButtonText: this.locales.I_see, 
	            	showCancelButton: false
	          	}).then(() => {
          			this.$store.commit('setLoginInfo', null);
					Util.removeStore('token');
					Util.removeStore('securityInfo');
        		}).catch(() => {})
			}
			else {
				this.$toast(this.locales.login);
			}
		},
		maintenHandler(){
			this.$message.confirm(this.maintenText, this.locales.tip, {
	          	confirmButtonText: this.locales.I_see, 
	          	showCancelButton: false
	        }).then(() => {
			}).catch(() => {})
		},
		loginOut(){
      		api.logout({}).then(
        		data => {
          			Util.clearCookie("eUcShEaRt");
					Util.removeStore('securityInfo');
					window.sessionStorage.removeItem("eUcShEaRt");
					this.showSide = false;
					this.$router.push('/index');
        		},() => {}
      		)
		},
		jumpTo(n){
			new Promise((resolve,reject)=>{
				this.getAppAffiche(resolve,reject);
			}).then(()=>{
				this.maintenHandler();
			},()=>{
				switch(n){
					case 0: 
						this.$toast(this.locales.developing);
						break
					case 1: 
						this.$toast(this.locales.developing);
						// this.goOtc()
						break
					case 2:
						this.gochat();
						break
					case 3:
						this.$store.commit('setGoBack', this.$route.name);
						//this.$router.push({name: 'scan-login'});
			          	let url = window.location.origin + '/dist/' + this.$store.state.language + '/#/scan-login';
						var subWindow = window.open(url, '_blank');
				        //监听 message 事件
				        window.addEventListener('message', function (e) {
				        	if(e.data=='logout') sessionStorage.removeItem("eUcShEaRt");
				            window.location.reload();
				        })
						break
					case 4:
						this.$store.commit('setGoBack', this.$route.name);
						this.$router.push({name: 'register', params: {userSourceType: 0, inviterId: 0}});
						break
					default:
						return;
				}
			})
		},
		//获取系统维护详情
		getAppAffiche(resolve, reject) {
      let obj = {
        os: 'web', 
        locale: localStorage.lang
      }

      api.getSystemStatus({}).then(
        data => {
          this.maintenText = data.replace(/↵/g, "<br/>");
					resolve();
        }, () => {
          reject();
        }
      )
		}
	},
	mounted(){
		this.routeName = this.$route.name
		if (this.routeName == 'ios-install' || this.routeName == 'google-code') {
			this.navActive = 3;
		} else if (this.routeName == 'index'){
			this.flex = true;
			this.navActive = 1;
		} else {
			this.flex = false;
			this.navActive = 999;
		}
	}
}
</script>
<style lang="scss" scoped type="text/css">
.mobi-nav {
	display: none;
	position: relative;
	width: 100%;
	height: 1rem;
	padding: .15rem;
	color: #fff;
	.logo img{
		width: 2.57rem;
		height: .55rem;
	}
	nav {
		position: absolute;
		top: .15rem;
		right: .15rem;
		a {
			display: inline-block;
			height: .24rem;
			line-height: .24rem;
			font-size: .24rem;
			color: #000;
		}
		.mobi-menu {
			position: relative;
			top: 0;
			width: .25rem;
			height: .2rem;
			margin: 0 .1rem 0 .5rem;
			background-image: url(../../assets/images/index/icon-mobi-menu.png);
			background-size: 100% 100%;
		}
	}
}

.mobi-side {
	z-index: 10;
	position: fixed;
	top: 0;
	right: -100%;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	-webkit-transition: all linear .3s;
	transition: all linear .3s;
	.side-content {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 3.75rem;
		background: #fff;
		.user-info {
			width: 100%;
			height: 1.68rem;
			text-align: center;
			background: -webkit-linear-gradient(top, #292069 0%, #272789 100%);
			.user-img {
				height: .75rem;
				width: .75rem;
				margin-top: .35rem;
				border-radius: 50%;
			}
			.user-name {
				margin-top: .15rem;
				font-size: .24rem;
				text-align: center;
				color: #fff;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.user-menu {
				position: absolute;
				left: .15rem;
				top: .15rem;
				width: .24rem;
				height: .18rem;
				background-image: url(../../assets/images/index/icon-mobi-menu.png);
				background-size: 100% 100%;
			}
		}

		.side-nav {
			display: block;
			position: relative;
			height: auto;
			text-align: right;
			padding: .18rem 0;
			a {
				display: inline-block;
				line-height: .64rem;
				font-size: .24rem;
				color: #353535;
			}
			.side-close {
				height: .24rem;
				width: .24rem;
				margin: 0 .25rem;
				background-image: url(../../assets/images/index/icon-side-close.png);
				background-size: 100% 100%;
			}
		}
		nav {
			margin: 0 .15rem;
			a {
				display: block;
				line-height: .64rem;
				margin: .08rem 0;
				font-size: .24rem;
				text-align: center;
				color: #9C9C9C;
				background: #fff;
				.active {
					color: #008CFF;
				}
			}
			.language{
				display: block;
				font-size: .24rem;
				line-height: 1rem;
				text-align: center;
				color: #9C9C9C;
				background: #fff;
				.active {
					color: #008CFF;
				}
			}
			>.active {
				background: #A4DBFF;
				color: #008CFF;
			}
		}
	}
}

.mobi-side.active {
	right: 0;
	-webkit-transition: all linear .3s;
	transition: all linear .3s;
}
@media only screen and (min-width: 0) and (max-width: 1200px) {
	.nav-bar nav a {
    	margin: 0 6px;
	}
}
@media only screen and (min-width: 0) and (max-width: 1020px) {
	.index-header {
		width: auto;
		.nav-bar {
			display: none;
		}
		.mobi-nav{
			display: block;
		}
	}
}

@media only screen and (device-width: 1024px) and (device-height: 768px) {
	.index-header {
		width: auto;
		.nav-bar {
			display: none;
		}
		.mobi-nav{
			display: block;
		}
	}
}
@media only screen and (device-width: 768px) and (device-height: 1024px) {
	.index-header {
		width: auto;
		.nav-bar {
			display: none;
		}
		.mobi-nav{
			display: block;
		}
	}
}
@media only screen and (device-width: 1366px) and (device-height: 1024px)  {
	.index-header {
		width: auto;
		.nav-bar {
			display: none;
		}
		.mobi-nav{
			display: block;
		}
	}
}
@media only screen and (device-width: 1024px) and (device-height: 1366px)   {
	.index-header {
		width: auto;
		.nav-bar {
			display: none;
		}
		.mobi-nav{
			display: block;
		}
	}
}

</style>
