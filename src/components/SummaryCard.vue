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
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.card-hover {
  background-color: #007bff;
  transform: translateY(-0.5rem);
}

.card-default {
  background-color: #ffffff;
}

.text-container h3 {
  font-size: 1.2rem;
  font-weight: 600;
}

.text-container h4 {
  font-size: 1.5rem;
  font-weight: 800;
}

.text-gray {
  color: #4a5568;
}

.text-white {
  color: #ffffff;
}

@media (max-width: 768px) {
  .card-container {
    padding: 1rem;
  }

  .text-container h4 {
    font-size: 1.25rem;
  }

  .text-container h3 {
    font-size: 1rem;
  }
}
</style>
