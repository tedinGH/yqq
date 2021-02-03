<template>
	<div class="version-wrapper">
		<div class="title">ကြိုးမဲ့တပ်ဆင်ခြင်း application များ</div>
		<table>
			<thead>
				<tr>
					<th>နံပါတ်စဉ်</th>
					<th>လျှောက်လွှာနာမည်</th>
					<th>ရုပ်သံလိုင်းကုဒ်</th>
					<th>ဗားရှင်းနံပါတ်</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr v-for="(item, index) in list">
					<td v-text="index+1"></td>
					<td v-text="item.os == 'ios-ipa' ? 'ios' : item.os"></td>
					<td v-text="item.channelCode"></td>
					<td class="color"><a title="လုပ်ကိုနှိပ်ပါ" :href="item.os == 'ios-ipa' ? 'itms-services://?action=download-manifest&url='+item.filePath : item.filePath">{{item.versionNo}}</a></td>
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