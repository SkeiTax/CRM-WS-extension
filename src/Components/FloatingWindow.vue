<template>
  <div
    class="floating-window"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown.self="bringToFront"
  >
    <div class="header" @mousedown="startDrag">
      <span class="title">{{ title }}</span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  title?: string
}>()

const emit = defineEmits(['close'])

const position = ref({ x: 100, y: 100 })
const isDragging = ref(false)
let dragOffset = { x: 0, y: 0 }

function startDrag(event: MouseEvent) {
  isDragging.value = true
  dragOffset = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y,
  }
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(event: MouseEvent) {
  if (!isDragging.value) return
  position.value.x = event.clientX - dragOffset.x
  position.value.y = event.clientY - dragOffset.y
}

function stopDrag() {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

function bringToFront() {
  // можно реализовать через z-index или emit, если таких окон несколько
}
</script>

<style scoped>
.floating-window {
  position: fixed;
  z-index: 10000;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  width: auto;
  user-select: none;
  --fwr: 8px;
}
.floating-window>.header {
  background: #eee;
  padding: 4px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: var(--fwr);
  border-top-right-radius: var(--fwr);
  font-size: 1rem;
}
.floating-window>.header>.title {
  font-size: 1em;
  margin: 0;
  padding-left: 0.5em;
}

.floating-window>.header>.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  aspect-ratio: 1;
  margin: 0;
}
.floating-window>.content {
  padding: 12px;
  margin: 0;
}
</style>
