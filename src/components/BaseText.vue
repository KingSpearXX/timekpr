<template>
  <div class="base-text">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :id="id"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const input = ref(null);

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

defineEmits({
  'update:modelValue': function (val) {
    return typeof val === 'string' || typeof val === 'number';
  },
});

const attrs = computed(() => {
  var _attrs = {...$attrs};
  return _attrs;
});
</script>

<style>
.base-text input {
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  margin: 1em 0;
  font-size: 1em;
  color: #11aaff;
}
</style>
