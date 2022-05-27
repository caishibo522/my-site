<template>
  <div class="about-container" v-loading="loading">
    <iframe :src="data" frameborder="0"></iframe>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  export default {
    computed: {
      ...mapState('about',['data','loading'])
    },
    created() {
      this.$store.dispatch('about/fetchAbout');
      console.log(this.data)
    }
  }
</script>
<style scoped>
.about-container {
  width: 100%;
  height: 100%;
}
  iframe {
    width: 100%;
    height: 100%;
  }
</style>