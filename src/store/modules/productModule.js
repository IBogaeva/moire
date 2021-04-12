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
      context.commit('lockUi');
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
        context.commit('updateProductsData', response.data);
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
      context.commit('unlockUi');
    },
    async loadProduct(context, id) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        context.commit('updateProduct', response.data);
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
    },
  },
};
