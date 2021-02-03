<template>
	<span>{{timeText}}</span>
</template>

<script>
export default {
	data ()
	{
		return {
			time: 1557107932930,
			timeText: '',
		}
	},
	computed:{
		locales(){
			return this.$store.state.langData
		}
	},
	methods: {
		runTimeOut(mm,ss){
			let minutes = mm,seconds = ss;
			let time = setInterval(()=>{
				this.timeText = num(minutes)+	this.locales.minute+num(seconds)+this.locales.second;
				if (seconds === 0 && minutes !== 0) {
					seconds = 59;
					minutes--;
				} else if (minutes === 0 && seconds === 0) {
					seconds = 0
					clearInterval(time);
					this.$emit('timeOut',true);
				} else {
					seconds--;
				}
			}, 1000)
			var num = function(n) {
				return n < 10 ? '0' + n : n ;
			}
		},
		timeOutStart(time){
			var that = this;
			var createTime = new Date(time).getTime()+15*60000;
			var nowTime = new Date().getTime();
			if(nowTime<createTime){
				var timeOutNum = (createTime-nowTime)/1000;
				var minutes = Math.floor(timeOutNum/60);
				var seconds = Math.floor(timeOutNum - minutes*60);
				that.runTimeOut(minutes,seconds)
			}else{
				that.$emit('timeOut',true);
			}
		}
	},
	mounted() {
	}
}
</script>