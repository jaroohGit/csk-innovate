<template>
  <apexchart
    :type="type"
    :height="height"
    :options="options"
    :series="series"
  />
</template>

<script setup>
import { defineProps } from 'vue';
import apexchart from 'vue3-apexcharts';

defineProps({
  type: {
    type: String,
    required: true
  },
  height: {
    type: [String, Number],
    default: 350
  },
  options: {
    type: Object,
    required: true
  },
  series: {
    type: Array,
    required: true
  }
});
</script>
