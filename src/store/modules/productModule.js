import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    productsData: null,
    productData: {},
  },
  mutations: {
    updateProductsData(state, products) {
      state.productsData = products;
    },
    updateProduct(state, product) {
      state.productData = product;
    },
  },
  getters: {
    productsData(state) {
      return state.productsData
        ? state.productsData
        : [];
    },
    productData(state) {
      return state.productData
        ? state.productData
        : undefined;
    },
    colorIdData(state, getters) {
      return getters.productData.colors ? getters.productData.colors[0].color.id : 0;
    },
    sizeIdData(state, getters) {
      return getters.productData.sizes ? getters.productData.sizes[0].id : 0;
    },
  },
  actions: {
    async loadProducts({ commit }, {
      categoryId,
      materialIds,
      seasonIds,
      colorIds,
      page,
      limit,
      minPrice,
      maxPrice,
    }) {
      commit('lockUi', { root: true });
      try {
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
        commit('updateProductsData', response.data);
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadProduct({ commit }, id) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        commit('updateProduct', response.data);
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
  },
};
