<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>目录</h2>
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
  import RightList from "./RightList";
  import fetchData from "@/mixins/fetchData";
  import {getBlogType} from "@/api/blog";

  export default {
    mixins:[fetchData([])],
    components: {
      RightList,
    },
    computed: {
      categoryId() {
        return +this.$route.params.categoryid || -1;
      },
      limit() {
        return +this.$route.query.limit || 10
      },
      list() {
        const totalArticleCount = this.data.reduce((a,b) => a + b.articleCount,0)
        const result = [{id:-1,name:'全部文章',articleCount: totalArticleCount},...this.data]
        return result.map(it => ({
          ...it,
          isSelect: it.id === this.categoryId,
          aside: `${it.articleCount}篇`
        }))
      }
    },
    methods: {
      async fetchData() {
        return await getBlogType();
      },
      handleSelect(it) {
        if(it.id === -1) {
          this.$router.push({
            name:'Blog',
            query: {
              page: 1,
              limit: this.limit
            }
          })
        }else {
          this.$router.push({
            name:'CategoryBlog',
            query: {
              page: 1,
              limit: this.limit,
            },
            params: {
              categoryid: it.id
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .blog-category-container {
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    height: 100%;
    overflow-y: auto;
    h2 {
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 1em;
      margin: 0;
    }
  }
</style>