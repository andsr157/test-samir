<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  id: string
  title: string
  xaxisCategories: (string | number)[]
  data: number[]
}>()

const series = ref([{ name: "Data", data: props.data || [] }])
const options = ref({
  chart: {
    id: props.id,
    height: "100%",
  },
  xaxis: {
    categories: props.xaxisCategories || [],
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: number) => val.toString() + " loan",
    },
  },
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
    <apexchart type="bar" :options="options" :series="series" />
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
