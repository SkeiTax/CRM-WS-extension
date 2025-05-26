<template>
  <div class="canvas-comp">
    <canvas class="canvas-content" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart, { ChartType } from 'chart.js/auto'

import type { ChartData, ChartOptions, Plugin } from 'chart.js';

const props = defineProps<{
  type: ChartType,
  data: ChartData,
  options?: ChartOptions,
  plugins?: Plugin[]
}>()
const canvasRef = ref<HTMLCanvasElement | null>(null)


onMounted(() => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      new Chart(ctx, {
        type: props.type,
        data: props.data,
        options: props.options,
        plugins: props.plugins
      })
    }
  }
})
</script>

<style scoped>
.canvas-content {
  height: 100%;
  width: 100%;
  aspect-ratio: unset;
}
</style>
