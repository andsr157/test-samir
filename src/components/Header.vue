<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar"

const sidebarStore = useSidebarStore()
</script>

<template>
  <header class="header">
    <button @click="sidebarStore.toggleSidebar" class="toggle-button">☰</button>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
}

.toggle-button {
  background: none;
  border: none;
  font-size: 1.5em;
  color: white;
  cursor: pointer;
}

.toggle-button:focus {
  outline: none;
}
</style>
