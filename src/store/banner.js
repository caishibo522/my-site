import {getBanner} from "@/api/banner";
export default {
  namespaced: true,
  state: {
    loading: false,
    data: []
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
    async fetchBanner(ctx) {
      if(ctx.state.data.length) {
        return
      }
      ctx.commit('setLoading',true);
      const result = await getBanner();
      ctx.commit('setData',result);
      ctx.commit('setLoading',false);
    }
  }
}