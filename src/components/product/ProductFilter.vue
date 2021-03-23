<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтр</h2>
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

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category"
                  v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
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

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <CheckList :current-ids.sync="currentMaterialIds" :list="materials"/>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <CheckList :current-ids.sync="currentSeasonIds" :list="seasons"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CheckList from '@/components/common/CheckList.vue';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorIds', 'materialIds', 'seasonIds'],
  components: {
    CheckList,
  },
  data() {
    return {
      currentCategoryId: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentMaterialIds: [],
      currentSeasonIds: [],
      currentColorIds: [],
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categoriesData',
      colors: 'colorsData',
      materials: 'materialsData',
      seasons: 'seasonsData',
    }),
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
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
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
  },
  created() {
    this.loadCategories();
    this.loadColors();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>
