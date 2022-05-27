<template>
  <div class="to-top-container" v-show="show" @click="handleClick">
    top
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleScroll(dom) {
        if(!dom) {
          this.show = false;
          return
        }
        this.show = (dom.scrollTop > 500? true:false)
      },
      handleClick() {
        this.$bus.$emit('setScrollHeight',0)
      }
    },
    created() {
      this.$bus.$on('mainScroll',this.handleScroll)
    },
    destroyed() {

    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
.to-top-container {
  width: 50px;
  height: 50px;
  background-color: @primary;
  color: #fff;
  border-radius: 50%;
  position: fixed;
  right: 50px;
  bottom: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
</style>