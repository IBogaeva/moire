import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    categoriesData: {
      items: [{
        id: 0,
        title: String,
        slug: String,
      }],
    },
    colorsData: {
      items: [{
        id: 0,
        title: String,
        code: String,
      }],
    },
    materialsData: {
      items: [{
        id: 0,
        title: String,
        code: String,
        productsCount: Number,
      }],
    },
    seasonsData: {
      items: [{
        id: 0,
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
    updateSeasonsData(state, seasons) {
      state.seasonsData = seasons;
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
    seasonsData(state) {
      return state.seasonsData
        ? state.seasonsData.items
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
    async loadSeasons(context) {
      const response = await axios.get(`${API_BASE_URL}/api/seasons`);
      context.commit('updateSeasonsData', response.data);
    },
  },
};
