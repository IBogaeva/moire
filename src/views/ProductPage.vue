<template>
  <main class="content container" v-if="productLoading">Загрузка товара...</main>
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
            {{ category.title }}
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
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg"
                   srcset="img/product-square-2@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg"
                   srcset="img/product-square-3@2x.jpg 2x" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">
          Смартфон Xiaomi Mi Mix 3 6/128GB
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
                18 990 ₽
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
                  <select class="form__select" type="text" name="category">
                    <option value="value1">37-39</option>
                    <option value="value2">40-42</option>
                    <option value="value3">42-50</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import ColorList from '@/components/common/ColorList.vue';

export default {
  components: {
    ColorList,
  },
  data() {
    return {
      productAmount: 1,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      currentColorId: 0,
    };
  },
  computed: {
    ...mapGetters({
      product: 'productData',
      category: 'categoryData',
      colorsData: 'productColorsData',
    }),
    colors() {
      return this.colorsData.map((item) => ({
        ...item.color,
      }));
    },
    image() {
      /* const { gallery } = this.colorsData
        .find((item) => item.color.id === this.currentColorId);
      if (gallery) {
        return gallery[0].file.url;
      } */
      return undefined;
    },
  },
  methods: {
    loadProductData() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        this.$store.dispatch('loadProduct', this.$route.params.id)
          .catch(() => {
            this.productLoadingFailed = true;
          })
          .then(() => {
            this.productLoading = false;
            this.currentColorId = this.colorsData ? this.colorsData[0].color.id : 0;
          });
      }, 0);
    },
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
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
