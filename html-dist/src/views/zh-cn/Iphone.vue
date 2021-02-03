<template>
	<div class="help-page">
		<BcircleHeader ref="Header"></BcircleHeader>
		<div class="course-part mt160">
			<div class="title">ios版EchatAPP下载安装指引教程</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/01</div>
					<p class="mt24">Step 1， 打开手机网页浏览器，</p>
					<p>输入网址：</p>
					<!-- <p>
						<router-link exact :to="{ name: 'download', params: { sourceType: 0, temp: 0}}">https://www.echatapp.com/dist/zh-cn/#/download/0/0</router-link>
					</p> -->
					<p>https://www.echatapp.com/dist/zh-cn/#/download/0/0</p>
					<p>进入页面，点击“立即下载”；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course1.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/02</div>
					<p class="mt24">Step 2， 在弹出的窗口中选择“安装”</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course2.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/03</div>
					<p class="mt24">Step 3，安装成功后到手机“设置”中，</p>
					<p>点击“通用”；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course3.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/04</div>
					<p class="mt24">Step 4，点击“设备管理”；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course4.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/05</div>
					<p class="mt24">Step 5，点击红色框框里的设备管理；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course5.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/06</div>
					<p class="mt24">Step 6，点击下图中红色框框中的按钮；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course6.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/07</div>
					<p class="mt24">Step 7，在弹出的窗口中选择“信任”，</p>
					<p>完成验证；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course7.png" />
				</div>
			</div>
		</div>
		<!-- <BcircleFooter ref="Footer"></BcircleFooter> -->
	</div>
</template>

<script>
import BcircleHeader from '@/components/common/BcircleHeader.vue';
import BcircleFooter from '@/components/common/BcircleFooter.vue';
export default {
	name: 'contact-us',
	components: { 
		BcircleHeader,
		BcircleFooter
	},
	methods: {
	},
	mounted(){
	}
}
</script>
<style lang="scss">
	@import "../../assets/scss/help.scss"; 
 </style>