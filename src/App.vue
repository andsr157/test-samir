<script setup lang="ts">
import { RouterView, useRoute } from "vue-router"
import { computed } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"

const layouts = {
  DefaultLayout,
}

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout || "DefaultLayout"
  return layouts[layout as keyof typeof layouts]
})
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
