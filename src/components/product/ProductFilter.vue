<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтр</h2>
    <Loader v-if="isUiLocked"/>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price"
                 v-model.number="filters.currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price"
                 v-model.number="filters.currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="categories">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <OptionList :list="categories" :current-id.sync="filters.currentCategoryId">
            <option value="0">Все категории</option>
          </OptionList>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="colors">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item"  v-for="item in colors" :key="item.id">
            <label class="colors__label">
              <input type="checkbox" class="colors__radio sr-only"
                     :value="item.id" v-model="filters.currentColorIds">
              <span class="colors__value" :style="'background-color: ' + item.code + ';'">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="materials">
        <legend class="form__legend">Материал</legend>
        <CheckList :current-ids.sync="filters.currentMaterialIds" :list="materials"/>
      </fieldset>

      <fieldset class="form__block" v-if="seasons">
        <legend class="form__legend">Коллекция</legend>
        <CheckList :current-ids.sync="filters.currentSeasonIds" :list="seasons"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset"
              v-if="isFilterSet">
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
import isEqual from 'lodash/isEqual';

const INITIAL_FILTERS = {
  currentCategoryId: 0,
  currentPriceFrom: 0,
  currentPriceTo: 0,
  currentMaterialIds: [],
  currentSeasonIds: [],
  currentColorIds: [],
};

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorIds', 'materialIds', 'seasonIds'],
  components: {
    CheckList, OptionList, Loader,
  },
  data() {
    return {
      filters: { ...INITIAL_FILTERS },
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesData',
      colors: 'colorsData',
      materials: 'materialsData',
      seasons: 'seasonsData',
      isUiLocked: 'isUiLocked',
    }),
    isFilterSet() {
      return !isEqual(this.filters, INITIAL_FILTERS);
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.filters.currentPriceFrom);
      this.$emit('update:priceTo', this.filters.currentPriceTo);
      this.$emit('update:categoryId', this.filters.currentCategoryId);
      this.$emit('update:colorIds', this.filters.currentColorIds);
      this.$emit('update:seasonIds', this.filters.currentSeasonIds);
      this.$emit('update:materialIds', this.filters.currentMaterialIds);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorIds', []);
      this.$emit('update:seasonIds', []);
      this.$emit('update:materialIds', []);
      this.filters = { ...INITIAL_FILTERS };
    },
    ...mapActions([
      'loadCategories',
      'loadColors',
      'loadMaterials',
      'loadSeasons',
    ]),
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>
