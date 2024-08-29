import { defineStore } from "pinia";
import type { Loan } from "@/types/loan";

type SortField = 'amount' | 'interestRate' | 'term';

interface FilterCriteria {
    amount?: { min: number | null; max: number | null };
    interestRate?: { min: number | null; max: number | null };
    term?: { min: number | null; max: number | null };
}

export const useLoanStore = defineStore('loanStore', {
    state: () => ({
        loan: [] as Loan[],
        filteredLoans: [] as Loan[],
        perPage: 6,
        currentPage: 1,
        isLoading: false,
    }),
    getters: {
        totalPages(): number {
            return Math.ceil(this.filteredLoans.length / this.perPage);
        },

        paginatedLoans(): Loan[] {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.filteredLoans.slice(start, end);
        },
        getLoanById: (state) => (id: string) => {
            return state.loan.find((loan) => loan.id === id);
        },
    },
    actions: {
        async getLoanData() {
            try {
                this.isLoading = true;
                const res = await this.$axios.get("/json/loans.json");
                if (res.status === 200) {
                    this.loan = res.data;
                    this.filteredLoans = [...this.loan];
                }
                this.isLoading = false;
            } catch (error) {
                console.log(error);
                this.isLoading = false;
            }
        },
        setCurrentPage(page: number) {
            this.currentPage = page;
        },

        sortLoans(sortBY: string) {
            const [field, direction] = sortBY.split(":") as [SortField, 'asc' | 'desc'];
            const isAscending = direction === 'asc';

            const sortOptions: Record<SortField, (a: Loan, b: Loan) => number> = {
                amount: (a: Loan, b: Loan) => isAscending ? a.amount - b.amount : b.amount - a.amount,
                interestRate: (a: Loan, b: Loan) => isAscending ? a.interestRate - b.interestRate : b.interestRate - a.interestRate,
                term: (a: Loan, b: Loan) => isAscending ? a.term - b.term : b.term - a.term,
            };

            if (sortOptions[field]) {
                this.filteredLoans.sort(sortOptions[field]);
            }
        },

        filterLoans(filters: FilterCriteria) {
            const isAllFiltersNull = Object.values(filters).every(filter =>
                filter?.min === null && filter?.max === null
            );

            if (isAllFiltersNull) {
                this.filteredLoans = [...this.loan];
            } else {
                this.filteredLoans = this.loan.filter(loan => {
                    let isMatch = true;

                    if (filters.amount) {
                        const { min, max } = filters.amount;
                        if (min !== null && loan.amount < min) isMatch = false;
                        if (max !== null && loan.amount > max) isMatch = false;
                    }

                    if (filters.interestRate) {
                        const { min, max } = filters.interestRate;
                        if (min !== null && loan.interestRate < min) isMatch = false;
                        if (max !== null && loan.interestRate > max) isMatch = false;
                    }

                    if (filters.term) {
                        const { min, max } = filters.term;
                        if (min !== null && loan.term < min) isMatch = false;
                        if (max !== null && loan.term > max) isMatch = false;
                    }

                    return isMatch;
                });
            }
        }
    }
});
