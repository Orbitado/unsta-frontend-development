export interface Expense {
    id: string;
    date: Date;
    category: string;
    description: string;
    amount: number;
}

export type CreateExpense = Omit<Expense, 'id'>; 