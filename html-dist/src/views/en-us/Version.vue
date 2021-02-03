<template>
	<div class="version-wrapper">
		<div class="title">Wireless installation applications</div>
		<table>
			<thead>
				<tr>
					<th>S/N</th>
					<th>App Name</th>
					<th>Channel code</th>
					<th>Version</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr v-for="(item, index) in list">
					<td v-text="index+1"></td>
					<td v-text="item.os == 'ios-ipa' ? 'ios' : item.os"></td>
					<td v-text="item.channelCode"></td>
					<td class="color"><a title="download" :href="item.os == 'ios-ipa' ? 'itms-services://?action=download-manifest&url='+item.filePath : item.filePath">{{item.versionNo}}</a></td>
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