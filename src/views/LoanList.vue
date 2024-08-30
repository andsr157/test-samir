<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { useLoanStore } from "@/stores/loan"
import LoanCard from "@/components/LoanCard.vue"
import FilterCard from "@/components/FilterCard.vue"
import Pagination from "@/components/Pagination.vue"
import LoanSorting from "@/components/LoanSorting.vue"
import { SORTING_LIST, FILTER_LIST } from "@/constants/loan.constants"

const loanStore = useLoanStore()
const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const { paginatedLoans, currentPage, totalPages, isLoading } =
  storeToRefs(loanStore)

// Watch for changes in window width to toggle filter visibility
watch(windowWidth, (newWidth) => {
  showFilter.value = newWidth > 1024
})

const searchQuery = ref("")
const showFilter = ref(windowWidth.value > 1024) // Initialize with correct state based on window width

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const goToPage = (page: number): void => {
  if (page > 0 && page <= totalPages.value) {
    loanStore.setCurrentPage(page)
  }
}

const handleShowFilter = () => {
  showFilter.value = !showFilter.value
}

const onSearch = (isImmediate = false) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  if (isImmediate) {
    loanStore.searchLoans(searchQuery.value)
  } else {
    debounceTimeout = setTimeout(() => {
      loanStore.searchLoans(searchQuery.value)
    }, 400)
  }
}

onMounted(async () => {
  window.addEventListener("resize", updateWindowWidth)
  await loanStore.getLoanData()
})

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth)
})
</script>

<template>
  <div class="loan-list-container">
    <header class="loan-list-header">
      <h1>Available Loans</h1>
    </header>

    <div class="search-sort-container">
      <input
        type="text"
        class="search-bar"
        placeholder="Search loans..."
        v-model="searchQuery"
        @input="onSearch()"
        @keyup.enter="onSearch(true)"
      />
      <LoanSorting
        :sortingOptions="SORTING_LIST"
        :onSortChange="loanStore.sortLoans"
      />
      <button @click="handleShowFilter" class="filter-toggle-btn">
        Filters
      </button>
    </div>

    <div v-if="isLoading" class="loading">Loading...</div>

    <div v-else class="loan-list-wrapper">
      <FilterCard
        v-show="showFilter"
        :filterOptions="FILTER_LIST"
        :onFilterChange="loanStore.filterLoans"
      />

      <div class="loan-list-content">
        <div class="loan-cards">
          <LoanCard
            v-for="loan in paginatedLoans"
            :key="loan.id"
            :loan="loan"
          />
        </div>
      </div>
    </div>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :onPageChange="goToPage"
    />
  </div>
</template>

<style scoped>
.loan-list-container {
  padding: 24px 0px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
  color: #333;
}

.loan-list-header {
  text-align: center;
  margin-bottom: 20px;
}

.loan-list-header h1 {
  font-size: 2.2em;
}

/* Search and Sort Section */
.search-sort-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.search-bar {
  flex: 1 1 auto;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-dropdown {
  flex: 0 1 auto;
  min-width: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-toggle-btn {
  flex: 0 1 auto;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-toggle-btn:hover {
  background-color: #0056b3;
}

/* Loan Cards Section */
.loan-list-wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

.loan-list-content {
  width: 100%;
}

.loan-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  flex-grow: 1;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #007bff;
}

@media (max-width: 1024px) {
  .loan-list-wrapper {
    grid-template-columns: 1fr;
  }

  .filter-toggle-btn {
    visibility: visible;
  }
}

@media (max-width: 768px) {
  .loan-list-container {
    padding: 48px 12px;
  }

  .search-sort-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar,
  .sort-dropdown,
  .filter-toggle-btn {
    width: 100%;
    max-width: none;
    margin-bottom: 10px;
  }

  .loan-cards {
    grid-template-columns: 1fr;
  }
}
</style>
