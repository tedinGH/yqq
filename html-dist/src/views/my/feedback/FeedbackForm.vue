<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			{{helpName}}
		</header>
		<div class="content" id="content">
			<div class="title">ကျေးဇူးပြု၍ သင်ကြုံတွေ့သည်ပြသနာကိုရွေးချယ်ပါ</div>
			<div class="form-content">
				<loading v-if="listLoading"></loading>
				<div class="form-label" v-for="(item,index) in list" :key="index">
					<span v-text="item.scenarioName"></span><i :class="{active:item.selected==true}"></i>
					<input type="checkbox" v-model="item.selected" />
				</div>
				<div class="form-item nodata" v-if="dataNone">ခုရွေးချ,်၍မရပါ</div>
			</div>
			<div class="title">ကျေးဇူးပြု၍ သေချာသောပြသနာကိုဖော်ပြပါ
				<span>{{send.remark.length+'/200'}}</span>
			</div>
			<div class="form-content">
				<div class="form-item" @click="openPicker()">
					ပြသနာတက်သည့်အချိန်
					<span class="form-span" v-text="send.dateText"></span>
				</div>

				<div class="form-item" @click="showSupplement()">
					မတ်ဆေ့ပြန်လည်ဖြည့်စွပ်ခြင်း
					<span class="form-span">{{send.remark?'ဖြူဖြူ':'မဖြည့်ဘူး'}}</span>
				</div>

 <van-popup
  v-model="showPopup"
  position="bottom"
  :style="{ height: '35%' }"
>
<van-datetime-picker
  v-model="currentDate"
  type="datetime"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="handleConfirm"
  @cancel="closePopup"
  cancel-button-text="ဖျက်သိမ်း"
  confirm-button-text="သေချာသည"
/>
  </van-popup>


			</div>
			<div class="title">ကျေးဇူးပြု၍ ဆက်သွယ်ရမည့်နေရာကိုရွေးချယ်ပါ</div>
			<div class="form-content">
				<div class="form-tab">
					<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">ဖုန်းနံပါတ်</div>
					<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">အခြား</div>
					<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">အီးေမး</div>
				</div>
				<div class="form-input">
					<input type="text" id="contact" v-model="send.contactNum" placeholder="ဆက်သွယ်ရမည့်နေရာကိုရိုက်ထည့်ပါ" />
				</div>
			</div>
			<div class="footer">
				<button type="button" @click="doSubmit();">ပေးပို့သည်</button>
			</div>
		</div>
		<Scroller ref="scroller" @scrollerHandler="scrollerHandler"></Scroller>
		<Supplement ref="supplement" @supplementHandler="supplementHandler"></Supplement>
	</div>
</template> 

<script> 
import Scroller from './components/Scroller.vue'
import Supplement from './components/Supplement.vue'
import logic from '../../mixins/feedback/feedbackForm';
	
export default {
	name: 'feedbackForm',
	mixins: [logic],
	components: { 
		Scroller: Scroller,
		Supplement: Supplement,
	}
}
</script>

<style lang="scss">
	@import "../../../assets/scss/feedback.scss"; 
</style>

