<template>
  <ul class="right-list-container">
    <li v-for="item in list" :key="item.id" >
      <span :class="{active: item.isSelect}" @click="handleClick(item)">{{item.name}}</span>
      <RightList :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
  export default {
    name:'RightList',
    props: {
      list: {
        type:Array,
        default: () => []
      }
    },
    methods: {
      handleClick(item) {
        if(!item.select) {
          this.$emit('select',item)
        }

      }
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
  .right-list-container {
    list-style: none;
    padding: 0;
    .right-list-container {
      margin-left: 1em;
    }
    li {
      min-height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      .active {
        color: @warn;
        font-weight: bold;
      }
    }
  }
</style>