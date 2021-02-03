<template>
	<div class="help-page">
		<BcircleHeader ref="Header"></BcircleHeader>
		<div class="course-part google">
			<h3>谷歌验证码丢失？</h3>
			<p>如果您已经无法获取到有效的验证码，可以通过申请解除谷歌验证，具体流程指引如下</p>
		</div>
		<div class="course-part">
			<div class="title">申请解除谷歌验证指引教程</div>
			<div class="part-content first">
				<div class="content-left">
					<div class="number">/01</div>
					<p class="mt24">Step 1， 在APP端谷歌验证码界面，找到谷歌验证码找回入口</p>
				</div>
				<div class="content-right"> 
					<img src="../../assets/images/google/course1.png" />
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
					<p class="mt24">Step 2， 进入提交申请页面，填写好申请信息进行提交</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course2.png" />
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
					<p class="mt24">Step 3，提交成功，等待客服人员审核</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course3.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>向下<i></i></span>
			</div>
			<div class="part-content last">
				<div class="content-left">
					<div class="number">/04</div>
					<p class="mt24">Step 4，邮件通知审核完成</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course4.png" />
				</div>
			</div>
		</div>
		<div class="relieve">完成以上四步就可以解除啦</div>
		<BcircleFooter ref="Footer"></BcircleFooter>
	</div>
</template>

<script>
import BcircleHeader from '@/components/common/BcircleHeader.vue';
import BcircleFooter from '@/components/common/BcircleFooter.vue';
export default {
	name: 'help',
	components: { 
		BcircleHeader,
		BcircleFooter
	},
	methods: {
	},
	mounted: function () {
	}
}
</script>
<style lang="scss">
	@import "../../assets/scss/help.scss"; 
 </style>
 


