<template>
  <div class="menu-container">
    <RouterLink v-for="item in items"
                :key="items.name"
                :to="{name:item.name}"
                :exact="item.exact"
                active-class="selected"
                exact-active-class="">
      <div class="icon">
        <Icon :type="item.icon"/>
      </div>
      <span>{{item.title}}</span>
    </RouterLink>
  </div>
</template>

<script>
  import Icon from "@/components/Icon";
  export default {
    data() {
      return {
        items: [
          {
            name:'Home',
            title:'首页',
            icon:'home',
            exact: true
          },
          {
            name:'Blog',
            title:'文章',
            icon:'blog',
            exact: false
          },
          {
            name:'About',
            title:'关于我',
            icon:'about',
            exact: true
          },
          {
            name:'Message',
            title:'留言板',
            icon: 'chat',
            exact: true
          }
        ]
      }
    },
    components: {
      Icon,
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
  .menu-container {
    color: @gray;
    margin: 24px 0;
    a {
      padding: 0 50px;
      display: flex;
      align-items: center;
      height: 45px;
      .icon {
        width: 24px;
      }
      &:hover {
        color: #fff;
      }
      &.selected {
        background-color: darken(@words, 3%);
      }
    }
  }
</style>