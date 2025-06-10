import { Expense, CreateExpense } from '../types';

const expenses: Expense[] = [];
let nextId = 1;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const expensesService = {
    getExpenses: async (): Promise<Expense[]> => {
        await sleep(500);
        console.log("Fetching all expenses...");
        return [...expenses];
    },

    addExpense: async (expenseData: CreateExpense): Promise<Expense> => {
        await sleep(500);
        console.log("Adding new expense:", expenseData);
        const newExpense: Expense = {
            id: (nextId++).toString(),
            ...expenseData,
        };
        expenses.push(newExpense);
        return newExpense;
    },

    updateExpense: async (id: string, updates: Partial<CreateExpense>): Promise<Expense> => {
        await sleep(500);
        console.log(`Updating expense ${id} with:`, updates);
        const expenseIndex = expenses.findIndex(g => g.id === id);
        if (expenseIndex === -1) {
            throw new Error('Expense not found');
        }
        expenses[expenseIndex] = { ...expenses[expenseIndex], ...updates };
        return expenses[expenseIndex];
    },

    deleteExpense: async (id: string): Promise<{ id: string }> => {
        await sleep(500);
        console.log(`Deleting expense ${id}`);
        const expenseIndex = expenses.findIndex(g => g.id === id);
        if (expenseIndex === -1) {
            throw new Error('Expense not found');
        }
        expenses.splice(expenseIndex, 1);
        return { id };
    },
}; 