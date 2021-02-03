<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { Crypto } from "@/tools/crypto";
import { actionApi } from "@/api";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {

  },
  mounted() {
    let lang = localStorage.getItem("locale") || "en_US";
    this.$store.commit("SET_LANG", lang);
    this.$store.commit("SET_TRANSLATE", this.$t("msg"));
    let Authorization = sessionStorage.getItem("Authorization");
    this.$store.commit("SET_TOKEN", Authorization);
    if (!Authorization) {
      this.$router.push({
        path: "/" 
      });
    }
  }
};
</script>
<style src="./assets/css/base.css"></style>
<style lang="scss">

</style>
