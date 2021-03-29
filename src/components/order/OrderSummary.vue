<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in data.items" :key="item.id" :item="item">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.amount * item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>бесплатно</b></p>
      <p>Итого: <b>3</b> товара на сумму <b>4 070 ₽</b></p>
    </div>
    <slot/>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  filters: {
    numberFormat,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        items: [],
        totalAmount: null,
        totalPrice: null,
      }),
    },
    deliveryType: Object,
    default: () => ({
      id: Number,
      title:
    }),
  },
};
</script>
