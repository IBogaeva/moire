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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>
    <section class="cart">
      <Loader v-if="orderSending || deliveryTypeLoading || paymentTypeLoading"/>
      <form class="cart__form form" action="#" method="POST" @submit.prevent="createOrder">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя"
                          v-model="formData.name" :error="formError.name"/>

            <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес"
                          v-model="formData.address" :error="formError.address"/>

            <BaseFormText title="Телефон" placeholder="Введите ваш телефон"
                          v-model="formData.phone" :error="formError.phone" type="tel"/>

            <BaseFormText title="Email" placeholder="Введи ваш Email"
                          v-model="formData.email" :error="formError.email" type="email"/>

            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment"
                              placeholder="Ваши пожелания"
                              v-model="formData.comment"/>
          </div>
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <RadioList :list="deliveryTypes" :current-id.sync="currentDeliveryTypeId"
                       name='delivery'/>

            <h3 class="cart__title">Оплата</h3>
            <RadioList :list="payments" :current-id.sync="currentPaymentTypeId" name='payment'/>
          </div>
        </div>
        <OrderSummary :data="total" :delivery-type="currentDeliveryType">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </OrderSummary>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>

  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters, mapActions, mapState } from 'vuex';
import Loader from '@/components/common/Loader.vue';
import BaseFormText from '@/components/common/BaseFormText.vue';
import BaseFormTextarea from '@/components/common/BaseFormTextarea.vue';
import RadioList from '@/components/common/RadioList.vue';
import OrderSummary from '@/components/order/OrderSummary.vue';

export default {
  filters: {
    numberFormat,
  },
  components: {
    RadioList,
    BaseFormText,
    BaseFormTextarea,
    Loader,
    OrderSummary,
  },
  data() {
    return {
      currentDeliveryTypeId: 0,
      currentPaymentTypeId: 0,
      formData: {
        name: '',
        address: '',
        phone: '',
        email: '',
        comment: '',
      },
      orderSending: false,
      deliveryTypeLoading: false,
      paymentTypeLoading: false,
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapState({
      orderInfo: (state) => state.cart.orderInfo,
      error: (state) => state.error,
      loading: (state) => state.cart.cartProductsLoading,
    }),
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
      deliveryTypes: 'deliveriesData',
      payments: 'paymentsData',
    }),
    total() {
      return {
        items: this.products,
        totalPrice: this.currentTotalPrice,
        totalAmount: this.totalAmount,
        deliveryType: this.currentDeliveryType,
      };
    },
    currentDeliveryType() {
      return this.deliveryTypes
        ? this.deliveryTypes.find((item) => item.id === this.currentDeliveryTypeId)
        : undefined;
    },
    currentTotalPrice() {
      return this.currentDeliveryType
        ? Number(this.totalPrice) + Number(this.currentDeliveryType.price)
        : 0;
    },
  },
  methods: {
    ...mapActions(['loadDeliveries', 'loadPayments', 'order']),
    loadDeliveryTypes() {
      this.deliveryTypeLoading = true;
      this.loadDeliveries()
        .then(() => {
          this.currentDeliveryTypeId = this.deliveryTypes[0].id;
          this.deliveryTypeLoading = false;
        });
    },
    loadPaymentTypes(deliveryTypeId) {
      this.paymentTypeLoading = true;
      this.loadPayments(deliveryTypeId)
        .then(() => {
          this.currentPaymentTypeId = this.payments[0].id;
          this.paymentTypeLoading = false;
        });
    },
    createOrder() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderSending = true;
      clearTimeout(this.orderSendingTimer);
      this.orderSendingTimer = setTimeout(() => {
        this.order({
          name: this.formData.name,
          address: this.formData.address,
          phone: this.formData.phone,
          email: this.formData.email,
          deliveryTypeId: this.currentDeliveryTypeId,
          paymentTypeId: this.currentPaymentTypeId,
          comment: this.formData.comment,
        })
          .then(() => {
            this.$router.push({ name: 'orderInfo', params: { id: this.orderInfo.id } });
          })
          .catch(() => {
            this.formError = this.error.request || {};
            this.formErrorMessage = this.error.message;
          })
          .then(() => {
            this.orderSending = false;
          });
      }, 0);
    },
  },
  created() {
    this.loadDeliveryTypes();
  },
  watch: {
    currentDeliveryTypeId(value) {
      this.currentDeliveryTypeId = value;
      this.loadPaymentTypes(value);
    },
    currentPaymentId(value) {
      this.currentPaymentTypeId = value;
    },
  },
};
</script>
