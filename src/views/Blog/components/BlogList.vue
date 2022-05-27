<template>
  <div class="blog-list-container" ref="container">
    <ul v-loading="isLoading">
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name:'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <img
                v-laze="item.thumb"
                :alt="item.title"
                :title="item.title"
            />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name:'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <h2>{{item.title}}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{formatDate(item.createDate)}}</span>
            <span>浏览：{{item.scanNumber}}</span>
            <span>评论:{{item.commentNumber}}</span>
            <RouterLink :to="{
              name:'CategoryBlog',
              params: {
                categoryid: item.category.id,
              },
            }">{{item.category.name}}</RouterLink>
          </div>
          <div class="desc">
            {{item.description}}
          </div>
        </div>
      </li>
    </ul>
    <Pager :current="routerInfo.page"
           :limit="routerInfo.limit"
           :total="data.total"
          @pageChange="handlePageChange"/>
  </div>
</template>

<script>
  import {getBlogs} from "@/api/blog";
  import fetchData from "@/mixins/fetchData";
  import Pager from "@/components/Pager";
  import {formatDate} from "@/utils";
  export default {
    mixins:[fetchData({})],
    components: {
      Pager
    },
    computed: {
    //  得到路由信息
      routerInfo() {
        const page = +this.$route.query.page || 1;
        const limit = +this.$route.query.limit || 10;
        const categoryId = this.$route.params.categoryid || -1;
        return {
          page,
          limit,
          categoryId
        }
      },
    },
    methods: {
      formatDate,
      async fetchData() {
        return await getBlogs(this.routerInfo.page,this.routerInfo.limit,this.routerInfo.categoryId);
      },
      handlePageChange(newpage) {
        if(this.routerInfo.categoryId === -1) {
        // 当前是blog
          this.$router.push({
            name:'Blog',
            query: {
              page: newpage,
              limit: this.routerInfo.limit
            }
          })
        }else {
        //  categoryBlog
          this.$router.push({
            name:'CategoryBlog',
            query: {
              page: newpage,
              limit: this.routerInfo.limit
            },
            params: {
              categoryid: this.routerInfo.categoryId
            }
          })
        }
      },
      handleScrollHeight(scrollheight) {
        this.$refs.container.scrollTop = scrollheight;
      },
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.container)
      }
    },
    watch:{
      async $route() {
        this.isLoading = true;
        this.$refs.container.scrollTop = 0;
        this.data = await this.fetchData();
        this.isLoading = false;
      }
    },
    mounted() {
      this.$bus.$on('setScrollHeight',this.handleScrollHeight);
      this.$refs.container.addEventListener('scroll',this.handleScroll)
    },
    beforeDestroy() {
      this.$bus.$off('setScrollHeight',this.handleScrollHeight)
      this.$refs.container.removeEventListener('scroll',this.handleScroll)
      this.$bus.$emit('mainScroll')
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
  li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid @gray;
    .thumb {
      flex: 0 0 auto;
      margin-right: 15px;
      img {
        display: block;
        max-width: 200px;
        border-radius: 5px;
      }
    }
    .main {
      flex: 1 1 auto;
      h2 {
        margin: 0;
      }
    }
    .aside {
      font-size: 12px;
      color: @gray;
      span {
        margin-right: 15px;
      }
    }
    .desc {
      margin: 15px 0;
      font-size: 14px;
    }
  }
</style>