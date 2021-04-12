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
    updateCartProductsLoading(state, loading) {
      state.cartProductsLoading = loading;
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
    async loadCart(context) {
      context.commit('updateCartProductsLoading', true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
        });
        if (!context.rootState.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts');
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
      context.commit('updateCartProductsLoading', false);
    },
    async addProductToCart(context, {
      id, colorId, sizeId, amount,
    }) {
      try {
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
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
    },
    async updateCartProductAmount(context, { id, productId, amount }) {
      context.commit('lockUi');
      context.commit('updateCartProductAmount', { id, productId, amount });
      if (amount < 1) {
        return;
      }
      try {
        const response = await axios.put(`${API_BASE_URL}/api/baskets/products`, {
          basketItemId: id,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
        });
        context.commit('updateCartProductsData', response.data.items);
      } catch (error) {
        context.commit('syncCartProducts');
        context.commit('updateError', error.response.data.error);
        throw error;
      }
      context.commit('unlockUi');
    },
    async deleteCartProduct(context, id) {
      context.commit('lockUi');
      try {
        const response = await axios.request({
          method: 'delete',
          url: `${API_BASE_URL}/api/baskets/products`,
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
          data: {
            basketItemId: id,
          },
        });
        context.commit('updateCartProductsData', response.data.items, id);
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
      context.commit('syncCartProducts');
      context.commit('unlockUi');
    },
    async order(context, {
      name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
    }) {
      context.commit('resetErrors');
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
            userAccessKey: context.rootState.userAccessKey,
          },
        });
        context.commit('resetCart');
        context.commit('updateOrderInfo', response.data);
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
    },
    async loadOrderInfo(context, orderId) {
      context.commit('lockUi');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.rootState.userAccessKey,
          },
        });
        context.commit('updateOrderInfo', response.data);
      } catch (error) {
        context.commit('updateError', error.response.data.error);
        throw error;
      }
      context.commit('unlockUi');
    },
  },
};
