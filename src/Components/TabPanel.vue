<template>
  <div class="tab-panel">
    <div class="tab-headers">
      <button v-for="(tab, index) in tabs" :key="index" :selected="selectedIndexProperty.value === index"
        @click="select(index)">
        {{ tab.title }}
      </button>
    </div>

    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, PropType } from 'vue'
import { IDependencyProperty } from '../Domain/DependencyProperty'

const props = defineProps({
  selectedIndexProperty: { type: Object as PropType<IDependencyProperty<number>>, default: undefined },
})


// 👉 регистрация emit
const emit = defineEmits([
  'update:selectedIndexProperty'
])

const tabs = ref(Array<any>())
const selectedIndexProperty = ref(props.selectedIndexProperty)

watch(() => props.selectedIndexProperty, (newVal) => {
  if (newVal === undefined) return;
  selectedIndexProperty.value = newVal
})

function select(index: number) {
  if (selectedIndexProperty.value)
    selectedIndexProperty.value.value = index

  //emit('update:selectedIndexProperty', index)
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
  margin-top: 20px;
}

.tab-content {
  border-top: 1px solid #ddd;
  padding-top: 10px;
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