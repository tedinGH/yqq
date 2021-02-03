<template>
  <div class="my-popup login-fail">
    <div class="my-popup-content">
      <div class="fail-title">{{ $t("msg.tip.loginFail") }}</div>
      <button class="fail-btn" @click="goLogin()">
        {{ $t("msg.tip.info") }}
      </button>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'LoginFail',
    data() {
			return {
			}
    },
    methods: {
      goLogin() {
        this.$store.dispatch("setLoginFail", false)
        this.$store.commit("SET_USER_INFO", {});
        this.$store.commit("CLEARTOKEN");
        sessionStorage.removeItem("eUcShEaRt");
        this.$router.push({
          name: 'login'
        });
      }
    }
	}
</script>

<style lang="scss" scoped>
@import '../../assets/css/var';

.login-fail {
  .my-popup-content {
    width: 446px;
    height: 316px;
    z-index: 101;
    .fail-title {
      margin: 116px 0 88px 0;
      font-size: 20px;
      text-align: center;
    }
    .fail-btn {
      width: 164px;
      height: 44px;
      background: $color-theme;
      color: #fff;
    }
  }
}
</style>