<template>
	<div class="help-page">
		<BcircleHeader ref="Header"></BcircleHeader>
		<div class="course-part google">
			<h3>Google Verification Code Lost?</h3>
			<p>If you can't get the valid authentication code, you can apply to cancel the Google authentication. The specific process guidelines are as follows.</p>
		</div>
		<div class="course-part">
			<div class="title">Apply for the Removal of Google Validation Guidelines</div>
			<div class="part-content first">
				<div class="content-left">
					<div class="number">/01</div>
					<p class="mt24">Step 1, On the APP side of the Google Verification Code interface, find the Google Verification Code Retrieval Entry</p>
				</div>
				<div class="content-right"> 
					<img src="../../assets/images/google/course1.png" />
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
					<p class="mt24">Step 2, Enter the application submission page and fill in the application information for submission.</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course2.png" />
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
					<p class="mt24">Step 3, Successful submission awaits review by customer service personnel'</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course3.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>Down<i></i></span>
			</div>
			<div class="part-content last">
				<div class="content-left">
					<div class="number">/04</div>
					<p class="mt24">Step 4, Mail notification audit completed</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/google/course4.png" />
				</div>
			</div>
		</div>
		<div class="relieve">Complete the above four steps and you will be relieved.</div>
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
	mounted() {
	}
}
</script>
<style lang="scss">
	@import "../../assets/scss/help.scss"; 
 </style>


