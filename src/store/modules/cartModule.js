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
  actions: {
    async loadCart(context) {
      context.commit('updateCartProductsLoading', true);
      await axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
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
          userAccessKey: context.state.userAccessKey,
        },
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    },
  },
};
