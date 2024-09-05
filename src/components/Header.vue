<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar"

const sidebarStore = useSidebarStore()
</script>

<template>
  <header class="header">
    <span class="header-title">SAMIR LOAN</span>
    <button @click="sidebarStore.toggleSidebar" class="toggle-button">
      <img class="icon" src="@/assets/icon/menu.svg" />
    </button>
  </header>
</template>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header .header-title {
  font-size: 18px;
  font-weight: bold;
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

@media (min-width: 1024px) {
  .header {
    display: none;
  }
}
</style>
