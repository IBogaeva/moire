import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    cartProductsData: [],
    cartProducts: [],
    cartProductsLoading: true,
  },
  mutations: {
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id, amount: item.quantity,
      }));
    },
    updateCartProductsLoading(state, loading) {
      state.cartProductsLoading = loading;
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((it) => it.productId === productId);

      if (item) {
        item.amount = amount;
      }
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
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => item.amount + acc, 0);
    },
    cartProductsLoading(state) {
      return state.cartProductsLoading;
    },
  },
  actions: {
    async loadCart(context) {
      context.commit('updateCartProductsLoading', true);
      await axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.rootState.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.rootState.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .then(() => {
          context.commit('updateCartProductsLoading', false);
        });
    },
    async addProductToCart(context, {
      id, colorId, sizeId, amount,
    }) {
      const response = await axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId: id,
        colorId,
        sizeId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.rootState.userAccessKey,
        },
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
  },
};
