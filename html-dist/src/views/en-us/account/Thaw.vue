<template>
  <div class="on-center" >
    <div class="wraper account" v-if="isThaw">
      <div class="frozen"><img src="../../../assets/images/！.png">Please enter your phone or email number when you
        applied for freezing, otherwise, you can unfreeze your EchatAPP account.</div>
      <div class="tip">
        <span @click="chickTab(1)" :class="{active: tab=='1'}">Phone</span>
        <span @click="chickTab(2)" :class="{active: tab=='2'}">Email</span>
      </div>
      <div class="form-content">
        <form autocomplete="off">
          <div class="form-item" v-show="tab=='1'">
            <div class="item-label">
              <span class="input_label">Freezing by Phone Number</span>
            </div>
            <div class="item-input">
              <span class="countrycode" v-text="phoneCode" @click="showSelect=!showSelect"></span>
              <div class="select-box" v-show="showSelect">
                <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
              </div>
              <input type="number" placeholder="Phone Number" v-model="phone" class="tel">
            </div>
          </div>
          <div class="form-item" v-show="tab=='2'">
            <div class="item-label">
              <span class="input_label">Freezing by Email</span>
            </div>
            <div class="item-input">
              <input type="text" placeholder="Email" v-model="email">
            </div>
          </div>
        </form>
      </div>
      <div class="footer">
        <button type="button" @click="submit">Next</button>
      </div>
    </div>
    <div class="wraper account" v-else>
      <div class="safe-content">
        <img class="success" src="../../../assets/images/safe/success.png" />
        <div class="thaw-title">Finished</div>
        <div>Your account has been activated and can now log in properly.</div>
      </div>
      <div class="footer">
        <button type="button" class="btn" @click="goToLogin">finish</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerSystem">
      <div :class="['mask',layerSystem?'in':'']" @click="layerSystem=false"></div>
      <div :class="['b-popup-box register',layerSystem?'in':'']">
        <div>
          <p>The account is frozen by the system and needs to be defrosted manually by contacting customer service.</p>
        </div>
        <button class="cancel" @click="layerSystem=false">Cancel</button>
        <button class="comfirm" @click="customer">Contact</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerOther">
      <div :class="['mask',layerOther?'in':'']" @click="layerOther=false"></div>
      <div :class="['b-popup-box register',layerOther?'in':'']">
        <div>
          <p>Your account is not currently frozen or does not exist.</p>
        </div>
        <button class="comfirm" @click="goToLogin()">Log in</button>
      </div>
    </div>
    <code-component ref="code" @codeConfirm="codeConfirmHandler"></code-component>
    <double-verify v-model="validateInfo" @verify="verifyHandler" ref="verify"></double-verify>
  </div>
</template>

<script>
  import logic from '../../mixins/account/thaw';

  export default {
    name: 'account-thaw',
    mixins: [logic]
  }

</script>
<style lang="scss" scoped>
@media only screen and (min-width: 0px) and (max-width: 900px) {
  .on-center{
    height: 100%;
    .frozen{
      margin-top: 0;
    }
  }
}
</style>
