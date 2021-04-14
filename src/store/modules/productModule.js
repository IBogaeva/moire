import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import images from '@/data/images';

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
      if (state.productData) {
        state.productData.colors.map((color) => color.gallery.push(...images));
      }
      return state.productData
        ? state.productData
        : undefined;
    },
    colorIdData(state) {
      return state.productData.colors ? state.productData.colors[0].color.id : 0;
    },
    sizeIdData(state) {
      return state.productData.sizes ? state.productData.sizes[0].id : 0;
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
