<script setup lang="ts">
import { ref } from "vue"
import type { FilterList } from "@/types/loan"

const props = defineProps<{
  filterOptions: FilterList[]
  onFilterChange: (
    filters: Record<
      string,
      { min: number | null; max: number | null } | { selected: string[] }
    >
  ) => void
}>()

const emit = defineEmits()

const filterOptions = ref(props.filterOptions)

const applyFilters = () => {
  const filters = filterOptions.value.reduce((acc, filter) => {
    if (filter.type === "range") {
      acc[filter.id] = {
        min: filter.values.min ?? null,
        max: filter.values.max ?? null,
      }
    } else if (filter.type === "multiple") {
      const selectedValues = filter.values.selected ?? []

      acc[filter.id] = {
        selected: selectedValues,
      }
    }
    return acc
  }, {} as Record<string, { min: number | null; max: number | null } | { selected: string[] }>)
  props.onFilterChange(filters)

  if (window.innerWidth <= 1024) emit("hideFilter")
}

//handle when input is empty
const handleEmptyInput = (filter: any, type: "min" | "max") => {
  if (filter.values[type] === "") {
    filter.values[type] = null
  }
}

// Handle selection changes for multiple-choice filters
const handleMultipleSelection = (filterId: string, option: string) => {
  const filter = filterOptions.value.find((f) => f.id === filterId)
  if (
    !filter ||
    filter.type !== "multiple" ||
    !Array.isArray(filter.values.selected)
  )
    return

  const selectedValues = [...filter.values.selected]
  const isSelected = selectedValues.includes(option)

  if (isSelected) {
    filter.values.selected = selectedValues.filter((item) => item !== option)
  } else {
    filter.values.selected = [...selectedValues, option]
  }
}
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
        <div
          class="filter-inputs"
          :class="{ 'horizontal-checkbox-group': filter.type === 'multiple' }"
        >
          <input
            v-if="filter.type === 'range'"
            type="number"
            :id="filter.id + 'Min'"
            v-model.number="filter.values.min"
            @input="handleEmptyInput(filter, 'min')"
            :placeholder="'Min ' + filter.label"
          />
          <input
            v-if="filter.type === 'range'"
            type="number"
            :id="filter.id + 'Max'"
            v-model.number="filter.values.max"
            @input="handleEmptyInput(filter, 'max')"
            :placeholder="'Max ' + filter.label"
          />
          <div v-if="filter.type === 'multiple'" class="checkbox-group">
            <label
              v-for="option in filter.values.options"
              :key="option"
              class="checkbox-label"
            >
              <input
                type="checkbox"
                :value="option"
                :checked="filter.values.selected?.includes(option) ?? false"
                @change="handleMultipleSelection(filter.id, option)"
              />
              {{ option }}
            </label>
          </div>
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

.horizontal-checkbox-group {
  display: flex;
  gap: 10px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.apply-filter-btn {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.apply-filter-btn:hover {
  background-color: #0056b3;
}
</style>
