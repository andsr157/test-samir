<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  id: string
  title: string
  labels: (string | number)[]
  data: number[]
}>()

const series = ref(props.data)
const options = ref({
  chart: {
    id: props.id,
    height: "100%",
    width: "100%",
    responsive: true,
  },
  labels: props.labels || [],
  title: {
    text: props.title || "Default Title",
    align: "left",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
  },
})
</script>

<template>
  <div class="chart-wrapper">
    <apexchart type="donut" :options="options" :series="series" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
