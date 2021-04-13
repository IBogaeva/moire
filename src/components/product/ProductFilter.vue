<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтр</h2>
    <Loader v-if="isUiLocked"/>
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price"
                 v-model.number="filters.filterPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price"
                 v-model.number="filters.filterPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="categories">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <OptionList :list="categories" :current-id.sync="filters.filterCategoryId">
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
                     :value="item.id" v-model="filters.filterColorIds">
              <span class="colors__value" :style="'background-color: ' + item.code + ';'">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="materials">
        <legend class="form__legend">Материал</legend>
        <CheckList :current-ids.sync="filters.filterMaterialIds" :list="materials"/>
      </fieldset>

      <fieldset class="form__block" v-if="seasons">
        <legend class="form__legend">Коллекция</legend>
        <CheckList :current-ids.sync="filters.filterSeasonIds" :list="seasons"/>
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
  filterCategoryId: 0,
  filterPriceFrom: 0,
  filterPriceTo: 0,
  filterMaterialIds: [],
  filterSeasonIds: [],
  filterColorIds: [],
};

export default {
  props: ['currentFilters'],
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
      this.$emit('update:currentFilters', this.filters);
    },
    reset() {
      this.$emit('update:currentFilters', { ...INITIAL_FILTERS });
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
