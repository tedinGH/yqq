<template>
  <div class="my-toast" v-if="text">
    <div class="my-toast-content">{{ text }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  computed: {
    text() {
      return this.$store.state.toastText;
    }
  },
  watch: {
    text() {
      if (this.text) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$store.commit("SET_TOAST_TEXT", "");
        }, 2500);
      }
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.$store.commit("SET_TOAST_TEXT", "");
    }, 2500);
  }
};
</script>
<style lang="scss" scoped>
.my-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, .6);
  transform: translate(-50%, -50%);

  .my-toast-content {
    padding: 12px 25px;
    color: #fff;
    text-align: center;
  }
}
</style>