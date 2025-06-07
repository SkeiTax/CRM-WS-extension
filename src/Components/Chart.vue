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
  data: (_: CanvasRenderingContext2D) => ChartData,
  options?: (_: CanvasRenderingContext2D) => ChartOptions,
  plugins?: Plugin[]
}>()
const canvasRef = ref<HTMLCanvasElement | null>(null)


onMounted(() => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      // Create a config object first, without referencing 'chart'
      const config = {
        type: props.type,
        data: {} as ChartData, // temporary, will be replaced below
        options: {} as ChartOptions, // temporary, will be replaced below
        plugins: props.plugins
      };
      // Create the chart instance
      const chart = new Chart(ctx, config);
      // Now set the data and options using the chart instance
      chart.data = props.data(ctx);
      if (props.options) {
        chart.options = props.options(ctx);
      }
      chart.update();
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
