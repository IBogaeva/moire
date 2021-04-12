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
    async loadCategories({ commit }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/productCategories`);
        commit('updateCategoriesData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadColors({ commit }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/colors`);
        commit('updateColorsData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadMaterials({ commit }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/materials`);
        commit('updateMaterialsData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadSeasons({ commit }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/seasons`);
        commit('updateSeasonsData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadDeliveries({ commit }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/deliveries`);
        commit('updateDeliveriesData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadPayments({ commit }, deliveryTypeId) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/payments`, {
          params: {
            deliveryTypeId,
          },
        });
        commit('updatePaymentsData', response.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('unlockUi', { root: true });
      }
    },
  },
};
