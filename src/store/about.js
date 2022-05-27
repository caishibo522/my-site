import {getAbout} from "@/api/about";
import {getBanner} from "@/api/banner";
export default {
  namespaced:true,
  state: {
    loading: false,
    data: ''
  },
  mutations: {
    setLoading(state,payload) {
      state.loading = payload;
    },
    setData(state,payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchAbout(ctx) {
      if(ctx.state.data) {
        return
      }
      ctx.commit('setLoading',true);
      const result = await getAbout();
      ctx.commit('setData',result);
      ctx.commit('setLoading',false);
    }
  }
}