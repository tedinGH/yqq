<template>
	<div class="feedback-wraper" >
		<header>
			<span @click="goback"><i></i></span>
			{{helpName}}
		</header>
		<div class="content" id="content">
			<div class="title">请选择您在何处发生该问题</div>
			<div class="form-content">
				<loading v-if="listLoading"></loading>
				<div class="form-label" v-for="(item,index) in list" :key="index">
					<span v-text="item.scenarioName"></span><i :class="{active:item.selected==true}"></i>
					<input type="checkbox" v-model="item.selected" />
				</div>
				<div class="form-item nodata" v-if="dataNone">暂无数据选项</div>
			</div>
			<div class="title">请描述具体情况
				<span>{{send.remark.length+'/200'}}</span>
			</div>
			<div class="form-content">
				<!-- <div class="form-item" @click="showScroller()"> -->
				<div class="form-item" @click="openPicker()">
					发生时间
					<span class="form-span" v-text="send.dateText"></span>
				</div>
				<div class="form-item" @click="showSupplement()">
					补充信息
					<span class="form-span">{{send.remark?'已补充':'未填写'}}</span>
				</div>
   <!-- 时间选择器 -->
   
    <!-- <mt-datetime-picker
    lockScroll="true"
    ref="picker"
    type="datetime"
    v-model="dataval"
     @confirm="handleConfirm()"
     :startDate="startDate"
    >
  </mt-datetime-picker> -->

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
/>
  </van-popup>


			</div>
			<div class="title">请选择您的联系方式</div>
			<div class="form-content">
				<div class="form-tab">
					<div class="item-tab" @click="send.contactType='1';send.contactNum='';" :class="{active:send.contactType=='1'}">手机号</div>
					<div class="item-tab" @click="send.contactType='3';send.contactNum='';" :class="{active:send.contactType=='3'}">其他</div>
					<div class="item-tab" @click="send.contactType='2';send.contactNum='';" :class="{active:send.contactType=='2'}">邮箱</div>
				</div>
				<div class="form-input">
					<input type="text" id="contact" v-model="send.contactNum" placeholder="输入您的联系方式" />
				</div>
			</div>
			<div class="footer">
				<button type="button" @click="doSubmit();">提交</button>
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

