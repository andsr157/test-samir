import type { LoanSort, FilterList } from "@/types/loan"

export const SORTING_LIST: LoanSort[] = [
    {
        label: 'Amount sorting',
        items: [
            {
                itemText: 'Lowest Amount',
                sortBy: 'amount:asc',
            },
            {
                itemText: 'Highest Amount',
                sortBy: 'amount:desc',
            },
        ],
    },
    {
        label: 'Interest Rate Sorting',
        items: [
            {
                itemText: 'Lowest Interest Rate',
                sortBy: 'interestRate:asc',
            },
            {
                itemText: 'Highest Interest Rat',
                sortBy: 'interestRate:desc',
            }
        ],
    },
    {
        label: 'Term Sorting',
        items: [
            {
                itemText: 'Shortest Term',
                sortBy: 'term:asc',
            },
            {
                itemText: 'Longest Term',
                sortBy: 'term:desc',
            }
        ],
    },
]


export const FILTER_LIST: FilterList[] = [
    {
        id: 'amount',
        label: 'Amount',
        type: 'range',
        values: {
            min: null,
            max: null
        }
    },
    {
        id: 'interestRate',
        label: 'Interest Rate',
        type: 'range',
        values: {
            min: null,
            max: null
        }
    },
    {
        id: 'term',
        label: 'Term',
        type: 'range',
        values: {
            min: null,
            max: null
        }
    }
] 