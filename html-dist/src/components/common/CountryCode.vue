<template>
	<div class="CountryCodeContent" @click.stop=";">
		<div class="SearchBox">
			<input type="text" ref="countryCode" :placeholder="$t('msg').google.country" v-model="searchValue" autocomplete="off">
		</div>
		<div class="search-select">
			<ul>
				<li v-for="(item, index) in countrycode" @click="selectCode(item)" :key="index">
					<span class="cede" v-text="'+'+item.PHONE_CODE"></span>
					<span v-if="lang=='zh_CN'" v-text="item.COUNTRY_NAME"></span>
					<span v-if="lang=='en_US'" v-text="item.COUNTRY_NAME_EN"></span>
					<span v-if="lang=='my'" v-text="item.COUNTRY_NAME_MY"></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {countrycode} from '../../utils/countrycode.js';
export default {
	name: 'countrycode',
	data (){
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
.CountryCodeContent{
	position: relative;
	height: 230px;
	width: 100%;
	.SearchBox{
		padding: 15px 25px;
		>input{
			height: 40px !important;
			width: 100%;
			background: #f1eff6;
			font-size: 16px;
			border: none;
			outline: none;
			border-radius: 6px;
			text-align: center;
		}
	}
	.search-select{
		height: 160px;
		padding:0 15px;
		overflow: auto;
		>ul{
			height: auto;
			overflow: auto;
			>li{
				height: auto;
				padding: 15px;
				width: 100%;
				font-size: 16px;
				border-bottom: 1px solid #e0e0e0;
				>span.cede{
					display: inline-block;
					width: 30%;
				}
			}
		}
	}
	
}
@media only screen and (min-width: 0px) and (max-width: 900px){
	.CountryCodeContent{
		height: 12rem;
		.SearchBox{
			padding: .8rem 1rem;
			>input{
				height: 2.2rem;
				font-size: .82rem;
			}
		}
		.search-select{
			height: 8.2rem;
			padding:0 1rem;
			ul{
				li{
					padding: .8rem 1rem;
					font-size: .82rem;
				}
			}
		}
	}
}
</style>