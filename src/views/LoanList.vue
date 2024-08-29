<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { useLoanStore } from "@/stores/loan"
import LoanCard from "@/components/LoanCard.vue"
import FilterCard from "@/components/FilterCard.vue"
import LoanSorting from "@/components/LoanSorting.vue"
import { SORTING_LIST, FILTER_LIST } from "@/constants/loan.constants"

const loanStore = useLoanStore()
const windowWidth = ref(window.innerWidth)

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const { paginatedLoans, currentPage, totalPages, isLoading } =
  storeToRefs(loanStore)

watch(
  () => loanStore.paginatedLoans,
  (newVal) => {
    console.log("Updated paginatedLoans:", newVal)
  }
)

watch(windowWidth, (newWidth) => {
  console.log("berubah", newWidth)
  showFilter.value = newWidth > 768
  console.log(showFilter.value)
})

const showFilter = ref(true)

const goToPage = (page: number): void => {
  if (page > 0 && page <= totalPages.value) {
    loanStore.setCurrentPage(page)
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
      <input type="text" class="search-bar" placeholder="Search loans..." />
      <LoanSorting
        :sortingOptions="SORTING_LIST"
        :onSortChange="loanStore.sortLoans"
      />
    </div>

    <div v-if="isLoading">Loading...</div>

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

    <div class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <button
        v-for="page in totalPages"
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
  </div>
</template>

<style scoped>
.loan-list-container {
  padding: 48px;
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
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 12px;
}

.search-bar {
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sort-dropdown {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loan-list-wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

.filter-toggle-btn {
  visibility: hidden;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-toggle-btn:hover {
  background-color: #0056b3;
}

/* Loan Cards Section */
.loan-list-content {
  width: 100%;
}

.loan-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  flex-grow: 1;
}

/* Pagination Section */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.page-btn {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.65;
}

.page-btn:hover {
  background-color: #0056b3;
}

.page-btn:hover:disabled {
  background-color: #cccecc;
}

.page-number-btn {
  margin: 0 5px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-number-btn:hover {
  background-color: #e2e6ea;
}

.page-number-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .search-sort-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .loan-list-content {
    flex-direction: column;
  }

  .filter-section {
    display: none;
    width: 100%;
    margin: 0 0 20px 0;
  }

  .filter-section.show-filter {
    display: block;
  }

  .loan-cards {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .loan-cards {
    grid-template-columns: 1fr;
  }

  .search-bar,
  .sort-dropdown,
  .filter-toggle-btn {
    width: 100%;
    max-width: 100%;
  }

  .loan-list-wrapper {
    display: block;
  }
}
</style>
