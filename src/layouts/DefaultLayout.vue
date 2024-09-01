<script setup lang="ts">
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"
import { useSidebarStore } from "@/stores/sidebar"

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="layout">
    <Header class="header" />
    <div class="main-container">
      <Sidebar />
      <div class="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 12px 24px;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
}
</style>
