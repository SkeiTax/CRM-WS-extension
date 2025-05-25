<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'

const props = defineProps({
  title: String
})

const registerTab = inject('registerTab')
const selectedIndex = inject('selectedIndex')
const index = ref(0)

onMounted(() => {
  index.value = registerTab({ title: props.title }) - 1
})

const isActive = computed(() => selectedIndex.value === index.value)
</script>