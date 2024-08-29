<script setup lang="ts">
import { ref, defineProps, watch } from "vue"
import type { FilterList } from "@/types/loan"

const props = defineProps<{
  filterOptions: FilterList[]
  onFilterChange: (
    filters: Record<string, { min: number | null; max: number | null }>
  ) => void
}>()

const filterOptions = ref(props.filterOptions)

const applyFilters = () => {
  const filters = filterOptions.value.reduce((acc, filter) => {
    acc[filter.id] = {
      min:
        filter.type === "range" && filter.values.min !== undefined
          ? filter.values.min
          : null,
      max:
        filter.type === "range" && filter.values.max !== undefined
          ? filter.values.max
          : null,
    }
    return acc
  }, {} as Record<string, { min: number | null; max: number | null }>)
  props.onFilterChange(filters)
}

filterOptions.value.forEach((filter) => {
  watch(
    () => filter.values,
    (newValues) => {
      if (newValues.min === "") filter.values.min = null
      if (newValues.max === "") filter.values.max = null
    },
    { deep: true }
  )
})
</script>

<template>
  <aside class="filter-section">
    <div class="filter-options">
      <div
        v-for="(filter, index) in filterOptions"
        :key="index"
        class="filter-group"
      >
        <label :for="filter.id">{{ filter.label }}:</label>
        <div class="filter-inputs">
          <input
            type="number"
            :id="filter.id + 'Min'"
            v-model.number="filter.values.min"
            :placeholder="'Min ' + filter.label"
          />
          <input
            type="number"
            :id="filter.id + 'Max'"
            v-model.number="filter.values.max"
            :placeholder="'Max ' + filter.label"
          />
        </div>
      </div>
      <button @click="applyFilters" class="apply-filter-btn">
        Apply Filters
      </button>
    </div>
  </aside>
</template>

<style scoped>
.filter-section {
  position: sticky;
  top: 20px;
  display: block;
  width: 100%;
  height: max-content;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
  transition: all 0.3s ease;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-inputs {
  display: flex;
  gap: 10px;
}

.filter-inputs input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.apply-filter-btn {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.apply-filter-btn:hover {
  background-color: #218838;
}
</style>
