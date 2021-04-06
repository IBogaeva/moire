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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ totalAmount }} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <Loader v-if="loading"/>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.id" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link v-show="products.length > 0" class="cart__button button button--primery"
                       :to="{name: 'order'}" tag="button" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import CartItem from '@/components/cart/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import Loader from '@/components/common/Loader.vue';

export default {
  filters: {
    numberFormat,
  },
  components: { CartItem, Loader },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
      loading: 'cartProductsLoading',
    }),
  },
};
</script>
