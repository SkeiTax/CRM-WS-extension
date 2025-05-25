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

<script setup>
import Tab from './Tab.vue'
import { ref, watch, provide, onMounted } from 'vue'

const props = defineProps({
  selectedIndex: { type: Number, default: 0 }
})

// 👉 регистрация emit
const emit = defineEmits(['update:selectedIndex'])

const tabs = ref([])
const selectedIndex = ref(props.selectedIndex)

watch(() => props.selectedIndex, (newVal) => {
  selectedIndex.value = newVal
})

function select(index) {
  localStorage.setItem('TabIndex', index)
  selectedIndex.value = index
  emit('update:selectedIndex', index)
}


function registerTab(tab) {
  tabs.value.push(tab)
  return tabs.value.length
}


provide('registerTab', registerTab)
provide('selectedIndex', selectedIndex)
</script>


<style scoped>
.tab-panel {
  margin-top: 1em;
}

.tab-content {
  border-top: 1px solid #ddd;
}

.tab-headers{
  display: flex;
  flex-direction: row;
}

.tab-headers > button {
  margin-bottom: -1px;
  margin-right: -1px;
  display: block;
  border-style: solid;
  border-width: 1px;
  border-color: #ddd;
  border-bottom: 1px solid none;
  background: none;
  padding:0.5em 1em;
}
.tab-headers > button[selected='true'] {
  border-bottom: 1px solid #fff;
}
</style>