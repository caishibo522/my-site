<template>
  <Layout>
    <template #default>
      <div ref="mainContainer" class="main-container" v-loading="isLoading">
        <BlogDetail v-if="data" :blog="data"/>
        <BlogComment v-if="!isLoading"/>
      </div>
    </template>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC v-if="data" :toc="data.toc"/>
      </div>
    </template>
  </Layout>
</template>

<script>
  import {getBlog} from "@/api/blog.js";
  import fetchData from "@/mixins/fetchData";
  import Layout from "@/components/Layout";
  import BlogDetail from "./components/BlogDetail";
  import BlogTOC from "./components/BlogTOC";
  import BlogComment from "./components/BlogComment";
  export default {
    mixins:[fetchData({})],
    components: {
      Layout,
      BlogDetail,
      BlogTOC,
      BlogComment
    },
    methods: {
      async fetchData() {
        return await getBlog(this.$route.params.id)
      },
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.mainContainer)
      },
      setScroll(scrollheight) {
         this.$refs.mainContainer.scrollTop = scrollheight;
      }
    },
    created() {
      this.$bus.$on('setScrollHeight',this.setScroll)
    },
    mounted() {
      this.$refs.mainContainer.addEventListener('scroll',this.handleScroll)
    },
    beforeDestroy() {
      this.$refs.mainContainer.removeEventListener('scroll',this.handleScroll)
      this.$bus.$emit('mainScroll')
      this.$bus.$off('setScrollHeight',this.setScroll)
    },
    updated() {
      const hash = location.hash;
      location.hash = '';
      setTimeout(() => {
        location.hash = hash;
      },50)
    }
  }
</script>

<style scoped>
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>