// stores/sidebar.ts
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        isActive: false,
    }),

    getters: {
        isSidebarActive: (state) => state.isActive,
    },

    actions: {
        toggleSidebar() {
            this.isActive = !this.isActive
        },
        closeSidebar() {
            this.isActive = false
        },
    },
})
