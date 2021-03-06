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
        <span class="content__info">
          Кол-во товаров на странице
        </span>
        <label class="form__label form__label--small form__label--select">
            <select class="form__select" type="text"
                    name="category" v-model.number="productsPerPage">
              <option :value="item" v-for="item in productsPerPageList" :key="item">
                {{ item }}</option>
            </select>
          </label>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter :current-filters.sync="customFilters"/>

      <section class="catalog">
        <Loader v-if="isUiLocked"/>
        <div v-if="productsLoadingFailed">{{ this.error.message }}
          <button @click.prevent="loadProductsData">Попробовать еще раз</button>
        </div>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import ProductFilter from '@/components/product/ProductFilter.vue';
import Loader from '@/components/common/Loader.vue';
import perPage from '@/data/perPage';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    Loader,
  },
  data() {
    return {
      customFilters: {
        filterCategoryId: 0,
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterMaterialIds: [],
        filterSeasonIds: [],
        filterColorIds: [],
      },
      page: 1,
      productsLoadingFailed: false,
      productsPerPage: 9,
    };
  },
  methods: {
    ...mapActions(['loadProducts']),
    async loadProductsData() {
      this.productsLoadingFailed = false;
      try {
        await this.loadProducts({
          categoryId: this.customFilters.filterCategoryId,
          materialIds: this.customFilters.filterMaterialIds,
          seasonIds: this.customFilters.filterSeasonIds,
          colorIds: this.customFilters.filterColorIds,
          page: this.page,
          limit: this.productsPerPage,
          minPrice: this.customFilters.filterPriceFrom,
          maxPrice: this.customFilters.filterPriceTo,
        });
      } catch (e) {
        this.productsLoadingFailed = true;
      }
    },
  },
  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
    ...mapGetters({
      productsData: 'productsData',
      isUiLocked: 'isUiLocked',
    }),
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    countProducts() {
      return this.productsData.pagination ? this.productsData.pagination.total : 0;
    },
    productsPerPageList() {
      return perPage;
    },
  },
  watch: {
    page: 'loadProductsData',
    productsPerPage: 'loadProductsData',
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
