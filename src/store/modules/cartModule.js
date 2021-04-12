import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    cartProductsData: [],
    cartProducts: [],
    orderInfo: null,
  },
  mutations: {
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        id: item.id,
        productId: item.product.id,
        amount: item.quantity,
        color: item.color.color,
        image: item.color.gallery ? item.color.gallery[0] : undefined,
        size: item.size,
      }));
    },
    deleteCartProduct(state, id) {
      state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
    },
    updateCartProductAmount(state, { id, productId, amount }) {
      const item = state.cartProducts.find((it) => (it.id === id) && (it.productId === productId));

      if (item) {
        item.amount = amount;
      }
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product: cartProduct } = state.cartProductsData
          .find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...cartProduct,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => item.amount + acc, 0);
    },
  },
  actions: {
    async loadCart({ commit, getters }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: getters.userAccessKey,
          },
        });
        if (!getters.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          commit('updateUserAccessKey', response.data.user.accessKey);
        }
        commit('updateCartProductsData', response.data.items);
        commit('syncCartProducts');
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async addProductToCart({ commit, getters }, {
      id, colorId, sizeId, amount,
    }) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.post(`${API_BASE_URL}/api/baskets/products`, {
          productId: id,
          colorId,
          sizeId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: getters.userAccessKey,
          },
        });
        commit('updateCartProductsData', response.data.items);
        commit('syncCartProducts');
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async updateCartProductAmount({ commit, getters }, { id, productId, amount }) {
      commit('lockUi', { root: true });
      commit('updateCartProductAmount', { id, productId, amount });
      if (amount < 1) {
        return;
      }
      try {
        const response = await axios.put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId: id,
          quantity: amount,
        }, {
          params: {
            userAccessKey: getters.userAccessKey,
          },
        });
        commit('updateCartProductsData', response.data.items);
      } catch (error) {
        commit('syncCartProducts');
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async deleteCartProduct({ commit, getters }, id) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.request({
          method: 'delete',
          url: `${API_BASE_URL}/api/baskets/products`,
          params: {
            userAccessKey: getters.userAccessKey,
          },
          data: {
            basketItemId: id,
          },
        });
        commit('updateCartProductsData', response.data.items, id);
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('syncCartProducts');
        commit('unlockUi', { root: true });
      }
    },
    async order({ commit, getters }, {
      name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
    }) {
      commit('resetErrors');
      commit('lockUi', { root: true });
      try {
        const response = await axios.post(`${API_BASE_URL}/api/orders`, {
          name,
          address,
          phone,
          email,
          deliveryTypeId,
          paymentTypeId,
          comment,
        }, {
          params: {
            userAccessKey: getters.userAccessKey,
          },
        });
        commit('resetCart');
        commit('updateOrderInfo', response.data);
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
    async loadOrderInfo({ commit, getters }, orderId) {
      commit('lockUi', { root: true });
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: getters.userAccessKey,
          },
        });
        commit('updateOrderInfo', response.data);
      } catch (error) {
        commit('updateError', error.response.data.error);
        throw error;
      } finally {
        commit('unlockUi', { root: true });
      }
    },
  },
};
