import Vue from "vue";
const app = new Vue();
Vue.prototype.$bus =  app;
export default app
/*
* 事件约定
* mainScroll
* 文章详情页滚动条滚动的时候触发,参数为container元素
*
* setScrollHeight
* 参数: 0
* 设置滚动条的scrollTop为0
* */