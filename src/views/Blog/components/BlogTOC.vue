<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="list" @select="handleSelect"></RightList>
  </div>
</template>

<script>
  import RightList from "./RightList";
  import {debounde} from "@/utils";

  export default {
    props: ['toc'],
    data() {
      return {
        activeAnchor: ''
      }
    },
    components: {
      RightList,
    },
    computed: {
      list() {
        const getTOC = (toc =[]) => {
          return toc.map(it => ({
            ...it,
            isSelect:this.activeAnchor === it.anchor,
            children: getTOC(it.children)
          }))
        }
        return getTOC(this.toc)
      },
      dom() {
        const doms = [];
        const getDom = (toc =[]) => {
          for(const it of toc) {
            doms.push(document.querySelector(`#${it.anchor}`))
            if(it.children && it.children.length > 0) {
              getDom(it.children)
            }
          }
        }
        getDom(this.toc)
        return doms
      }
    },
    methods: {
      handleSelect(item) {
        this.activeAnchor = item.anchor;
        location.hash = item.anchor;
      },
      setSelect(scrollDom) {
        if(!scrollDom) {
          return
        }
        this.activeAnchor = '';
          for(const dom of this.dom) {
            if(!dom) {
              continue;
            }
            const range = 200;
            const rect = dom.getBoundingClientRect();
            if(rect.top >= 0 && rect.top <= range) {
              this.activeAnchor = dom.id;
              return;
            }else if(rect.top > range) {
              return
            }else {
              this.activeAnchor = dom.id;
            }
          }
      }
    },
    created() {
      this.selectDebounce = debounde(this.setSelect,50)
      this.$bus.$on('mainScroll',this.selectDebounce)
    },
    destroyed() {
      this.$bus.$off('mainScroll',this.selectDebounce)
    }
  }
</script>

<style scoped>

</style>