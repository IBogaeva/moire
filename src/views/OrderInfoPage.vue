<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="orderInfo">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <Loader v-if="isUiLocked"/>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина.
            На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary" v-if="orderInfo">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <OrderSummary :data="total" :delivery-type="deliveryType"  v-if="orderInfo"/>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import OrderSummary from '@/components/order/OrderSummary.vue';
import Loader from '@/components/common/Loader.vue';

export default {
  components: {
    OrderSummary, Loader,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState({
      orderInfo: (state) => state.cart.orderInfo,
      error: (state) => state.error,
    }),
    ...mapGetters({
      isUiLocked: 'isUiLocked',
    }),
    basketItems() {
      return this.orderInfo
        ? this.orderInfo.basket.items.map((item) => ({
          ...item,
          amount: item.quantity,
        }))
        : [];
    },
    totalPrice() {
      return this.orderInfo.totalPrice;
    },
    totalAmount() {
      return this.orderInfo.basket.items
        .reduce((acc, item) => item.quantity + acc, 0);
    },
    deliveryType() {
      return this.orderInfo.deliveryType;
    },
    total() {
      return {
        items: this.basketItems,
        totalPrice: this.totalPrice,
        totalAmount: this.totalAmount,
      };
    },
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
    getOrderInfo(orderId) {
      this.loadOrderInfo(orderId)
        .catch(() => {
          if (this.error.code === 0 || this.error.code === 404 || this.error.code === 400) {
            this.$router.push({ name: 'notFound', params: { 0: '' } });
          }
        });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.orderInfo
          && this.orderInfo.id === this.$route.params.id) {
          return;
        }
        this.getOrderInfo(this.$route.params.id);
      },
      immediate: true,
    },
  },
};
</script>
