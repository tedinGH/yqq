<template>
  <div class="wrapper  display-flex">
    <div class="techweb">
      <div class="left">
        <usercenter></usercenter>
      </div>
      <div class="body" :class="unfold ? 'active' : ''">
        <heads ref="heads"></heads>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usercenter from "@/components/home/usercenter";
import heads from "@/components/home/heads";
import { mapGetters } from "vuex";
export default {
  name: "techweb",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["windowSize", "unfold"])
  },
  components: {
    usercenter,
    heads
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  .techweb {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }
  .body {
    position: absolute;
    height: 100%;
    width: calc(100vw - 74px);
    left: 74px;
    // transition: .2s ease;
    // display: flex;
    // flex-direction: column;
    &.active {
      width: calc(100vw - 234px);
      left: 234px;
    }
    .content {
      height: calc(100vh - 60px);
    }
  }
}
</style>
