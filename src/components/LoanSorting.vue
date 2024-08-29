<script setup lang="ts">
import { ref } from "vue"
import type { LoanSort } from "@/types/loan"

const props = defineProps<{
  sortingOptions: LoanSort[]
  onSortChange: (sortBy: string) => void
}>()

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const selectItem = (sortBy: string) => {
  props.onSortChange(sortBy)
  isDropdownVisible.value = false
}
</script>

<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-button">
      <i class="ci:sort-ascending"></i>
      Sort by
    </button>
    <div v-if="isDropdownVisible" class="dropdown-content">
      <div
        v-for="(group, index) in sortingOptions"
        :key="index"
        class="dropdown-group"
      >
        <p class="group-label">{{ group.label }}</p>
        <ul>
          <li
            v-for="(item, idx) in group.items"
            :key="idx"
            @click="selectItem(item.sortBy)"
            class="dropdown-item"
          >
            {{ item.itemText }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-button:focus {
  outline: none;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 200px;
  padding: 10px;
  border-radius: 4px;
}

.dropdown-group {
  margin-bottom: 10px;
}

.group-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.dropdown-item i {
  font-size: 16px;
}
</style>
