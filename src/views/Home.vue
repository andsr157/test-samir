<script setup lang="ts">
import { useLoanStore } from "@/stores/loan"
import SummaryCard from "@/components/SummaryCard.vue"
import ChartBar from "@/components/chart/Bar.vue"
import { computed, onMounted } from "vue"

const loanStore = useLoanStore()

const cardData = computed(() => [
  { label: "Total Amount", total: loanStore.totalAmount },
  { label: "Total Borrowers", total: loanStore.totalBorrower },
  {
    label: "Most Frequent Risk Rating",
    total: loanStore.mostFrequentRiskRating,
  },
  {
    label: "Most Frequent Interest Rate",
    total: loanStore.mostFrequentInterestRate,
  },
])

// const riskRatingData = computed(() => loanStore.getByCategoryData("riskRating"))
const termData = computed(() => loanStore.getByCategoryData("term"))

onMounted(() => {
  loanStore.getLoanData()
})
</script>

<template>
  <div class="home-containerr">
    <div class="summary-container">
      <SummaryCard
        v-for="(card, index) in cardData"
        :key="index"
        :label="card.label"
        :total="card.total"
      />
    </div>
    <div class="chart-container">
      <ChartBar
        v-if="termData.xaxisCategories.length > 0 && termData.data.length > 0"
        id="termChart"
        title="Total Number of Loans by Term (month)"
        :xaxisCategories="termData.xaxisCategories"
        :data="termData.data"
      />
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 60px;
  justify-content: space-around;
}

.summary-container > * {
  flex: 1 1 calc(24% - 1rem);
  max-width: calc(24% - 1rem);
}

.chart-container {
  margin-top: 24px;
  width: 50vw;
}

@media (max-width: 1024px) {
  .summary-container > * {
    flex: 1 1 calc(32% - 1rem);
    max-width: calc(32% - 1rem);
  }
}

@media (max-width: 768px) {
  .summary-container > * {
    flex: 1 1 calc(48% - 1rem);
    max-width: calc(48% - 1rem);
  }

  .chart-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .summary-container > * {
    flex: 1 1 calc(100% - 1rem);
    max-width: calc(100% - 1rem);
  }
}
</style>
