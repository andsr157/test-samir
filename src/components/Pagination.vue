<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}>()

const visiblePages = computed(() => {
  const totalVisiblePages = 5
  const half = Math.floor(totalVisiblePages / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, props.currentPage + half)

  if (props.currentPage <= half) {
    end = Math.min(props.totalPages, totalVisiblePages)
  } else if (props.currentPage + half >= props.totalPages) {
    start = Math.max(1, props.totalPages - totalVisiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const goToPage = (page: number): void => {
  if (page > 0 && page <= props.totalPages) {
    props.onPageChange(page)
  }
}
</script>

<template>
  <div class="pagination">
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Previous
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="['page-number-btn', { active: currentPage === page }]"
    >
      {{ page }}
    </button>
    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.page-btn,
.page-number-btn {
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1em;
}

.page-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.65;
}

.page-btn:hover {
  background-color: #0056b3;
}

.page-number-btn {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.page-number-btn:hover {
  background-color: #e2e6ea;
}

.page-number-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

@media (max-width: 768px) {
  .pagination {
    gap: 6px;
  }

  .page-btn,
  .page-number-btn {
    padding: 4px 8px;
    font-size: 0.9em;
  }
}

@media (max-width: 375px) {
  .pagination {
    gap: 4px;
  }

  .page-btn,
  .page-number-btn {
    padding: 4px 6px;
    font-size: 0.8em;
  }
}

@media (max-width: 320px) {
  .pagination {
    gap: 2px;
  }

  .page-btn,
  .page-number-btn {
    padding: 3px 5px;
    font-size: 0.7em;
  }
}
</style>
