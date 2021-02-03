<template>
  <div class="wraper account">
    <!-- <div class="title">Freeze account</div> -->
    <div class="frozen"><img src="../../../assets/images/！.png"> Please freeze your account through your bound cell phone number or email number.</div>
    <div class="tip">
      <span @click="chickTab(1)" :class="{active: tab=='1'}">Phone</span>
      <span @click="chickTab(2)" :class="{active: tab=='2'}">Email</span>
    </div>
    <div class="form-content">
      <form autocomplete="off">
        <div class="form-item" v-show="tab=='1'">
          <div class="item-input">
            <span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect"></span>
            <div class="select-box" v-show="showSelect">
              <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
            </div>
            <input type="number" placeholder="Phone number" v-model="mobile" class="tel">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="Verify Code" v-model="send.verifyCode">
            <sms-code v-model="codePhone" indx="10017" :codeKey="true"></sms-code>
          </div>
        </div>
        <div class="form-item" v-show="tab=='2'">
          <div class="item-input">
          <input type="text" placeholder="Email" v-model="email">
          </div>
          <div class="item-code">
            <input type="tel" maxlength="4" placeholder="Verify Code" v-model="send.verifyCode">
            <email-code v-model="email" indx="117" :codeKey="true"></email-code>
          </div>
        </div>
      </form>
    </div>
    <div class="footer">
      <button type="button" @click="submit">Next</button>
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
