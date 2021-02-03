<template>
	<div class="CountryCodeContent" @click.stop=";">
		<div class="SearchBox">
      <div class="text">{{$t("msg.register.selectareacode")}}</div>
			<input type="text" ref="countryCode" :placeholder="$t('msg.register.areacode')" v-model="searchValue" autocomplete="off">
		</div>
		<div class="search-select" v-scrollBar>
			<ul>
				<li v-for="(item, index) in countrycode" @click="selectCode(item)" :key="index">
					<span class="cede" v-text="'+'+item.PHONE_CODE"></span>
					<span v-if="lang=='zh_CN'" v-text="item.COUNTRY_NAME"></span>
					<span v-if="lang=='en_US'" class="en" v-text="item.COUNTRY_NAME_EN"></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {countrycode} from './countrycode.js';
import {mapGetters} from "vuex";
export default {
	name: 'countrycode',
	data (){
		return {
			isShow:false,
			countrycode:countrycode,
			searchValue:'',
    }
	},
	watch: {
		searchValue(curVal, oldVal) {
			this.countrycode = this.fuzzyQuery(countrycode, curVal);
		},
  },
  computed: {
      ...mapGetters(["lang"]),
    },
  methods: {
		selectCode(item){
      this.$emit('countrycodeHandler',item);
      this.searchValue=''
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
	mounted(){
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
.CountryCodeContent{
  width:405px;
  margin-top: 10px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.35);
	.SearchBox{
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  .text{
    margin-bottom:10px ;
    font-size: 16px;
  }
		>input{
      width:296px;
      height:34px;
			background:#fff;
			font-size: 14px;
			border: none;
      outline: none;
      border:1px solid rgba(210,210,210,1);
			border-radius: 5px;
			text-align: center;
		}
	}
	.search-select{
    position: relative;
		height: 160px;
		padding:0 15px;
    overflow: auto;
    background: #fff;
		>ul{
			height: auto;
			overflow: auto;
			>li{
				height: auto;
				padding: 15px;
				width: 100%;
				font-size: 16px;
        border-bottom: 1px solid #e0e0e0;
        cursor: pointer;
        >.en{
          font-size: 14px;
        }
				>span.cede{
					display: inline-block;
					width: 30%;
				}
			}
		}
	}
	
}
</style>