<template>
  <TabPanel :selectedIndex="storedProperty">
    <Tab title="First Tab">Content 1</Tab>
    <Tab title="Second Tab">Content 2</Tab>
    <Tab title="Third Tab">Content 3</Tab>
  </TabPanel>
</template>

<script setup lang="ts">
import TabPanel from './TabPanel.vue'
import Tab from './Tab.vue'
import { StoredProperty } from '../Domain/StoredProperty'
const storedProperty = new StoredProperty('mainSelectedTab', 0)
</script>