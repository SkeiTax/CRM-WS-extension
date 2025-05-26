<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, computed, Ref } from 'vue'
import { IDependencyProperty } from '../Domain/DependencyProperty';

const props = defineProps({
  title: String
})

const registerTab = inject('registerTab') as (tab: any) => number
const selectedIndexProperty = inject('selectedIndexProperty') as Ref<{ value: number } | undefined>
const index = ref(0)

onMounted(() => {
  index.value = registerTab({ title: props.title }) - 1
})

const isActive = computed(() => selectedIndexProperty?.value && selectedIndexProperty?.value.value === index.value)
</script>