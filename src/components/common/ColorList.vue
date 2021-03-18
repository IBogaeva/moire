<template>
  <ul>
    <li class="colors__item"  v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only"
               type="radio" :value="item.id" v-model="computedColorId">
        <span class="colors__value" :style="'background-color: ' + item.code + ';'">
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'currentColorId'],
  computed: {
    computedColorId: {
      get() {
        return this.currentColorId;
      },
      set(id) {
        this.$emit('update:currentColorId', id);
      },
    },
  },
};
</script>
