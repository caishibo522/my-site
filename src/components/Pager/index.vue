<template>
  <div class="pager-container" v-if="totalPager > 1">
    <a :class="{disabled: current === 1}" @click="handleClick(1)">|&lt;&lt;</a>
    <a :class="{disabled: current === 1}" @click="handleClick(current - 1)">&lt;&lt;</a>
    <a v-for="n in nums" :key="n" :class="{active: current === n}" @click="handleClick(n)">{{n}}</a>
    <a :class="{disabled: current === totalPager}" @click="handleClick(current + 1)">&gt;&gt;</a>
    <a :class="{disabled: current === totalPager}" @click="handleClick(totalPager)">&gt;&gt;|</a>
  </div>
</template>

<script>
  export default {
    props: {
      current: {
        type:Number,
        default: 1
      },
      total: {
        type:Number,
        default: 0
      },
      limit: {
        type:Number,
        default: 10
      },
      visibleNumber: {
        type:Number,
        default: 10
      }
    },
    computed: {
    //  计算一共有多少页数据
      totalPager() {
        return Math.ceil(this.total / this.limit)
      },
    //  计算最小页数
      min() {
        let min = this.current - Math.floor(this.visibleNumber / 2);
        if(min < 1) {
          min = 1
        }
        return min
      },
    //  计算最大页数
      max() {
        let max = this.min + this.visibleNumber - 1;
        if(max > this.totalPager) {
          max = this.totalPager
        }
        return max
      },
    //  生成当前显示的页面
      nums() {
        let num = [];
        for(let i = this.min; i <= this.max; i++) {
          num.push(i)
        }
        return num
      }
    },
    methods: {
      handleClick(i) {
        if(i < 1) {
          i = 1
        }
        if(i > this.totalPager) {
          i = this.totalPager;
        }
        if(i === this.current) {
          return
        }
        this.$emit('pageChange',i)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    margin: 0 7px;
    cursor: pointer;
    color: @primary;
    &.disabled {
      color: @gray;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>