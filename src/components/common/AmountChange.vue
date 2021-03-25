<template>
  <div>
    <button type="button" aria-label="Убрать один товар"
            @click.prevent="computedAmount > 1 ? computedAmount-- : computedAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="computedAmount">

    <button type="button" aria-label="Добавить один товар"
            @click.prevent="computedAmount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['currentAmount'],
  computed: {
    computedAmount: {
      get() {
        return this.currentAmount;
      },
      set(value) {
        this.$emit('update:currentAmount', value);
      },
    },
  },
};
</script>
