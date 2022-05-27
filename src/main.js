import "./mock";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/global.less";
import {showMessage} from "@/utils";
import vLoading from "@/directives/loading";
import vLaze from "@/directives/laze";
import "./eventBus";
Vue.prototype.$showMessage = showMessage;
Vue.directive('loading',vLoading)
Vue.directive('laze',vLaze)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
