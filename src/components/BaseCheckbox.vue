<template>
  <div class="base-checkbox">
    <label :for="id"
      >{{ label }}
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="checkmark"></span>
    </label>
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
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
});

defineEmits({
  'update:modelValue': value => typeof value === 'boolean',
});
</script>

<style>
.base-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.base-checkbox input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #ccc;
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.base-checkbox input:checked ~ .checkmark:after {
  display: block;
}
.base-checkbox:hover input ~ .checkmark {
  background-color: #ccc;
}
.base-checkbox input:checked ~ .checkmark {
  background-color: #11aaff;
}
.base-checkbox .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
