<template>
  <div class="message-container" ref="container">
    <MessageArea title="留言板"
                 :sub-title="`(${data.total})`"
                 :list="data.rows"
                 @submit="handleSubmit"
                :isListLoading="isLoading"/>
  </div>
</template>

<script>
  import {getMessage,postMessage} from "@/api/message";
  import fetchData from "@/mixins/fetchData";
  import MessageArea from "@/components/MessageArea";
  export default {
    mixins:[fetchData({rows: [],total: 0})],
    data() {
      return {
        page: 1,
        limit: 10
      }
    },
    components: {
      MessageArea
    },
    computed: {
      hasMore() {
        return this.data.rows.length < this.data.total
      }
    },
    methods: {
      async fetchData() {
        return await getMessage(this.page,this.limit)
      },
      async handleSubmit(formData,callback) {
        const result = await postMessage({
          nickname: formData.nickname,
          content: formData.content
        })
        this.data.total++;
        this.data.rows.unshift(result)
        callback('评论成功')
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
      handleScroll() {
        if(this.isLoading) {
          return
        }
        const range = 100;
        const scrollheight = this.$refs.container.scrollHeight - this.$refs.container.scrollTop - this.$refs.container.clientHeight;
        if(scrollheight < range) {
          this.fetchMore();
        }
        console.log(scrollheight)
      }
    },
    mounted() {
      this.$refs.container.addEventListener('scroll',this.handleScroll)
    },
    beforeDestroy() {
      this.$refs.container.removeEventListener('scroll',this.handleScroll)
    }
  }
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  overflow-y: scroll;
}
  .message-area-container {
    width: 700px;
    margin: 0 auto;
  }
</style>