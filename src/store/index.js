import Vue from 'vue'
import Vuex from 'vuex'
import banner from "./banner";
import setting from "./setting";
import about from "./about";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    banner,
    setting,
    about
  },
  strict: true
})
