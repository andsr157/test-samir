export interface Loan {
    id: string
    amount: number
    interestRate: number
    term: number
    purpose: string
    riskRating: string
    borrower: {
        id: string
        name: string
        email: string
        creditScore: number
    }
    collateral: {
        type: string
        value: number
    }
    documents: LoanDocument[]
    repaymentSchedule: {
        installments: LoanRepaymentInstallment[]
    }
}

export interface LoanDocument {
    type: string
    url: string
}

export interface LoanRepaymentInstallment {
    dueDate: string
    amountDue: number
}

export interface LoanSort {
    label: string
    items: loanSortitem[]
}

export interface loanSortitem {
    itemText: string
    sortBy: string
}


export interface FilterList {
    id: string,
    label: string,
    type: string,
    values: {
        min?: number | null,
        max?: number | null,
        options?: string[];
        selected?: string | string[] | null;
    }
}