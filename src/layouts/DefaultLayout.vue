<script setup lang="ts">
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"
</script>

<template>
  <div class="layout">
    <Header />
    <Sidebar />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s;
}

@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }

  .main-content {
    margin-left: 170px;
    margin-right: 20px;
  }

  .layout .sidebar-collapsed ~ .main-content {
    margin-left: 80px;
  }
}
</style>
