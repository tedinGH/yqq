<template>
  <div>
    <header>
    	<div class="logo">
    		<img src="../../assets/images/logo/logo-yellow.png" />
    	</div>
			<div class="language">简体中文<i></i></div>
    	<div class="login" @click="goLogin();">登录</div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'HeaderComponent',
    data ()
    {
      return {
      }
    },
    components: { 
    },
    methods: {
      goLogin: function() {
        this.$router.replace({name: 'login'});
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
header {
	height: auto;
	/* min-width: 990px; */
	background: #fff;
	overflow: auto;
}

header .logo {
	float: left;
	height: 48px;
	width: 48px;
	margin: 17px 0 18px 242px;
}

header .logo img {
	height: 100%;
	width: auto;
}

header .icon {
	float: left;
	height: 34px;
	width: 118px;
	margin: 24px 0 25px 16px;
}

header .icon img {
	height: 100%;
	width: auto;
}

header .login {
	float: right;
	width: 99px;
	height: 41px;
	line-height: 41px;
	text-align: center;
	border: 1px solid rgba(255, 179, 88, 1);
	border-radius: 10px;
	margin: 21px 0 21px 0;
	color: rgba(255, 179, 88, 1);
}

header .language{
	position: relative;
	display: block;
	float: right;
	width: 174px;
	height: 41px;
	line-height: 41px;
	background: rgba(249, 249, 249, 1);
	border: 1px solid #bbb;
	margin: 21px 115px 21px 16px;
	border-radius: 5px;
	color: #bbb;
	font-size: 16px;
	padding-left: 14px;
}

header .language > i{
	position: absolute;
	right: 15px;
	top: 15px;
	display: inline-block;
	height: 11px;
	width: 18px;
	background-image: url(../../assets/images/icon-down.png);
	background-size: 100% 100%;
}
/*mobile*/
@media only screen and (min-width: 0px) and (max-width: 900px){
	header {
		height: 3.96rem;
		background: #fff;
		overflow: hidden;
	}
	header .logo {
		float: left;
		height: 2.29rem;
		width: 2.29rem;
		margin: .81rem 0 85rem 1.9rem;
	}
	header .icon {
		float: left;
		height: 1.62rem;
		width: 5.63rem;
		margin: 1.14rem 0 1.19rem .47rem;
	}
	
	header .login {
		display: none;
		float: right;
		width: 4.72rem;
		height: 1.95rem;
		line-height: 1.95rem;
		border-radius: .47rem;
		margin: 1rem 1.9rem 1rem 0;
	}
	
	header .language {
		display: none;
	}
}

</style>
