<script setup lang="ts">
import { useLoanStore } from "@/stores/loan"
import SummaryCard from "@/components/SummaryCard.vue"
import ChartBar from "@/components/chart/Bar.vue"
import ChartDonut from "@/components/chart/Donut.vue"
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

const riskRatingData = computed(() => loanStore.getByCategoryData("riskRating"))
const termData = computed(() => loanStore.getByCategoryData("term"))

onMounted(() => {
  loanStore.getLoanData()
})
</script>

<template>
  <div class="home-container">
    <div class="summary-container">
      <SummaryCard
        v-for="(card, index) in cardData"
        :key="index"
        :label="card.label"
        :total="card.total"
      />
    </div>
    <div class="chart-container">
      <div class="chart-item bar-chart">
        <ChartBar
          v-if="termData.labels.length > 0 && termData.data.length > 0"
          id="termChart"
          title="Total Number of Loans by Term (month)"
          :xaxisCategories="termData.labels"
          :data="termData.data"
        />
      </div>
      <div class="chart-item donut-chart">
        <ChartDonut
          v-if="riskRatingData.data.length > 0"
          id="riskRatingChart"
          title="Total Number of Loans by Risk Rating"
          :data="riskRatingData.data"
          :labels="riskRatingData.labels"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 60px;
  justify-content: space-between;
  align-items: stretch;
}

.summary-container > * {
  flex: 1 1 calc(25% - 1rem);
  max-width: calc(25% - 1rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
}

.chart-container {
  display: flex;
  margin-top: 24px;
  gap: 1rem;
}

.chart-item {
  flex: 1;
}

.bar-chart {
  flex: 3;
}

.donut-chart {
  flex: 2;
}

@media (max-width: 1024px) {
  .summary-container > * {
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }

  .chart-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .summary-container > * {
    flex: 1 1 calc(100% - 1rem);
    max-width: calc(100% - 1rem);
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

  .chart-container {
    flex-direction: column;
  }
}
</style>
