<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} товаров
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <aside class="filter">
        <form class="filter__form form" action="#" method="get">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" value="0">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" value="12345">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category">
                <option value="value1">Все категории</option>
                <option value="value2">Футболки</option>
                <option value="value3">Бюстгалтеры</option>
                <option value="value4">Носки</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Материал</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="material" value="лен">
                  <span class="check-list__desc">
                    лен
                    <span>(3)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="material" value="хлопок">
                  <span class="check-list__desc">
                    хлопок
                    <span>(46)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="material" value="шерсть">
                  <span class="check-list__desc">
                    шерсть
                    <span>(20)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="material" value="шелк">
                  <span class="check-list__desc">
                    шелк
                    <span>(30)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Коллекция</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="collection" value="лето" checked="">
                  <span class="check-list__desc">
                    лето
                    <span>(2)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="collection" value="зима">
                  <span class="check-list__desc">
                    зима
                    <span>(53)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="collection" value="весна">
                  <span class="check-list__desc">
                    весна
                    <span>(24)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                         type="checkbox" name="collection" value="осень">
                  <span class="check-list__desc">
                    осень
                    <span>(30)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button">
            Сбросить
          </button>
        </form>
      </aside>

      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ProductList, BasePagination,
  },
  data() {
    return {
      productsPerPage: 12,
      page: 1,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    loadProductsData() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        this.$store.dispatch('loadProducts', {
          page: this.page,
          limit: this.productsPerPage,
        })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 1000);
    },
  },
  computed: {
    ...mapGetters({
      productsData: 'productsData',
    }),
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    countProducts() {
      return this.productsData.pagination ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page: 'loadProductsData',
    customFilters: {
      handler() {
        this.loadProductsData();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
