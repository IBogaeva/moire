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
    colorIdData(state) {
      return state.productData.colors ? state.productData.colors[0].color.id : 0;
    },
    sizeIdData(state) {
      return state.productData.sizes ? state.productData.sizes[0].id : 0;
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
