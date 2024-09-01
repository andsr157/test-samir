<script setup lang="ts">
import { ref } from "vue"

interface Props {
  label: string
  total: number | string | null
}
const props = defineProps<Props>()
const hover = ref(false)
</script>

<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="['card-container', { 'card-hover': hover, 'card-default': !hover }]"
  >
    <div class="text-container">
      <h3 :class="{ 'text-white': hover, 'text-gray': !hover }">
        {{ props.label }}
      </h3>
      <h4 :class="{ 'text-white': hover, 'text-gray': !hover }">
        {{ props.total ?? 0 }}
      </h4>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  min-width: 260px;
  align-items: center;
  height: 9rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 0 1.25rem;
  transition: transform 0.5s ease, background-color 0.5s ease;
}

.card-hover {
  background-color: #007bff;
  transform: translateY(-0.75rem);
}

.card-default {
  background-color: #ffffff;
}

.text-container {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
}

.text-container h4 {
  font-size: 20px;
  font-weight: 800;
}

.text-gray {
  color: #4a5568;
}

.text-white {
  color: #ffffff;
}
</style>
