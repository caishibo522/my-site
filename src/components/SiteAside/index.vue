<template>
  <div class="site-aside-container">
    <Avatar v-if="data" :url="data.avatar"/>
    <Menu />
    <Contact v-if="data" />
  </div>
</template>

<script>
  import Avatar from "@/components/Avatar";
  import Menu from "./Menu";
  import Contact from "./Contact"
  import {mapState} from "vuex";
  export default {
    components: {
      Avatar,
      Menu,
      Contact
    },
    computed: {
      ...mapState('setting',['data','loading'])
    },
    created() {
      this.$store.dispatch('setting/fetchSetting');
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
  .site-aside-container {
    width: 100%;
    height: 100%;
    background: @dark;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .avatar-container {
    margin: 0 auto;
  }
</style>