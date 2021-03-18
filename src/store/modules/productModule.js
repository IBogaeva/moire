import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    productsData: null,
  },
  mutations: {
    updateProductsData(state, products) {
      state.productsData = products;
    },
  },
  getters: {
    productsData(state) {
      return state.productsData
        ? state.productsData
        : [];
    },
  },
  actions: {
    async loadProducts(context, { page, limit }) {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          page,
          limit,
        },
      });
      context.commit('updateProductsData', response.data);
    },
  },
};
