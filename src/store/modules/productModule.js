import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    productsData: Array,
  },
  mutations: {
    updateProductsData(state, products) {
      state.productsData = products;
    },
  },
  getters: {
    products(state) {
      return state.productsData.items;
    },
  },
  actions: {
    async loadProducts(context) {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
      });
      context.commit('updateProductsData', response.data);
    },
  },
};
