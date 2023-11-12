<template>
  <div class="base-select">
    <select :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
});

defineEmits({
  'update:modelValue': function (val) {
    return typeof val === 'string' || typeof val === 'number';
  },
});
</script>

<style>
.base-select select {
  border: none;
  outline: none;
  margin: 1em 0;
  font-size: 1em;
  color: #01a7c2;
  background-color: transparent;
}
</style>
