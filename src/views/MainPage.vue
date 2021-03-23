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
      <ProductFilter :price-from.sync="customFilters.filterPriceFrom"
                     :price-to.sync="customFilters.filterPriceTo"
                     :category-id.sync="customFilters.filterCategoryId"
                     :color-ids.sync="customFilters.filterColorIds"
                     :material-ids.sync="customFilters.filterMaterialIds"
                     :season-ids.sync="customFilters.filterSeasonIds"
                     />

      <section class="catalog">
        <Loader v-if="productsLoading"/>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
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
import { mapGetters } from 'vuex';
import ProductFilter from '@/components/product/ProductFilter.vue';
import Loader from '@/components/common/Loader.vue';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, Loader,
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
      productsPerPage: 12,
      page: 1,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    loadProductsData() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        this.$store.dispatch('loadProducts', {
          categoryId: this.customFilters.filterCategoryId,
          materialIds: this.customFilters.filterMaterialIds,
          seasonIds: this.customFilters.filterSeasonIds,
          colorIds: this.customFilters.filterColorIds,
          page: this.page,
          limit: this.productsPerPage,
          minPrice: this.customFilters.filterPriceFrom,
          maxPrice: this.customFilters.filterPriceTo,
        })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
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
