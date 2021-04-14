<template>
  <div>
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price  | numberFormat}} ₽
            </span>

    <ColorList :colors="colors" :current-color-id.sync="currentColorId"
               class="colors colors--black"/>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ColorList from '@/components/common/ColorList.vue';

export default {
  components: { ColorList },
  filters: {
    numberFormat,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentColorId: this.product.colors ? this.product.colors[0].color.id : 0,
    };
  },
  computed: {
    image() {
      const { gallery } = this.product.colors
        .find((item) => item.color.id === this.currentColorId);
      return gallery ? gallery[0].file.url : undefined;
    },
    colors() {
      return this.product.colors.map((item) => item.color);
    },
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
  },
};
</script>
