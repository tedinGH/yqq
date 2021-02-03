<template>
 <div class="emoji-wrap" v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <ul class="emoji-list">
			<li class="emoji-item display-flex" v-for="(item,idx) in list" :key="idx" @click="seeItem(item.bqbId,idx)">
				<div class="emoji-img">
					<img class="img" :src="base.headUrl+item.bqbCoverUrl">
				</div>
				<div class="emoji-info display-flex-item display-flex">
					<div class="display-flex-item">
						<p class="emoji-info-title">{{item.bqbName}}</p>
						<p style="color:#8D95A2">{{item.emojiCount}} ရုပ်ပုံများ</p>
					</div>
					<div class="progress" v-if="item.progress">{{item.progress.toFixed(1)}}%</div>
					<div class="emoji-operation" @click.stop="addEmoji(item.bqbId,idx)" v-else>
						<span class="emoji-icon success" v-if="item.download==1"></span>
						<span class="emoji-icon fail" v-else-if="item.download==2"></span>
						<span class="emoji-icon" v-else></span>
					</div>
				</div>
			</li>
		</ul>
		<div class="toast" v-show="adding==1">စိတ်ခံစားမှုများပေါင်းထည့်ခြင်း ကျေးဇူးပြု၍ ခဏစောင့်ပါ</div>
		<div class="toast" v-show="adding==3">Emoji ကအောင်မြင်စွာထည့်ပြီးပါပြီ</div>
		<div class="toast" v-show="adding==4">သငျသညျ Emoji ထည့်သွင်းခဲ့ကြသည်</div>
		<div class="emoji-popup" v-if="showPopup" @click="showPopup=0">
			<div :class="['popup-content',showPopup?'in':'out']" @click.stop=";">
				<div class="popup-title">{{list[showPopup-1].bqbName}}</div>
				<ul class="popup-list display-flex">
					<li class="popup-list-item" v-for="(item,idx) in emojiDetail" :key="idx">
						<img class="img" :src="base.headUrl+item.bqMainUrl">
					</li>
				</ul>
				<div class="popup-add" @click="addEmoji(list[showPopup-1].bqbId,showPopup-1)">emoji ထည့်ပါ</div>
				<div class="popup-cancel" @click="showPopup=0">ဖျက်သိမ်း</div>
			</div>
		</div>
  </div>
</template>

<script>
	import emoji from '../mixins/emoji';
	export default {
		name: 'emoji',
		mixins: [emoji] 
	}
</script>

<style lang="scss">
	@import "../../assets/css/emoji.scss"; 
 </style>
