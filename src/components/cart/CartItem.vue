<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="image" width="120" height="120"
           :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
                  <i :style="'background-color: ' + color.code + ';'"></i>
                  {{ color.title }}
                </span>
      <span> Размер: {{ item.size.title }} </span>
    </p>
    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

    <AmountChange :current-amount.sync="amount" class="product__counter form__counter"/>

    <b class="product__price">
      {{ item.amount * item.product.price | numberFormat }} ₽
    </b>

    <button class="product__del button-del"
            type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct()">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import AmountChange from '@/components/common/AmountChange.vue';

export default {
  filters: {
    numberFormat,
  },
  props: ['item'],
  components: { AmountChange },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          id: this.item.id,
          productId: this.item.productId,
          amount: value,
        });
      },
    },
    color() {
      return this.item.color ? this.item.color : undefined;
    },
    image() {
      return this.item.color ? this.item.image.file.url : undefined;
    },
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),
    deleteProduct() {
      this.deleteCartProduct(this.item.id);
    },
  },
};
</script>
