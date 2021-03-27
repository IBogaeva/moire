<template>
  <div>
    <div v-if="loading" style="color: white">Загрузка корзины...</div>
    <router-link v-if="!loading" class="header__cart"
                 :to="{name: 'cart'}" aria-label="Корзина с товарами">
      <svg width="19" height="24">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ amount }}
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      loading: 'cartProductsLoading',
      amount: 'cartTotalAmount',
    }),
  },
};
</script>
