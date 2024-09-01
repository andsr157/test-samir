<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useSidebarStore } from "@/stores/sidebar"
import { RouterLink, useRoute } from "vue-router"

const sidebarStore = useSidebarStore()
const route = useRoute()
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const isRouteActive = (path: string) => route.path === path

const updateSidebarState = () => {
  if (window.innerWidth < 768) {
    sidebarStore.isActive = false
    isCollapsed.value = false
  } else {
    sidebarStore.isActive = true
  }
}

onMounted(() => {
  window.addEventListener("resize", updateSidebarState)
  updateSidebarState()
})

onUnmounted(() => {
  window.removeEventListener("resize", updateSidebarState)
})
</script>

<template>
  <aside
    :class="[
      'sidebar',
      {
        'sidebar-active': sidebarStore.isActive,
        'sidebar-collapsed': isCollapsed,
      },
    ]"
  >
    <div class="sidebar-header">
      <span v-if="!isCollapsed" class="sidebar-title">SAMIR LOAN</span>
      <button @click="toggleCollapse" class="collapse-btn">
        <img class="icon" src="@/assets/icon/menu.svg" />
      </button>
    </div>

    <nav>
      <ul>
        <li>
          <RouterLink
            to="/"
            @click="sidebarStore.closeSidebar"
            :class="{ active: isRouteActive('/') }"
          >
            <img class="icon" src="@/assets/icon/home.svg" />
            <span v-if="!isCollapsed">Home</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/loans"
            @click="sidebarStore.closeSidebar"
            :class="{ active: isRouteActive('/loans') }"
          >
            <img class="icon" src="@/assets/icon/loan-list.svg" />
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
  background: linear-gradient(180deg, #007bff, #004bbd);
  color: #fff;
  height: 100vh;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: sticky;
  top: 0;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
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
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar.sidebar-collapsed nav ul li {
  justify-content: center !important;
}

.sidebar nav ul li a {
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.sidebar nav ul li a span {
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
}

.sidebar nav ul li a .icon {
  margin-right: 12px;
}

.sidebar-collapsed nav ul li a .icon {
  margin-right: 0px !important;
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

.sidebar-header .icon,
.sidebar nav ul li a .icon {
  width: 25px;
  height: 25px;
  object-fit: cover;
  color: white;
}

@media (min-width: 768px) {
  .sidebar {
    display: flex;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    height: calc(100vh - 50px);
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .sidebar-active {
    transform: translateX(0);
  }

  .sidebar-header {
    display: none;
  }
}
</style>
