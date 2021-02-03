<template>
  <div class="on-center">
    <!-- 第一步 -->
    <div class="wraper partOne">
      <div class="title">EchatAPP注册</div>
      <div class="tip">
        <span @click="chickTab(1)" :class="{active: tab=='1'}">手机号注册</span>
        <span @click="chickTab(2)" :class="{active: tab=='2'}">邮箱号注册</span>
      </div>
      <div class="form-content">
        <form autocomplete="off">
          <div class="form-item" v-show="tab=='1'">
            <div class="item-label">
              <span class="input_label">手机号码</span>
            </div>
            <div class="item-input">
              <span class="countrycode" v-text="send.phoneCode" @click="showSelect=!showSelect;"></span>
              <div class="select-box" v-show="showSelect">
                <CountryCode ref="countrycode" @countrycodeHandler="countrycodeHandler"></CountryCode>
              </div>
              <input type="number" placeholder="请输入手机号码" v-model="send.userName" class="tel">
            </div>
            <div class="item-label">
              <span class="input_label">验证码</span>
            </div>
            <div class="item-code">
              <input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
              <div class="floatR">
                <button class="get-code" type="button" @click="getPhone()" :disabled="isClick">{{codeText}}</button>
              </div>
            </div>
          </div>
          <div class="form-item" v-show="tab=='2'">
            <div class="item-label">
              <span class="input_label">邮箱号</span>
            </div>
            <div class="item-input">
              <input type="text" placeholder="请输入邮箱号" v-model="send.userName">
            </div>
            <div class="item-label">
              <span class="input_label">邮箱验证码</span>
            </div>
            <div class="item-code">
              <input type="tel" maxlength="4" placeholder="请输入验证码" v-model="send.verifyCode">
              <div class="floatR">
                <button class="get-code" type="button" @click="getEmail();" :disabled="isClick">{{codeText}}</button>
              </div>
            </div>
          </div>
          <div class="checkbox" :class="{active:ischecked}" @click="ischecked = !ischecked">
            <i></i>
            <p>勾选表示同意<span class="udl" @click="showAgreement();">《EchatAPP协议》</span>和<span class="udl"
                @click="showPrivacyPolicy();">《隐私政策》</span></p>
          </div>
        </form>
      </div>
      <div class="footer">
        <button type="button" @click="submit();">下一步1/3</button>
        <div class="item-help">
          已有账号？<router-link to="/login">点击登录</router-link>
        </div>
      </div>
    </div>
    <CodeComponent ref="code" @codeConfirm="codeLoginHandler"></CodeComponent>
    <Agreement ref="agreement"></Agreement>
    <PrivacyPolicy ref="privacyPolicy"></PrivacyPolicy>
    <div class="b-popup" v-show="showMsg">
      <div :class="['mask',showMsg?'in':'']" @click="showMsg=false"></div>
      <div :class="['b-popup-box register',showMsg?'in':'']">
        <div>
          <span v-show="tab=='1'">该手机号已注册</span>
          <span v-show="tab=='2'">该邮箱号已注册</span>
        </div>
        <button class="cancel" @click="showMsg=false;">取消</button>
        <button class="comfirm" @click="goLogin()">返回登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  import logic from '../../mixins/other/register';
  import Agreement from '@/views/zh-cn/other/Agreement'
  import PrivacyPolicy from '@/views/zh-cn/other/PrivacyPolicy'
  export default {
    name: 'register',
    mixins: [logic],
    components: {
      Agreement,
      PrivacyPolicy
    },
  }

</script>
