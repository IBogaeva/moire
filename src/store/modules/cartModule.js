import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

export default {
  state: {
    cartProductsData: [{
      id: Number,
      price: Number,
      quantity: Number,
      color: {
        id: Number,
        color: {
          id: Number,
          title: String,
          code: String,
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
      },
      product: {
        colors: [{
          id: Number,
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
        slug: String,
        title: String,
      },
    }],
    cartProducts: [],
    cartProductsLoading: true,
    orderInfo: null,
    error: null,
  },
  mutations: {
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        id: item.id, productId: item.product.id, amount: item.quantity,
      }));
    },
    updateCartProductsLoading(state, loading) {
      state.cartProductsLoading = loading;
    },
    deleteCartProduct(state, id) {
      state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((it) => it.productId === productId);

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
    updateError(state, error) {
      state.error = error;
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
    cartProductsLoading(state) {
      return state.cartProductsLoading;
    },
    orderInfoId(state) {
      return state.orderInfo.id;
    },
    formError(state) {
      return state.error;
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
    async updateCartProductAmount(context, { id, productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) {
        return;
      }
      await axios.put(`${API_BASE_URL}/api/baskets/products`, {
        basketItemId: id,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.rootState.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    async deleteCartProduct(context, id) {
      await axios.request({
        method: 'delete',
        url: `${API_BASE_URL}/api/baskets/products`,
        params: {
          userAccessKey: context.rootState.userAccessKey,
        },
        data: {
          basketItemId: id,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items, id);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    async order(context, {
      name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
    }) {
      await axios.post(`${API_BASE_URL}/api/orders`, {
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
      })
        .then((response) => {
          context.commit('resetCart');
          context.commit('updateOrderInfo', response.data);
        })
        .catch((error) => {
          context.commit('updateError', error.response.data.error);
        });
    },
  },
};
