<template>
  <div class="wraper account">
    <!-- 未冻结 -->
    <div class="safe-content" v-if="!isFrozen">
      <img src="../../../assets/images/safe/symbol.png" />
      <div class="symbol">冻结保护账户资金</div>
      <div>当前账户：
        <span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
        <span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
      </div>
      <div>请在手机丢失或出现资金风险时，及时冻结.</div>
    </div>
    <!-- 冻结成功 -->
    <div class="safe-content" v-else>
      <img src="../../../assets/images/safe/frozen.png" />
      <div>该帐号已被冻结，如需正常使用，请前往解冻。</div>
      <div>当前账户：
        <span v-if="frozenInfo.tab == '1'">{{this.frozenInfo.userName | filterPhone}}</span>
        <span v-else>{{this.frozenInfo.userName | filterEmail}}</span>
      </div>
    </div>
    <div class="footer">
      <button type="button" @click="next" v-if="!isFrozen">立即冻结</button>
      <button type="button" @click="$router.push({name: 'account-safe'})" v-else>返回账号安全</button>
    </div>
    <div class="b-popup" v-show="showMsg">
			<div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
			<div :class="['b-popup-box register',showMsg?'in':'']">
				<div>
					<p>冻结后，需要解冻才能正常使用,</p>
					<p>确定要冻结吗？</p>
				</div>
				<button class="cancel" @click="showMsg=false">取消</button>
				<button class="comfirm"  @click="doFrozenUser">确认</button>
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