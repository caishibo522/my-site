<template>
  <div class="image-loader-container">
    <img :src="placeholder" class="placeholder" v-if="hasBlurImg">
    <img :src="src" :style="{opacity: originOpacity,transition: `${duration}ms`}" @load="handleLoad">
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type:String,
        required: true
      },
      placeholder: {
        type:String,
        required: true
      },
      duration: {
        type:Number,
        default: 500
      }
    },
    data() {
      return {
        originLoad: false,
        hasBlurImg: true// 是否需要模糊的图片
      }
    },
    computed: {
      originOpacity() {
        return this.originLoad?1:0
      }
    },
    methods: {
      handleLoad() {
        this.originLoad = true;
        setTimeout(() => {
          this.hasBlurImg = false;// 模糊的图片消失
          this.$emit('load');
        },this.duration)
      }
    }
  }
</script>

<style scoped lang="less">
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    &.placeholder {
      filter: blur(2vw);
    }
  }
}
</style>