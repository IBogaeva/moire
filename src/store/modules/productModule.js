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
    async loadProducts(context, {
      page,
      limit,
      categoryId,
      materialIds,
      seasonIds,
      colorIds,
      minPrice,
      maxPrice,
    }) {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          categoryId,
          materialIds,
          seasonIds,
          colorIds,
          page,
          limit,
          minPrice,
          maxPrice,
        },
      });
      context.commit('updateProductsData', response.data);
    },
  },
};
