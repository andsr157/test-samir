<script setup lang="ts">
import { ref } from "vue"
import { useSidebarStore } from "@/stores/sidebar"
import { RouterLink, useRoute } from "vue-router"

const sidebarStore = useSidebarStore()
const route = useRoute()
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const isRouteActive = (path: string) => route.path === path
</script>

<template>
  <aside
    :class="[
      'sidebar',
      {
        'sidebar-active': sidebarStore.isSidebarActive,
        'sidebar-collapsed': isCollapsed,
      },
    ]"
  >
    <div class="sidebar-header">
      <span v-if="!isCollapsed" class="sidebar-title">SAMIR LOAN</span>
      <button @click="toggleCollapse" class="collapse-btn">☰</button>
    </div>

    <nav>
      <ul>
        <li>
          <RouterLink
            to="/"
            @click="sidebarStore.closeSidebar"
            :class="{ active: isRouteActive('/') }"
          >
            <p class="icon">🏠</p>
            <span v-if="!isCollapsed">Home</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/loans"
            @click="sidebarStore.closeSidebar"
            :class="{ active: isRouteActive('/loans') }"
          >
            <p class="icon">📝</p>
            <span v-if="!isCollapsed">Loan List</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: linear-gradient(180deg, #0062cc, #004bbd);
  color: #fff;
  position: fixed;
  top: 0;
  left: -220px;
  height: 100%;
  transition: left 0.3s, width 0.3s;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

.sidebar-active {
  left: 0;
}
.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #004bbd;
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  padding: 15px 20px;
  display: flex;
  align-items: center;
}

.sidebar nav ul li a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  width: 100%;
}

.sidebar nav ul li a .icon {
  width: 28px;
  height: 28px;
  margin-right: 15px;
}

.sidebar nav ul li a.active,
.sidebar nav ul li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.collapse-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
}

@media (min-width: 768px) {
  .sidebar {
    left: 0;
  }
}
</style>
