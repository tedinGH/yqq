<template>
  <div class="admin">
    <v-sidebar></v-sidebar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vSidebar from '../components/common/Sidebar.vue'
export default {
  name: "admin",
  components: {
      vSidebar,
    },
  data() {
    return {
      //
    };
  },
  mounted() {
    // DO SOMETHING
  }
};
</script>

<style lang="scss" scoped>
//
</style>
