<template>
	<div class="feedback-wraper">
		<header>
			<span @click="goback"><i></i></span>
			{{helpName}}
		</header>
		<div class="content" id="content">
			<div class="title">Please choose where you have this problem.</div>
			<div class="form-content">
				<loading v-if="listLoading"></loading>
				<div class="form-label" v-for="(item,index) in list" :key="index">
					<span v-text="item.scenarioName"></span><i :class="{active:item.selected==true}"></i>
					<input type="checkbox" v-model="item.selected" />
				</div>
				<div class="form-item nodata" v-if="dataNone">No data options are available for the time being</div>
			</div>
			<div class="title">Please describe the details.
				<span>{{send.remark.length+'/200'}}</span>
			</div>
			<div class="form-content">

				<div class="form-item" @click="openPicker()">
					Occurrence time
					<span class="form-span" v-text="send.dateText"></span>
				</div>

				<div class="form-item" @click="showSupplement">
					Supplementary information
					<span class="form-span">{{send.remark?'Supplementary':'Not filled in'}}</span>
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
  cancel-button-text="Cancel"
  confirm-button-text="Confirm"
/>
  </van-popup>

			</div>
			<div class="title">Please choose your contact information.</div>
			<div class="form-content">
				<div class="form-tab">
					<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">Phone</div>
					<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">Other</div>
					<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">Email</div>
				</div>
				<div class="form-input">
					<input type="text" id="contact" v-model="send.contactNum" placeholder="Enter your contact information" />
				</div>
			</div>
			<div class="footer">
				<button type="button" @click="doSubmit">Submit</button>
			</div>
		</div>
		<Scroller ref="scroller" @scrollerHandler="scrollerHandler"></Scroller>
		<Supplement ref="supplement" @supplementHandler="supplementHandler"></Supplement>
	</div>
</template> 

<script> 
import Scroller from './components/Scroller.vue'
import Supplement from './components/Supplement.vue'
import logic from '../../mixins/feedback/feedbackForm'
	
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

