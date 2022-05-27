<template>
  <div class="home-container" ref="container" @wheel="handleWheel" v-loading="loading">
    <ul class="carousel-container" :style="{marginTop}" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item"/>
      </li>
    </ul>
    <div class="icon icon-up" v-show="index > 0" @click="changeIndex(index - 1)">
      <Icon type="arrowUp"/>
    </div>
    <div class="icon icon-down" v-show="index < data.length - 1" @click="changeIndex(index + 1)">
      <Icon type="arrowDown"/>
    </div>
    <ul class="dots">
      <li v-for="(item,i) in data" :key="item.id" @click="changeIndex(i)" :class="{active: index === i}"></li>
    </ul>
  </div>
</template>

<script>

  import Icon from "@/components/Icon";
  import {mapState} from "vuex";
  import CarouselItem from "@/views/Home/components/CarouselItem";
  export default {

    data() {
      return {
        index: 0,//当前显示第几张图片
        containerHeight: 0,
        switchChang: true // 为true的时候可以切换否则不可以
      }
    },
    components: {
      Icon,
      CarouselItem
    },
    computed: {
      marginTop() {
        return -this.index * this.containerHeight + 'px';
      },
      ...mapState('banner',['data','loading'])
    },
    methods: {
      changeIndex(i) {
        this.index = i;
      },
      handleWheel(e) {
        if(!this.switchChang) {
          return
        }

        if(e.deltaY === 125 && this.index < this.data.length - 1) {
          this.index++;
          this.switchChang = false;
        }else if(e.deltaY === -125 && this.index > 0) {
          this.index--;
          this.switchChang = false;
        }
      },
      handleTransitionEnd() {
        this.switchChang = true;
      },
      setSize() {
        this.containerHeight = this.$refs.container.clientHeight;
      }
    },
    created() {
      this.$store.dispatch("banner/fetchBanner");
    },
    mounted() {
      this.containerHeight = this.$refs.container.clientHeight;
      window.addEventListener('resize',this.setSize);
    },
    destroyed() {
      window.removeEventListener('resize',this.setSize)
    }
  }
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
  .home-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    ul,li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .carousel-container {
      width: 100%;
      height: 100%;
      transition: .4s;
      li {
        width: 100%;
        height: 100%;
      }
    }
    .icon {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: @gray;
      font-size: 30px;
      cursor: pointer;
      &-up {
        top: 25px;
        animation: jumpUp 1s infinite;
      }
      &-down {
        bottom: 25px;
        animation: jumpDown 1s infinite;
      }
    }
    .dots {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      li {
        width: 7px;
        height: 7px;
        border: 1px solid #fff;
        background-color: #000;
        margin: 10px 0;
        border-radius: 50%;
        cursor: pointer;
        &.active {
          background-color: #fff;
        }
      }
    }
  }
  @keyframes jumpUp {
    0% {
      top: 20px;
    }
    50% {
      top: 25px;
    }
    100% {
      top: 20px;
    }
  }
@keyframes jumpDown {
  0% {
    bottom: 30px;
  }
  50% {
    bottom: 25px;
  }
  100% {
    bottom: 30px;
  }
}
</style>