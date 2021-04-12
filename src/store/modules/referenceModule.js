import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    categoriesData: {},
    colorsData: {},
    materialsData: {},
    seasonsData: {},
    deliveriesData: [],
    paymentsData: [],
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
    updateDeliveriesData(state, deliveries) {
      state.deliveriesData = deliveries;
    },
    updatePaymentsData(state, payments) {
      state.paymentsData = payments;
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
    deliveriesData(state) {
      return state.deliveriesData
        ? state.deliveriesData
        : [];
    },
    paymentsData(state) {
      return state.paymentsData
        ? state.paymentsData
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
    async loadDeliveries(context) {
      const response = await axios.get(`${API_BASE_URL}/api/deliveries`);
      context.commit('updateDeliveriesData', response.data);
    },
    async loadPayments(context, deliveryTypeId) {
      const response = await axios.get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId,
        },
      });
      context.commit('updatePaymentsData', response.data);
    },
  },
};
