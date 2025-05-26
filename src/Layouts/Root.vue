<template>
  <TabPanel id="vue-main" :selectedIndexProperty="storedProperty">
    <Tab title="Календарь">Content 1</Tab>
    <Tab title="График">
      <Chart class="test-chart" :type="mainChartVM?.type ?? 'bar'"
        :data="mainChartVM?.data ?? { labels: [], datasets: [{ type: 'bar', label: '', data: [] }] }"
        :options="mainChartVM?.options ?? undefined" />
    </Tab>
  </TabPanel>
</template>

<script setup lang="ts">
import TabPanel from '../Components/TabPanel.vue'
import Tab from '../Components/Tab.vue'
import { StoredProperty } from '../Domain/StoredProperty'
import Chart from '../Components/Chart.vue'
import { MonthInfo } from '../Model/MonthInfo'
import { MainChart } from '../View/DrowChart'
import { ref } from 'vue'

const props = defineProps({
  monthInfo: { type: MonthInfo }
})


const mainChartVM = ref(props.monthInfo ? new MainChart(props.monthInfo.days) : null)


const storedProperty = new StoredProperty('mainSelectedTab', 0)
</script>

<style scoped>
#vue-main {
  width: 100%;
}

.test-chart {
  height: 400px;
  aspect-ratio: 5/2;
}
</style>