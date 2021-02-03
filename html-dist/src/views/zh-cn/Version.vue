<template>
	<div class="version-wrapper">
		<div class="title">无线安装应用</div>
		<table>
			<thead>
				<tr>
					<th>序号</th>
					<th>应用名称</th>
					<th>渠道代码</th>
					<th>版本号</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr v-for="(item, index) in list">
					<td v-text="index+1"></td>
					<td v-text="item.os == 'ios-ipa' ? 'ios' : item.os"></td>
					<td v-text="item.channelCode"></td>
					<td class="color"><a title="点击下载" :href="item.os == 'ios-ipa' ? 'itms-services://?action=download-manifest&url='+item.filePath : item.filePath">{{item.versionNo}}</a></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import api from '@/api'
export default {
	name: 'download',
	data (){
		return {
			list:[]
		}
	},
	methods:{
		init(){
			api.loadVersion({}).then(
		        data => {
		          this.list = data;
		        },() => {}
		    )
		}
	},
	mounted() {
		this.init()
	}
}
</script>
<style lang="scss">
	@import "../../assets/scss/version.scss"; 
 </style>