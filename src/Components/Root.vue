<template>
  <TabPanel :selectedIndex="index">
    <Tab title="First Tab">Content 1</Tab>
    <Tab title="Second Tab">Content 2</Tab>
    <Tab title="Third Tab">Content 3</Tab>
  </TabPanel>
</template>

<script setup>
import TabPanel from './TabPanel.vue'
import Tab from './Tab.vue'
import { ref } from 'vue'

if (!localStorage['TabIndex']) localStorage['TabIndex'] = 0
const index = ref(Number(localStorage['TabIndex']))
</script>