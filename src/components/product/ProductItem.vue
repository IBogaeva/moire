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
      colors: [{
        color: {
          code: Number,
          id: Number,
          title: String,
        },
        gallery: [{
          file: {
            extension: String,
            name: String,
            originalName: String,
            size: String,
            url: String,
          },
          id: Number,
        }],
        id: Number,
      }],
      id: Number,
      materials: [{
        code: String,
        id: Number,
        productsCount: Number,
        title: String,
      }],
      price: Number,
      seasons: [{
        code: String,
        id: Number,
        productsCount: Number,
        title: String,
      }],
      slug: String,
      title: String,
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
      if (gallery) {
        return gallery[0].file.url;
      }
      return undefined;
    },
    colors() {
      return this.product.colors.map((item) => ({
        ...item.color,
      }));
    },
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
  },
};
</script>
