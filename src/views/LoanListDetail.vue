<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { useLoanStore } from "@/stores/loan"
import { onMounted, computed } from "vue"

const route = useRoute()
const router = useRouter()

const loanStore = useLoanStore()

const loanId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : (route.params.id as string)

const loan = computed(() => loanStore.getLoanById(loanId))

const goBack = () => {
  router.push("/loans")
}

onMounted(() => {
  if (!loanStore.loan.length) {
    loanStore.getLoanData()
  }
})
</script>

<template>
  <div class="loan-details-container" v-if="loan">
    <header class="loan-details-header">
      <h1>Loan Details</h1>
      <button class="back-btn" @click="goBack">Back to Loan List</button>
    </header>

    <section class="loan-info-section">
      <h2>Loan Information</h2>
      <div class="loan-info">
        <p><strong>Purpose:</strong> {{ loan.purpose }}</p>
        <p><strong>Amount:</strong> ${{ loan.amount }}</p>
        <p><strong>Interest Rate:</strong> {{ loan.interestRate }}%</p>
        <p><strong>Term:</strong> {{ loan.term }} months</p>
        <p><strong>Risk Rating:</strong> {{ loan.riskRating }}</p>
      </div>
    </section>

    <section class="borrower-info-section">
      <h2>Borrower Information</h2>
      <div class="borrower-info">
        <p><strong>Name:</strong> {{ loan.borrower.name }}</p>
        <p><strong>Email:</strong> {{ loan.borrower.email }}</p>
        <p><strong>Credit Score:</strong> {{ loan.borrower.creditScore }}</p>
      </div>
    </section>

    <section class="collateral-info-section" v-if="loan.collateral">
      <h2>Collateral Information</h2>
      <div class="collateral-info">
        <p><strong>Type:</strong> {{ loan.collateral.type }}</p>
        <p><strong>Value:</strong> ${{ loan.collateral.value }}</p>
      </div>
    </section>

    <section class="repayment-schedule-section">
      <h2>Repayment Schedule</h2>
      <table class="repayment-table">
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Amount Due</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="schedule in loan.repaymentSchedule.installments"
            :key="schedule.dueDate"
          >
            <td>{{ schedule.dueDate }}</td>
            <td>${{ schedule.amountDue }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loan-details-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: #333;
}

.loan-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.loan-details-header h1 {
  font-size: 2em;
  margin: 0;
}

.back-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #0056b3;
}

.loan-info-section,
.borrower-info-section,
.collateral-info-section,
.repayment-schedule-section {
  margin-bottom: 30px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loan-info-section h2,
.borrower-info-section h2,
.collateral-info-section h2,
.repayment-schedule-section h2 {
  margin-bottom: 15px;
  color: #007bff;
}

.loan-info p,
.borrower-info p,
.collateral-info p {
  margin: 5px 0;
  font-size: 1em;
}

.repayment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.repayment-table th,
.repayment-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.repayment-table th {
  background-color: #f1f1f1;
}

@media (max-width: 768px) {
  .loan-details-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-btn {
    margin-top: 10px;
  }

  .repayment-table th,
  .repayment-table td {
    padding: 8px;
  }
}
</style>
