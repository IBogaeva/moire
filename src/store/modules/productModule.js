import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    productsData: null,
    productData: null,
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
    categoryData(state) {
      return state.productData
        ? state.productData.category
        : '';
    },
    productColorsData(state) {
      return state.productData.colors;
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
    async loadProduct(context, id) {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      context.commit('updateProduct', response.data);
    },
  },
};
