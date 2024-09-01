import { defineStore } from "pinia";
import type { Loan } from "@/types/loan";

type SortField = 'amount' | 'interestRate' | 'term';

type riskRating = { selected: string[] }

interface FilterCriteria {
    amount?: { min: number | null; max: number | null };
    interestRate?: { min: number | null; max: number | null };
    term?: { min: number | null; max: number | null };
    riskRating?: riskRating | null;
}

const CACHE_EXPIRATION_TIME = 3600 * 1000;

export const useLoanStore = defineStore('loanStore', {
    state: () => ({
        loan: [] as Loan[],
        filteredLoans: [] as Loan[],
        perPage: 6,
        currentPage: 1,
        isLoading: false,
        lastFetch: 0
    }),
    persist: {
        key: 'loanStore',
        storage: localStorage,
        paths: ['loan', 'lastFetch']
    },
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

        totalAmount(): number {
            return this.loan.reduce((acc, curr) => acc + curr.amount, 0);
        },

        totalBorrower(): number {
            return this.loan.reduce((acc, curr) => {
                if (curr.borrower && curr.borrower.id) {
                    acc.add(curr.borrower.id);
                }
                return acc;
            }, new Set()).size;
        },
        mostFrequentInterestRate(): number | null {
            if (!this.loan.length) return null;

            const frequencyMap = new Map<number, number>();
            let mostFrequentRate = null;
            let maxCount = 0;

            for (const loan of this.loan) {
                const rate = loan.interestRate;

                if (rate !== undefined) {
                    const count = (frequencyMap.get(rate) || 0) + 1;
                    frequencyMap.set(rate, count);

                    if (count > maxCount) {
                        maxCount = count;
                        mostFrequentRate = rate;
                    }
                }
            }

            return mostFrequentRate;
        },

        mostFrequentRiskRating(): string | null {
            if (!this.loan.length) return null;

            const frequencyMap = new Map<string, number>();
            let mostFrequentRating = null;
            let maxCount = 0;

            for (const loan of this.loan) {
                const rating = loan.riskRating;

                if (rating) {
                    const count = (frequencyMap.get(rating) || 0) + 1;
                    frequencyMap.set(rating, count);

                    if (count > maxCount) {
                        maxCount = count;
                        mostFrequentRating = rating;
                    }
                }
            }
            return mostFrequentRating;
        },

        //get data set sum amount based on term or riskRating
        getByCategoryData: (state) => (categoryType: 'term' | 'riskRating') => {
            const categoryMap = new Map<string | number, number>();

            // Collect data into the map
            for (const loan of state.filteredLoans) {
                let category: string | number | undefined;

                if (categoryType === 'term') {
                    category = loan.term;
                } else if (categoryType === 'riskRating') {
                    category = loan.riskRating;
                }

                if (category !== undefined && category !== null) {
                    const count = (categoryMap.get(category) || 0) + 1;
                    categoryMap.set(category, count);
                }
            }

            const sortedEntries = Array.from(categoryMap.entries()).sort((a, b) => {
                const [keyA,] = a;
                const [keyB,] = b;

                // sorting numeric
                if (typeof keyA === 'number' && typeof keyB === 'number') {
                    return keyA - keyB;
                }

                // sorting string
                return keyA.toString().localeCompare(keyB.toString());
            });

            const categories = [];
            const data = [];
            for (const [key, value] of sortedEntries) {
                categories.push(key.toString());
                data.push(value);
            }
            return { xaxisCategories: categories, data };
        }
    },
    actions: {
        async getLoanData(forceRefresh = false) {
            const now = Date.now();
            if (!forceRefresh && now - this.lastFetch < CACHE_EXPIRATION_TIME && this.loan.length > 0) {
                return;
            }
            try {
                this.isLoading = true;
                const res = await this.$axios.get('/json/loans.json');
                if (res.status === 200) {
                    this.loan = res.data;
                    this.filteredLoans = [...this.loan];
                    this.lastFetch = now;
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

        sortLoans(sortBy: string) {
            const [field, direction] = sortBy.split(":") as [SortField, 'asc' | 'desc'];
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
                filter?.min === null || filter === null || (Array.isArray(filter) && filter.length === 0)
            );

            if (isAllFiltersNull) {
                this.filteredLoans = [...this.loan];
            } else {
                this.filteredLoans = this.loan.filter(loan => {
                    let isMatch = true;

                    // Amount filter
                    if (filters.amount) {
                        const { min, max } = filters.amount;
                        if (min !== null && loan.amount < min) isMatch = false;
                        if (max !== null && loan.amount > max) isMatch = false;
                    }

                    // Interest Rate filter
                    if (filters.interestRate) {
                        const { min, max } = filters.interestRate;
                        if (min !== null && loan.interestRate < min) isMatch = false;
                        if (max !== null && loan.interestRate > max) isMatch = false;
                    }

                    // Term filter
                    if (filters.term) {
                        const { min, max } = filters.term;
                        if (min !== null && loan.term < min) isMatch = false;
                        if (max !== null && loan.term > max) isMatch = false;
                    }

                    // Risk Rating filter
                    if (filters.riskRating?.selected && filters.riskRating.selected.length > 0) {
                        if (!filters.riskRating.selected.includes(loan.riskRating)) {
                            isMatch = false;
                        }
                    }

                    return isMatch;
                });
            }
        },
        searchLoans(query: string) {
            if (!query) {
                this.filteredLoans = [...this.loan];
            } else {
                this.filteredLoans = this.loan.filter((loan) =>
                    loan.id.toLowerCase().includes(query.toLowerCase()) ||
                    loan.borrower.name.toLowerCase().includes(query.toLowerCase()) ||
                    loan.purpose.toLowerCase().includes(query.toLowerCase())
                );
            }
        }
    }
});
