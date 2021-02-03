<template>
	<div class="help-page my">
		<BcircleHeader ref="Header"></BcircleHeader>
		<div class="course-part mt160">
			<div class="title">IOS ျဖင့္အီခ်က္အက္ကိုေဒါင္းေလာ့ဆြဲ၍တပ္ဆင္ျခင္းအေၾကာင္းညြန္ၾကားခ်က္မ်ား</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/01</div>
					<p class="mt24">Step 1， ဖုန်း၏Browserကိုဖွင့်လိုက်ပါ</p>
					<p>အင္တာနက္လိပ္စာကိုျဖည့္သြင္း</p>
					<!-- <p>
						<router-link exact :to="{ name: 'download', params: { sourceType: 0, temp: 0}}">https://www.echatapp.com/dist/my/#/download/0/0</router-link>
					</p> -->
					<p>https://www.echatapp.com/dist/my/#/download/0/0</p>
					<p>စာမျက်နှာထဲ၀င်ပြီး，"ဒေါင်းလုပ်ဆွဲမည်" ကိုနှိပ်ပါ</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course1-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/02</div>
					<p class="mt24">Step 2，-ဝင္းတိုး(window)ထဲသို႔သြားေရာက္၍"</p>
					<p>တပ္ဆင္ျခင္း"ခလုတ္ကိုေရြးခ်ယ္ပါ။</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course2-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/03</div>
					<p class="mt24">Step 3，-တပ္ဆင္ျပီးေနာက္ဖုန္း၏ဆက္တင္ထဲသို႔သြားပါ။</p>
					<p>"အားလံုးႏွင့္ဆုိင္ေသာ(general)"ခလုတ္ကိုႏွိပ္ပါ။</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course3-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/04</div>
					<p class="mt24">Step 4，-"ဆက္တင္ထိန္းခ်ဳပ္မႈ"ခလုတ္ကိုႏွိပ္ပါ။</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course4-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/05</div>
					<p class="mt24">Step 5，"အားလံုးႏွင့္ဆုိင္ေသာ(general)"ခလုတ္ကိုႏွိပ္ပါ။</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course5-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/06</div>
					<p class="mt24">Step 6，အနီရောင်ဘောင်ခတ်ထားသောခလုတ်ကိုနှိပ်ပါ</p>
				</div>
				<div class="content-right">
					<img src="../../assets/images/contact/course6-en.png" />
				</div>
			</div>
		</div>
		<div class="course-part">
			<div class="title">
				<span>အောက်သို့<i></i></span>
			</div>
			<div class="part-content">
				<div class="content-left">
					<div class="number">/07</div>
					<p class="mt24">Step 7，window ထဲသို့၀င်(ယုံကြည်မူ)ကိုရွေးချယ်ရန်</p>
					<p>အောင်မြင်ပါြပီ</p>
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