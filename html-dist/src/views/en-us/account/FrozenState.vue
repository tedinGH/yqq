<template>
	<div class="wraper account">
		<!-- 未冻结 -->
		<div class="safe-content" v-if="!isFrozen">
			<img src="../../../assets/images/safe/symbol.png" />
			<div  class="symbol">Freezing Protection Account Funds</div>
			<div>Current account:
				<span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
				<span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
			</div>
			<div>Please freeze the mobile phone in time when it is lost or in case of capital risk.</div>
		</div>
		<!-- 冻结成功 -->
		<div class="safe-content" v-else>
			<img src="../../../assets/images/safe/frozen.png" />
			<div>This account has been frozen. If you need to use it properly, please go to thaw it.</div>
			<div>Current account:
				<span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
				<span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
			</div>
		</div>
		<div class="footer">
			<button type="button" @click="next" v-if="!isFrozen">Immediate freezing</button>
			<button type="button" @click="$router.push({name: 'account-safe'})" v-else>Return Account Security</button>
		</div>
		<div class="b-popup" v-show="showMsg">
			<div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
			<div :class="['b-popup-box register',showMsg?'in':'']">
				<div>
					<p>After freezing, it needs to be thawed before it can be used properly.</p>
					<p>Are you sure you want to freeze it?</p>
				</div>
				<button class="cancel" @click="showMsg=false">Cancel</button>
				<button class="comfirm"  @click="doFrozenUser">Confirm</button>
			</div>
		</div>
	</div>
</template>

<script>
import api from '@/api'

export default {
  name: 'frozen-state',
  data (){
		return {
			frozenInfo: {},
			showMsg: false,
			isFrozen: false
		}
  },
  methods: {
		doFrozenUser() {
			let postData = {
				userName: this.frozenInfo.userName,
				verifyCode: this.frozenInfo.verifyCode,
				selectionCodeKey: this.$store.state.selectionCodeKey,
			}
			api.frozenUser(postData).then(
				data => {
					this.$toast(data);
					this.isFrozen = true;
					this.showMsg = false;
				},() => {
          this.$router.push({name:'account-frozen'});
        }
			)
		},
		next(){
			this.showMsg = true;
		}
  },
  mounted() {
    this.frozenInfo = JSON.parse(sessionStorage.getItem('frozenInfo'));
    if(this.frozenInfo && this.frozenInfo.status == 2){
      this.isFrozen = true;
    } 
    if(this.frozenInfo && this.frozenInfo.status == 0){
      this.$router.push({name:'account-frozen'});
    }
  }
}
</script>