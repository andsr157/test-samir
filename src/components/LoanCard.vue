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
    <div class="loan-info">
      <p><strong>Amount:</strong> ${{ loan.amount }}</p>
      <p><strong>Interest Rate:</strong> {{ loan.interestRate }}%</p>
      <p><strong>Term:</strong> {{ loan.term }} months</p>
      <p><strong>Risk Rating:</strong> {{ loan.riskRating }}</p>
    </div>
    <button class="details-btn" @click="goToDetails">View Details</button>
  </div>
</template>

<style scoped>
.loan-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
}

.loan-card:hover {
  transform: translateY(-5px);
}

.loan-info {
  margin-bottom: 15px;
}

.loan-info h3 {
  margin-top: 0;
  color: #007bff;
  font-size: 1.5em;
}

.loan-info p {
  margin: 5px 0;
  font-size: 0.95em;
}

.details-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.details-btn:hover {
  background-color: #218838;
}
</style>
