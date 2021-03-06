<template>
  <main class="content container" v-if="isUiLocked">
    <Loader v-if="isUiLocked"/>
  </main>
  <main v-else-if="!product">
  Не удалось загрузить товар
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="image"
               :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="item in images" :key="item.id">
            <router-link class="pics__link"
                         :to="{name: 'product', params: {id: product.id}}">
              <img width="98" height="98" :src="item.file.url"
                   :alt="product.title">
            </router-link>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <AmountChange :current-amount.sync="productAmount" class="form__counter" />
              <b class="item__price">
                {{ product.price  | numberFormat}} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ColorList :colors="colors" :current-color-id.sync="currentColorId"
                           class="colors colors--black"/>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <OptionList :list="product.sizes" :current-id.sync="currentSizeId"/>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery"
                    type="submit" :disabled="productAddSending">
              В корзину
            </button>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляем товар в корзину...</div>
            <div v-show="formErrorMessage">{{ formErrorMessage }}</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <router-link class="tabs__link tabs__link--current"
                         :to="{name: 'product', params: {id: product.id}}">
              Информация о товаре
            </router-link>
          </li>
          <li class="tabs__item">
            <router-link class="tabs__link"
                         :to="{name: 'product', params: {id: product.id}}">
              Доставка и возврат
            </router-link>
          </li>
        </ul>

        <div class="item__content">
            {{ product.content }}
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import ColorList from '@/components/common/ColorList.vue';
import numberFormat from '@/helpers/numberFormat';
import AmountChange from '@/components/common/AmountChange.vue';
import Loader from '@/components/common/Loader.vue';
import OptionList from '@/components/common/OptionList.vue';

export default {
  filters: {
    numberFormat,
  },
  components: {
    ColorList, AmountChange, Loader, OptionList,
  },
  data() {
    return {
      productAmount: 1,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      currentColorId: 0,
      currentSizeId: 0,
      formErrorMessage: null,
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
    ...mapGetters({
      product: 'productData',
      colorId: 'colorIdData',
      sizeId: 'sizeIdData',
      isUiLocked: 'isUiLocked',
    }),
    colors() {
      return this.product.colors.map((item) => ({
        ...item.color,
      }));
    },
    images() {
      if (this.product.colors) {
        const color = this.product.colors
          .find((item) => item.color.id === this.currentColorId);
        if (color && color.gallery) {
          return color.gallery.filter((it) => it.file.url !== this.image);
        }
      }
      return [];
    },
    image() {
      if (this.product.colors) {
        const color = this.product.colors
          .find((item) => item.color.id === this.currentColorId);
        if (color && color.gallery) {
          return color.gallery[0].file.url;
        }
      }
      return undefined;
    },
  },
  methods: {
    ...mapActions(['addProductToCart', 'loadProduct']),
    async loadProductData() {
      this.productLoadingFailed = false;
      try {
        await this.loadProduct(this.$route.params.id);
      } catch (e) {
        if (this.error.code === 404 || this.error.code === 400) {
          this.$router.replace({ name: 'notFound', params: { 0: '' } });
        }
        this.productLoadingFailed = true;
      } finally {
        this.currentColorId = this.colorId;
      }
    },
    async addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.formErrorMessage = null;
      try {
        await this.addProductToCart({
          id: this.product.id,
          colorId: this.currentColorId,
          sizeId: this.currentSizeId,
          amount: this.productAmount,
        });
        this.productAdded = true;
        this.productAddSending = false;
      } catch (e) {
        this.productAddSending = false;
        this.formErrorMessage = this.error.request || null;
      }
    },
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
    sizeId(value) {
      this.currentSizeId = value;
    },
    '$route.params.id': {
      handler() {
        this.loadProductData();
      },
      immediate: true,
    },
  },
};
</script>
