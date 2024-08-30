<script setup lang="ts">
import { useRouter } from "vue-router"
import type { Loan } from "../types/loan"

const props = defineProps<{
  loan: Loan
}>()
const route = useRouter()

const goToDetails = () => {
  route.push(`/loan/${props.loan.id}`)
}
</script>

<template>
  <div class="loan-card">
    <div class="loan-header">
      <h3>{{ loan.purpose }}</h3>
      <p class="borrower-name">Borrower: {{ loan.borrower.name }}</p>
    </div>
    <div class="loan-info">
      <p><strong>Amount:</strong> ${{ loan.amount.toLocaleString() }}</p>
      <p><strong>Interest Rate:</strong> {{ loan.interestRate }}%</p>
      <p><strong>Term:</strong> {{ loan.term }} months</p>
      <p><strong>Risk Rating:</strong> {{ loan.riskRating }}</p>
    </div>
    <button class="details-btn" @click="goToDetails">View Details</button>
  </div>
</template>

<style scoped>
.loan-card {
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.loan-header {
  margin-bottom: 16px;
}

.loan-header h3 {
  margin: 0;
  font-size: 1.4em;
  color: #343a40;
}

.borrower-name {
  font-size: 1em;
  color: #6c757d;
  margin-top: 4px;
}

.loan-info {
  margin-bottom: 16px;
}

.loan-info p {
  margin: 6px 0;
  font-size: 1em;
  color: #495057;
}

.details-btn {
  align-self: flex-start;
  padding: 10px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.details-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}
</style>
