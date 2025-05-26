<template>
  <div class="tab-panel">
    <div class="tab-headers">
      <button v-for="(tab, index) in tabs" :key="index" :selected="selectedIndex === index" @click="select(index)">
        {{ tab.title }}
      </button>
    </div>

    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tab from './Tab.vue'
import { ref, watch, provide, PropType } from 'vue'
import { IDependencyProperty } from '../Domain/DependencyProperty'

const props = defineProps({
  selectedIndex: { type: Object as PropType<IDependencyProperty<number>>, default: undefined },
})


// 👉 регистрация emit
const emit = defineEmits([
  'update:selectedIndexProperty'
])

const tabs = ref(Array<any>())
const selectedIndexProperty = ref(props.selectedIndex)

watch(() => props.selectedIndex, (newVal) => {
  if (newVal === undefined) return;
  selectedIndexProperty.value = newVal
})

function select(index: number) {
  if (selectedIndexProperty.value)
    selectedIndexProperty.value.value = index

  emit('update:selectedIndexProperty', index)
}

function registerTab(tab: any) {
  tabs.value.push(tab)
  return tabs.value.length
}


provide('registerTab', registerTab)
provide('selectedIndexProperty', selectedIndexProperty)
</script>


<style scoped>
.tab-panel {
  margin-top: 1em;
}

.tab-content {
  border-top: 1px solid #ddd;
}

.tab-headers {
  display: flex;
  flex-direction: row;
}

.tab-headers>button {
  margin-bottom: -1px;
  margin-right: -1px;
  display: block;
  border-style: solid;
  border-width: 1px;
  border-color: #ddd;
  border-bottom: 1px solid none;
  background: none;
  padding: 0.5em 1em;
}

.tab-headers>button[selected='true'] {
  border-bottom: 1px solid #fff;
}
</style>