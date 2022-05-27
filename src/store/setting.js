import {getSetting} from "@/api/setting"
export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state,payload) {
      state.loading = payload;
    },
    setData(state,payload){
      state.data = payload;
    }
  },
  actions: {
    async fetchSetting(ctx) {
      if(ctx.state.data) {
        return
      }
      ctx.commit('setLoading',true);
      const result = await getSetting();
      ctx.commit('setData',result);
      ctx.commit('setLoading',false);
    }
  }
}