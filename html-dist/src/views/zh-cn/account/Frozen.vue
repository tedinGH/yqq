<template>
  <div class="wraper account">
    <!-- <div class="title">Freeze account</div> -->
    <div class="frozen"><img src="../../../assets/images/！.png">请通过您绑定过的手机号或者邮箱号进行账号冻结</div>
    <div class="tip">
      <span @click="chickTab(1)" :class="{active: tab=='1'}">手机号冻结</span>
      <span @click="chickTab(2)" :class="{active: tab=='2'}">邮箱冻结</span>
    </div>
    <div class="form-content">
      <form autocomplete="off">
        <div class="form-item" v-show="tab=='1'">
          <div class="item-input">
            <span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect"></span>
            <div class="select-box" v-show="showSelect">
              <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
            </div>
            <input type="number" placeholder="请输入手机号码" v-model="mobile" class="tel">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
            <sms-code v-model="codePhone" indx="10017" :codeKey="true"></sms-code>
          </div>
        </div>
        <div class="form-item" v-show="tab=='2'">
          <div class="item-input">
          <input type="text" placeholder="邮箱号" v-model="email">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
            <email-code v-model="email" indx="117" :codeKey="true"></email-code>
          </div>
        </div>
      </form>
    </div>
    <div class="footer">
      <button type="button" @click="submit">下一步</button>
    </div>
  </div>
</template>

<script> 
import logic from '../../mixins/account/frozen';
	
export default {
	name: 'account-frozen',
	mixins: [logic]
}
</script>
