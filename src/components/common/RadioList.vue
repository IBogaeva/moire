<template>
  <ul class="cart__options options">
    <li class="options__item" v-for="item in list" :key="item.id">
      <label class="options__label">
        <input class="options__radio sr-only" type="radio"
               :value="item.id" v-model.number="computedId">
        <span class="options__value">
                    {{ item.title }} <b v-if="item.price">{{ item.price | deliveryFormat}}</b>
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import deliveryFormat from '@/helpers/deliveryFormat';

export default {
  filters: {
    numberFormat, deliveryFormat,
  },
  props: ['list', 'currentId'],
  computed: {
    computedId: {
      get() {
        return this.currentId;
      },
      set(id) {
        this.$emit('update:currentId', id);
      },
    },
  },
};
</script>
