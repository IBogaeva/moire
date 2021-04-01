import Vue from 'vue';
import Vuex from 'vuex';
import productModule from '@/store/modules/productModule';
import referenceModule from '@/store/modules/referenceModule';
import cartModule from '@/store/modules/cartModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    error: {
      type: Object,
      default: () => ({
        message: '',
        code: Number,
        request: {},
      }),
    },
  },
  getters: {
    formError(state) {
      return state.error;
    },
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    resetErrors(state) {
      state.error = {};
    },
    updateError(state, error) {
      state.error = error;
    },
  },
  actions: {
  },
  modules: {
    product: productModule,
    reference: referenceModule,
    cart: cartModule,
  },
});
