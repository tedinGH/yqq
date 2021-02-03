<template>
	<div class="help-page">
		<BcircleHeader ref="Header"></BcircleHeader>
		<div class="course-part mt160">
			<div class="title">Download and Installation Guidelines for IOS version EchatAPP</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/01</div>
					<p class="mt24">Step 1,Open the mobile web browser,</p>
					<p>Enter the website:</p>
					<!-- <p>
						<router-link exact :to="{ name: 'download', params: { sourceType: 0, temp: 0}}">https://www.echatapp.com/dist/en-us/#/download/0/0</router-link>
					</p> -->
					<p>https://www.echatapp.com/dist/en-us/#/download/0/0</p>
					<p>Enter the page and click "Download Now"；</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course1-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/02</div>
					<p class="mt24">Step 2, Select "Install" in the pop-up window.</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course2-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/03</div>
					<p class="mt24">Step 3, After successful installation, go to Mobile Settings,</p>
					<p>Click Universal.</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course3-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/04</div>
					<p class="mt24">Step 4, Click on "Equipment Management".</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course4-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/05</div>
					<p class="mt24">Step 5, Click on the device management in the red box.</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course5-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/06</div>
					<p class="mt24">Step 6, Click the button in the red box in the picture below.</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course6-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/07</div>
					<p class="mt24">Step 7, Select Trust in the pop-up window,</p>
					<p>Complete verification;</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course7-en.png" />
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