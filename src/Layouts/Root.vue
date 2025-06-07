<template>
  
  <div class="header">
    <div class="user-snp">{{ props.workTimeVM?.userSNP }}</div>
    <div class="crm-tooltip" :innerHTML="props.workTimeVM?.shortWorkInfoHTML" /> / 
    <span class="delta-time">{{ props.workTimeVM?.displayTotalDeltaTime }}</span>
  </div>
  <TabPanel id="vue-main" :selectedIndexProperty="storedProperty">
    <Tab title="Календарь">
      <div ref="mainTabelContainer" />
    </Tab>
    <Tab title="График">
      <Chart class="test-chart" :type="mainChartVM?.type ?? 'bar'"
        :data="mainChartVM?.data ?? (() => { return { labels: [], datasets: [{ type: 'bar', label: '', data: [] }] }})"
        :options="mainChartVM?.options ?? undefined" />
    </Tab>
  </TabPanel>
</template>

<script setup lang="ts">
import TabPanel from '../Components/TabPanel.vue'
import Tab from '../Components/Tab.vue'
import { StoredProperty } from '../Domain/StoredProperty'
import Chart from '../Components/Chart.vue'
import { WorkTimeVM } from '../Model/WorkTimeVM'
import { MainChart } from '../Model/DrowChart'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  workTimeVM: { type: WorkTimeVM },
  mainTable: { type: HTMLTableElement },
})


const mainChartVM = ref(props.workTimeVM ? new MainChart(props.workTimeVM.monthInfo) : null)

const mainTabelContainer = ref<HTMLElement | null>(null)
const crmTooltip = ref<HTMLDivElement | null>(null)

const storedProperty = new StoredProperty('mainSelectedTab', 0)


const insert = () => {
  if (mainTabelContainer.value && props.mainTable) {
    mainTabelContainer.value.innerHTML = '' // Очистить, если ранее вставляли
    mainTabelContainer.value.appendChild(props.mainTable)
  }
}

onMounted(() => {
  insert()
})
watch(() => props.mainTable, insert)
</script>

<style scoped>
#vue-main {
  width: 100%;
}

.test-chart {
  height: 400px;
  aspect-ratio: 5/2;
}

.delta-time {
  color: #aaa;
}

.header .crm-tooltip {
  display: inline;
}

.header {
  margin-bottom: 1em;
  font-size: 1.2rem;
}

.user-snp {
  font-weight: 600;
}
</style>