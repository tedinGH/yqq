<template>
  <div class="on-center" >
    <div class="wraper account" v-if="isThaw">
      <div class="frozen"><img src="../../../assets/images/！.png">请输入您当时申请冻结时的手机或邮箱号码，否则无法解冻您的EchatAPP账户。</div>
      <div class="tip">
        <span @click="chickTab(1)" :class="{active: tab == '1'}">手机号解冻</span>
        <span @click="chickTab(2)" :class="{active: tab == '2'}">邮箱号解冻</span>
      </div>
      <div class="form-content">
        <form autocomplete="off">
          <div class="form-item" v-show="tab == '1'">
            <div class="item-label">
              <span class="input_label">手机号解冻</span>
            </div>
            <div class="item-input">
              <span class="countrycode" v-text="phoneCode" @click="showSelect=!showSelect"></span>
              <div class="select-box" v-show="showSelect">
                <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
              </div>
              <input type="number" placeholder="请输入手机号码" v-model="phone" class="tel">
            </div>
          </div>
          <div class="form-item" v-show="tab == '2'">
            <div class="item-label">
              <span class="input_label">邮箱号解冻</span>
            </div>
            <div class="item-input">
              <input type="text" placeholder="请输入邮箱号" v-model="email">
            </div>
          </div>
        </form>
      </div>
      <div class="footer">
        <button type="button" @click="submit">下一步</button>
      </div>
    </div>
    <div class="wraper account" v-else>
      <div class="safe-content">
        <img class="success" src="../../../assets/images/safe/success.png" />
        <div class="thaw-title">已完成</div>
        <div>您的帐号已经激活，现在可以正常登录了</div>
      </div>
      <div class="footer">
        <button type="button" class="btn" @click="goToLogin">完成</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerSystem">
      <div :class="['mask', layerSystem ? 'in' : '']" @click="layerSystem = false"></div>
      <div :class="['b-popup-box register', layerSystem ? 'in' : '']">
        <div>
          <p>该账号被系统冻结，需通过</p>
          <p>联系客服人工解冻</p>
        </div>
        <button class="cancel" @click="layerSystem=false">取消</button>
        <button class="comfirm" @click="customer">联系客服</button>
      </div>
    </div>
    <div class="b-popup" v-show="layerOther">
      <div :class="['mask', layerOther ? 'in' : '']" @click="layerOther=false"></div>
      <div :class="['b-popup-box register', layerOther ? 'in' : '']">
        <div>
          <p>你的账号目前没被冻结或者</p>
          <p>账号不存在</p>
        </div>
        <button class="comfirm" @click="goToLogin">返回登录</button>
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
