<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useSidebarStore } from "@/stores/sidebar"
import { RouterLink, useRoute } from "vue-router"

const sidebarStore = useSidebarStore()
const route = useRoute()
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  window.dispatchEvent(new Event("resize"))
}

const isRouteActive = (path: string) => route.path === path

const updateSidebarState = () => {
  if (window.innerWidth < 1024) {
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
  transition: width 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: sticky;
  top: 0;
}

.sidebar-collapsed {
  width: 80px;
  transition: width 0.3s ease;
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
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-collapsed nav ul li {
  justify-content: center;
}

.sidebar nav ul li a {
  display: flex;
  padding: 10px 14px;
  border-radius: 10px;
  align-items: center;
  transition: background-color 0.2s ease;
  width: 100%;
}

.sidebar.sidebar-collapsed nav ul li a {
  justify-content: center;
}

.sidebar nav ul li a.active {
  background-color: #004bbd;
}

.sidebar nav ul li a span {
  color: #fff;
  font-size: 17px;
  font-weight: 500;
}

.sidebar nav ul li a .icon {
  margin-right: 12px;
}

.sidebar-collapsed nav ul li a .icon {
  margin-right: 0;
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
}

@media (min-width: 1024px) {
  .sidebar {
    transform: none;
  }
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    height: calc(100vh - 50px);
    z-index: 1000;
    transform: translateX(-100%);
  }

  .sidebar-active {
    transform: translateX(0);
  }

  .sidebar-header {
    display: none;
  }
}
</style>
