<template>
  <div class="blog-comment-container">
    <MessageArea title="评论列表"
                 :sub-title="`(${data.total})`"
                 :list="data.rows"
                 :is-list-loading="isLoading"
                 @submit="handleSubmit"/>
  </div>
</template>

<script>
  import MessageArea from "@/components/MessageArea";
  import fetchData from "@/mixins/fetchData";
  import {getComment,postComment} from "@/api/blog";

  export default {
    mixins:[fetchData({rows: [],total: 0})],
   components: {
     MessageArea
   },
    data() {
      return {
        page: 1,
        limit: 10
      }
    },
    computed: {
      hasMore() {
        return this.data.rows.length < this.data.total
      }
    },
    methods: {
      async fetchData() {
        return await getComment(this.$route.params.id,this.page,this.limit)
      },
      async fetchMore() {
          if(!this.hasMore) {
            return
          }
          this.isLoading = true;
          this.page++;
          const result = await this.fetchData();
          this.data.rows = this.data.rows.concat(result.rows);
          this.isLoading = false;

      },
      async handleSubmit(formData,callback) {
        const result = await postComment({
          blogid: this.$route.params.id,
          nickname: formData.nickname,
          content: formData.content
        })
        this.data.total++;
        this.data.rows.unshift(result)
        callback('提交成功')
      },
       handleScroll(dom) {
        if(!dom) {
          return
        }
        const range = 100;
        const scrollheight = dom.scrollHeight - dom.scrollTop - dom.clientHeight
        if(scrollheight<= range) {
         if(!this.isLoading) {
           this.fetchMore()
         }
        }
      }
    },
    created() {
      this.$bus.$on('mainScroll',this.handleScroll)
    },
    destroyed() {
      this.$bus.$off('mainScroll',this.handleScroll)
    }
  }
</script>

<style scoped>
  .blog-comment-container {
    margin: 30px 0;
  }
</style>