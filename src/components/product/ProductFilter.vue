<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтр</h2>
    <Loader v-if="filtersLoading"/>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block"
                v-show="!categoriesFilterLoading && !categoriesFilterLoadingFailed">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <OptionList :list="categories" :current-id.sync="currentCategoryId">
            <option value="0">Все категории</option>
          </OptionList>
        </label>
      </fieldset>

      <fieldset class="form__block"
                v-show="!colorsFilterLoading && !colorsFilterLoadingFailed">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item"  v-for="item in colors" :key="item.id">
            <label class="colors__label">
              <input type="checkbox" class="colors__radio sr-only"
                     :value="item.id" v-model="currentColorIds">
              <span class="colors__value" :style="'background-color: ' + item.code + ';'">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block"
                v-show="!materialsFilterLoading && !materialsFilterLoadingFailed">
        <legend class="form__legend">Материал</legend>
        <CheckList :current-ids.sync="currentMaterialIds" :list="materials"/>
      </fieldset>

      <fieldset v-show="!seasonsFilterLoading && !seasonsFilterLoadingFailed" class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <CheckList :current-ids.sync="currentSeasonIds" :list="seasons"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset"
              v-show="isFilterSet">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CheckList from '@/components/common/CheckList.vue';
import OptionList from '@/components/common/OptionList.vue';
import Loader from '@/components/common/Loader.vue';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorIds', 'materialIds', 'seasonIds'],
  components: {
    CheckList, OptionList, Loader,
  },
  data() {
    return {
      currentCategoryId: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentMaterialIds: [],
      currentSeasonIds: [],
      currentColorIds: [],
      seasonsFilterLoading: false,
      categoriesFilterLoading: false,
      colorsFilterLoading: false,
      materialsFilterLoading: false,
      seasonsFilterLoadingFailed: false,
      categoriesFilterLoadingFailed: false,
      colorsFilterLoadingFailed: false,
      materialsFilterLoadingFailed: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesData',
      colors: 'colorsData',
      materials: 'materialsData',
      seasons: 'seasonsData',
    }),
    isFilterSet() {
      return this.currentCategoryId > 0
        || this.currentPriceFrom > 0
        || this.currentPriceTo > 0
        || this.currentMaterialIds.length > 0
        || this.currentSeasonIds.length > 0
        || this.currentColorIds.length > 0;
    },
    filtersLoading() {
      return this.seasonsFilterLoading
        || this.categoriesFilterLoading
        || this.colorsFilterLoading
        || this.materialsFilterLoading;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorIds', this.currentColorIds);
      this.$emit('update:seasonIds', this.currentSeasonIds);
      this.$emit('update:materialIds', this.currentMaterialIds);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorIds', []);
      this.$emit('update:seasonIds', []);
      this.$emit('update:materialIds', []);
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentMaterialIds = [];
      this.currentSeasonIds = [];
      this.currentColorIds = [];
    },
    ...mapActions([
      'loadCategories',
      'loadColors',
      'loadMaterials',
      'loadSeasons',
    ]),
    loadCategoriesData() {
      this.categoriesFilterLoading = true;
      this.categoriesFilterLoadingFailed = false;
      clearTimeout(this.loadCategoriesTimer);
      this.loadCategoriesTimer = setTimeout(() => {
        this.loadCategories()
          .then(() => {
            this.categoriesFilterLoading = false;
          })
          .catch(() => {
            this.categoriesFilterLoading = false;
            this.categoriesFilterLoadingFailed = true;
          });
      }, 10000);
    },
    loadColorsData() {
      this.colorsFilterLoading = true;
      this.colorsFilterLoadingFailed = false;
      clearTimeout(this.loadColorsTimer);
      this.loadColorsTimer = setTimeout(() => {
        this.loadColors()
          .then(() => {
            this.colorsFilterLoading = false;
          }).catch(() => {
            this.colorsFilterLoading = false;
            this.colorsFilterLoadingFailed = true;
          });
      }, 11000);
    },
    loadMaterialsData() {
      this.materialsFilterLoading = true;
      this.materialsFilterLoadingFailed = false;
      clearTimeout(this.loadMaterialsTimer);
      this.loadMaterialsTimer = setTimeout(() => {
        this.loadMaterials()
          .then(() => {
            this.materialsFilterLoading = false;
          }).catch(() => {
            this.materialsFilterLoading = false;
            this.materialsFilterLoadingFailed = true;
          });
      }, 12000);
    },
    loadSeasonsData() {
      this.seasonsFilterLoading = true;
      this.seasonsFilterLoadingFailed = false;
      clearTimeout(this.loadSeasonsTimer);
      this.loadSeasonsTimer = setTimeout(() => {
        this.loadSeasons()
          .then(() => {
            this.seasonsFilterLoading = false;
          }).catch(() => {
            this.seasonsFilterLoading = false;
            this.seasonsFilterLoadingFailed = true;
          });
      }, 13000);
    },
  },
  created() {
    this.loadCategoriesData();
    this.loadColorsData();
    this.loadMaterialsData();
    this.loadSeasonsData();
  },
};
</script>
