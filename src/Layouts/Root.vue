<template>
  <TabPanel :selectedIndexProperty="storedProperty">
    <Tab title="Календарь">Content 1</Tab>
    <Tab title="График">Content 2</Tab>
  </TabPanel>
</template>

<script setup lang="ts">
import TabPanel from '../Components/TabPanel.vue'
import Tab from '../Components/Tab.vue'
import { StoredProperty } from '../Domain/StoredProperty'
const storedProperty = new StoredProperty('mainSelectedTab', 0)
</script>