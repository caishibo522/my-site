<template>
  <div class="carousel-item-container" ref="container" @mousemove="handleMove" @mouseleave="handleLeave">
    <div class="carousel-img" ref="inner" :style="impPosition">
      <ImageLoader :placeholder="carousel.bgImg" :src="carousel.bgImg" @load="showWords"/>
    </div>
    <div class="title" ref="title">
      {{carousel.title}}
    </div>
    <div class="desc" ref="desc">
      {{carousel.description}}
    </div>
  </div>
</template>

<script>
  import ImageLoader from "@/components/ImageLoader";
  export default {
    props: ['carousel'],
    components: {
      ImageLoader,
    },
    data() {
      return {
        titleWidth: 0,
        descWidth: 0,
        containerSize: null,
        innerSize: null,
        mousex: 0,
        mousey: 0
      }
    },
    computed: {
      impPosition() {
        if(!this.containerSize || !this.innerSize) {
          return
        }
        const extraWidth = this.innerSize.width - this.containerSize.width;
        const extraHeight = this.innerSize.height - this.containerSize.height;
        const left = -this.mousex / this.containerSize.width * extraWidth;
        const top = -this.mousey / this.containerSize.height * extraHeight;
        return {
          transform: `translate(${left}px,${top}px)`
        }
      },
      center() {
        return {
          x: this.containerSize.width,
          y: this.containerSize.height
        }
      }
    },
    methods: {
      showWords() {
        this.$refs.title.style.opacity = 1;
        this.$refs.title.style.width = 0;
        this.$refs.title.clientHeight;
        this.$refs.title.style.transition = '1s';
        this.$refs.title.style.width = this.titleWidth + 'px';

        this.$refs.desc.style.opacity = 1;
        this.$refs.desc.style.width = 0;
        this.$refs.desc.clientHeight;
        this.$refs.desc.style.transition = '2s 1s';
        this.$refs.desc.style.width = this.descWidth + 'px';
      },
      handleMove(e) {
        const rect = this.$refs.container.getBoundingClientRect();
        this.mousex = e.pageX - rect.left;
        this.mousey = e.pageY - rect.top;
      },
      handleLeave() {
        this.mousex = this.center.x;
        this.mousey = this.center.y;
      }
    },
    mounted() {
      this.titleWidth = this.$refs.title.clientWidth;
      this.descWidth = this.$refs.desc.clientWidth;
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
      this.innerSize = {
        width: this.$refs.inner.clientWidth,
        height: this.$refs.inner.clientHeight
      }
      this.mousex = this.center.x;
      this.mousey = this.center.y;
    }
  }
</script>

<style scoped lang="less">
  @import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .carousel-img {
    width: 110%;
    height: 110%;
    transition: .5s;
  }
  .title,.desc {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    opacity: 0;
    overflow: hidden;
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>