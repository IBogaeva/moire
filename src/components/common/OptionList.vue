<template>
  <div>
  <select class="form__select" type="text"
          name="category" v-model.number="computedId" >
    <slot/>
    <option :value="item.id" v-for="item in list" :key="item.id">
      {{ item.title }}</option>
  </select>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    currentId: {
      type: Number,
      default: 0,
    },
  },
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
