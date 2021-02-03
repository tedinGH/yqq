<template>
  <div class="messagebox">
    <div v-if="luyou == 'default'" class="default">
      <img src="../../../assets/images/big-logo.png" />
    </div>
    <!-- 对话中 -->
    <dialogue class="session-box" v-if="luyou == 'dialogue'"></dialogue>
    <!-- 历史会话 -->
    <history ref="history" v-if="luyou == 'history'" class="history"></history>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import history from "@/components/home/session/history";
import reply from "@/components/home/session/reply";
import dialogue from "@/components/home/session/dialogue";
export default {
  name: "messagebox",
  data() {
    return {};
  },
  components: {
    history,
    dialogue
  },
  computed: {
    ...mapGetters([
      "history",
      "currentSession",
      "userInfo",
      "showwait",
      "luyou"
    ])
  }
};
</script>

<style lang="scss" scoped>
.messagebox {
  width: 100%;
  .default {
    display: flex;
    background: #f0f2f7;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .session-box {
    width: 100%;
    height: 100%;
  }
}
</style>
