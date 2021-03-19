import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    categoriesData: null,
    colorsData: {
      items: [{
        id: Number,
        title: String,
        code: String,
      }],
    },
    materialsData: {
      items: [{
        id: Number,
        title: String,
        code: String,
        productsCount: Number,
      }],
    },
  },
  mutations: {
    updateCategoriesData(state, categories) {
      state.categoriesData = categories;
    },
    updateColorsData(state, colors) {
      state.colorsData = colors;
    },
    updateMaterialsData(state, materials) {
      state.materialsData = materials;
    },
  },
  getters: {
    categoriesData(state) {
      return state.categoriesData
        ? state.categoriesData.items
        : [];
    },
    colorsData(state) {
      return state.colorsData
        ? state.colorsData.items
        : [];
    },
    materialsData(state) {
      return state.materialsData
        ? state.materialsData.items
        : [];
    },
  },
  actions: {
    async loadCategories(context) {
      const response = await axios.get(`${API_BASE_URL}/api/productCategories`);
      context.commit('updateCategoriesData', response.data);
    },
    async loadColors(context) {
      const response = await axios.get(`${API_BASE_URL}/api/colors`);
      context.commit('updateColorsData', response.data);
    },
    async loadMaterials(context) {
      const response = await axios.get(`${API_BASE_URL}/api/materials`);
      context.commit('updateMaterialsData', response.data);
    },
  },
};
