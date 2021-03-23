<template>
  <ul class="check-list">
    <li class="check-list__item" v-for="item in list" :key="item.id">
      <label class="check-list__label">
        <input class="check-list__check sr-only"
               type="checkbox" name="collection" :value="item.id" v-model="computedIds">
        <span class="check-list__desc">
                    {{ item.title }}
              <span>({{ item.productsCount }})</span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    currentIds: Array,
  },
  computed: {
    computedIds: {
      get() {
        return this.currentIds;
      },
      set(ids) {
        this.$emit('update:currentIds', ids);
      },
    },
  },
};
</script>
