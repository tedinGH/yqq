<template>
    <!-- 注册协议 -->
    <div class="CountryCodeLayer" :class="{active: isShow}">
		<div class="CountryCodeContent" @click.stop=";">
			<header>
				<i @click="hide()"></i>
				{{$t('msg').menu.country}}
			</header>
			<div class="SearchBox">
				<input type="text" :placeholder="$t('msg').menu.countryHolder" v-model="searchValue">
			</div>
			<div class="search-select">
				<ul>
					<li v-for="(item, index) in countrycode" @click="selectCode(item)">
						<span class="cede" v-text="item.PHONE_CODE"></span>
						<span v-if="lang=='zh_CN'" v-text="item.COUNTRY_NAME"></span>
						<span v-if="lang=='en_US'" v-text="item.COUNTRY_NAME_EN"></span>
						<span v-if="lang=='my'" v-text="item.COUNTRY_NAME_MY"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import {countrycode} from '@/utils/countrycode.js';
export default {
    name: 'countrycode',
    data ()
    {
      	return {
		  	isShow:false,
			countrycode:countrycode,
			searchValue:'',
			lang:this.$store.state.language
      	}
    },
	watch: {
		searchValue(curVal, oldVal) {
			this.countrycode = this.fuzzyQuery(countrycode, curVal);
		},
	},
    methods: {
		show() {
			this.isShow = true;
			console.log(this.lang);
		},
		hide() {
			this.searchValue = '';
			this.isShow = false;
		},
		selectCode(item){
			this.$emit('countrycodeHandler',item);
		},
		//模糊搜索
		fuzzyQuery(list, keyWord) {
			var arr = [];
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				if (item.COUNTRY_NAME.indexOf(keyWord) >= 0 || item.COUNTRY_NAME_EN.indexOf(keyWord) >= 0 || item.COUNTRY_NAME_MY.indexOf(keyWord) >= 0) {
					arr.push(item);
				}
				if (item.PHONE_CODE.indexOf(keyWord) >= 0) {
					arr.push(item);
				}
			}
			if(keyWord==''){
				arr = countrycode;
			}
			return arr;
		},
    },
    mounted(){}
}
</script>
<style lang="scss" scoped="" type="text/css">
.CountryCodeLayer.active{
	display: block;
	left: 0;
}
.CountryCodeLayer{
	display: block;
	z-index: 1000;
	position: fixed;
	left: 100%;top:0;
	height: 100%;
	width: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	background: #fff;
	transition: all linear .2s;
	.CountryCodeContent{
		position: relative;
		height: 100%;
		width: 100%;
		margin: auto;
		background: #fff;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-top: .82rem;
		header{
			position: absolute;
			top: 0;left: 0;
			height: .82rem;
			width: 100%;
			line-height: .82rem;
			text-align: center;
			font-size: .30rem;
			text-align: center;
			background: #fff;
			color: #333333;
			border-bottom: 1px solid #D7D7D7;
			transition: all linear .2s;
			>i{
				display: inline-block;
				position: absolute;
				left: .27rem;
				bottom: .18rem;
				height: .44rem;
				width: .44rem;
				background-image: url(../../assets/images/agreement-backs.png);
				background-size: 100% 100%;
			}
		}
		.SearchBox{
			padding:.25rem;
			border-bottom: .2rem solid #f1eff6;
			>input{
				height: .5rem;
				width: 100%;
				background: #f1eff6;
				font-size: .24rem;
				border: none;
				outline: none;
				padding-left: .28rem;
				border-radius: .1rem;
			}
		}
		.search-select{
			height: calc(100% - 1.1rem);
			padding:0 .25rem;
			overflow: auto;
			>ul{
				height: auto;
				overflow: auto;
				>li{
					height: .8rem;
					line-height: .8rem;
					width: 100%;
					font-size: .24rem;
					color: #888;
					border-bottom: 1px solid #f1eff6;
					>span.cede{
						display: inline-block;
						width: 1.25rem;
					}
				}
			}
		}
		
	}
	
}
</style>
