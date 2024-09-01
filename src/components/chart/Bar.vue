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
    id: props.id || "default-id",
    type: "bar",
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
      formatter: (val: number) => val.toString(),
    },
  },
  title: {
    text: props.title || "Default Title",
    align: "center",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
  },
  responsive: [
    {
      breakpoint: 1000,
      options: {
        chart: {
          height: 400,
        },
      },
    },
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 300,
        },
      },
    },
  ],
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
}
</style>
