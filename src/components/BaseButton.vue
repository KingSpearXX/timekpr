<template>
  <button class="base-button" :type="button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  button: {
    type: String,
    default: 'button',
  },
});
defineEmits(['click']);
</script>

<style>
.base-button {
  background-color: #01a7c2;
  color: #fff;
  cursor: pointer;
}
</style>
