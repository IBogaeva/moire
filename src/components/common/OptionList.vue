<template>
  <select class="form__select" type="text"
          name="category" v-model.number="computedId">
    <slot/>
    <option :value="item.id" v-for="item in list" :key="item.id">
      {{ item.title }}</option>
  </select>
</template>

<script>
export default {
  props: ['list', 'currentId'],
  computed: {
    computedId: {
      get() {
        return this.currentId;
      },
      set(ids) {
        this.$emit('update:currentId', ids);
      },
    },
  },
};
</script>
