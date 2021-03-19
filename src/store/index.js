import Vue from 'vue';
import Vuex from 'vuex';
import productModule from '@/store/modules/productModule';
import referenceModule from '@/store/modules/referenceModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product: productModule,
    reference: referenceModule,
  },
});
