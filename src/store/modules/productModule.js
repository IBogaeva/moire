import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    productsData: null,
    productData: {
      category: {
        id: Number,
        slug: String,
        title: String,
      },
      colors: [{
        color: {
          code: String,
          id: Number,
          title: String,
        },
        gallery: [{
          file: {
            extension: String,
            name: String,
            originalName: String,
            size: String,
            url: String,
          },
        }],
      }],
      content: String,
      id: Number,
      materials: [{
        code: String,
        id: Number,
        productsCount: Number,
        title: String,
      }],
      price: Number,
      seasons: [{
        code: String,
        id: Number,
        productsCount: Number,
        title: String,
      }],
      sizes: [{
        id: Number,
        title: String,
      }],
      slug: String,
      title: String,
    },
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
      await axios.get(`${API_BASE_URL}/api/products`, {
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
      })
        .then((response) => {
          context.commit('updateProductsData', response.data);
        })
        .catch((error) => {
          context.commit('updateError', error.response.data.error);
          throw error;
        });
    },
    async loadProduct(context, id) {
      await axios.get(`${API_BASE_URL}/api/products/${id}`)
        .then((response) => {
          context.commit('updateProduct', response.data);
        })
        .catch((error) => {
          context.commit('updateError', error.response.data.error);
          throw error;
        });
    },
  },
};
