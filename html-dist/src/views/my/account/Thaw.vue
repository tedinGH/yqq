<template>
  <div class="on-center">
    <div class="wraper account" v-if="isThaw"  style="height:100%">
      <div class="frozen my"><img src="../../../assets/images/！.png">ကျေးဇူးပြု၍
        လောခ်ဖြည်မည့်အကောင့်(သို့)အီေမး/ဖုန်းနံပါတ်ကိုရိုက်ထည့်ပါ, မဟုတ်လျှင် EchatAPPအကောင့်ကိုဖြည်လို့မရပါ</div>
      <div class="tip my">
        <span @click="chickTab(1)" :class="{active: tab=='1'}">လောခ်ဖြည်မည့်ဖုန်းနံပါတ်</span>
        <span @click="chickTab(2)" :class="{active: tab=='2'}">လောခ်ဖြည်မည့်Email</span>
      </div>
      <div class="form-content">
        <form autocomplete="off">
          <div class="form-item" v-show="tab=='1'">
            <div class="item-label">
              <span class="input_label">လောခ်ဖြည်မည့်ဖုန်းနံပါတ်</span>
            </div>
            <div class="item-input">
              <span class="countrycode" v-text="phoneCode" @click="showSelect=!showSelect"></span>
              <div class="select-box" v-show="showSelect">
                <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
              </div>
              <input type="number" placeholder="ကျေးဇူးပြု၍ဖုန်းနံပါတ်ရိုက်ထည့်ပါ" v-model="phone" class="tel">
            </div>
          </div>
          <div class="form-item" v-show="tab=='2'">
            <div class="item-label">
              <span class="input_label">လောခ်ဖြည်မည့်Email</span>
            </div>
            <div class="item-input">
              <input type="text" placeholder="ေက်းဇူးျပဳ၍အီးေမးနံပါတ္ကိုျဖည့္သြင္းပါ" v-model="email">
            </div>
          </div>
        </form>
      </div>
      <div class="footer">
        <button type="button" @click="submit">နောင်တဆင့်</button>
      </div>
    </div>
    <div class="wraper account" v-else>
      <div class="safe-content">
        <img class="success" src="../../../assets/images/safe/success.png" />
        <div class="thaw-title">အောင်မြင်ပါပြီ</div>
        <div>သင္၏အေကာင့္သည္သက္ဝင္လုပ္ရွားျခင္းရိွသည္ျဖစ္၍ယခုစတင္ဝင္ေရာက္မွတ္ပံုတင္နိုင္ျပီ။</div>
      </div>
      <div class="footer">
        <button type="button" class="btn"  @click="goToLogin">ပြီးပြည့်စုံသောမတ်ဆ့</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerSystem">
      <div :class="['mask',layerSystem?'in':'']" @click="layerSystem=false"></div>
      <div :class="['b-popup-box register',layerSystem?'in':'']">
        <div>
          <p>အကောင့်ကိုစနစ်ဖြင့်အေးခဲစေပြီးသွားရန်လိုအပ်သည်</p>
          <p>ကိုယ်တိုင်နွေးရန်ဖောက်သည်ဝန်ဆောင်မှုကိုဆက်သွယ်ပါ</p>
        </div>
        <button class="cancel" @click="layerSystem=false">ဖျက်သိမ်း</button>
        <button class="comfirm" @click="customer">ဝန္ေဆာင္မႈေပးသည့္စင္တာ</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerOther">
      <div :class="['mask',layerOther?'in':'']" @click="layerOther=false"></div>
      <div :class="['b-popup-box register',layerOther?'in':'']">
        <div>
          <p>သင့်အကောင့်သည်လတ်တလောအေးခဲခြင်းမရှိပါ</p>
          <p>အကောင့်မရှိပါ</p>
        </div>
        <button class="comfirm" @click="goToLogin()">သို့ပြန်သွားရန်</button>
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
