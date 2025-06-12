import { Expense, CreateExpense } from '../types';

const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINTS = {
    expenses: `${API_BASE_URL}/expenses`,
} as const;

const apiRequest = async <T>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const expensesService = {
    /**
     * Fetch all expenses from the JSON Server
     * GET /expenses
     */
    getExpenses: async (): Promise<Expense[]> => {
        console.log("Fetching all expenses from JSON Server...");
        const expenses = await apiRequest<Expense[]>(API_ENDPOINTS.expenses);

        // Convert date strings back to Date objects
        return expenses.map(expense => ({
            ...expense,
            date: new Date(expense.date),
        }));
    },

    /**
     * Add a new expense to the JSON Server
     * POST /expenses
     */
    addExpense: async (expenseData: CreateExpense): Promise<Expense> => {
        console.log("Adding new expense:", expenseData);

        const newExpense = await apiRequest<Expense>(API_ENDPOINTS.expenses, {
            method: 'POST',
            body: JSON.stringify({
                ...expenseData,
                // Convert Date to ISO string for JSON storage
                date: expenseData.date.toISOString(),
            }),
        });

        // Convert date string back to Date object
        return {
            ...newExpense,
            date: new Date(newExpense.date),
        };
    },

    /**
     * Update an existing expense in the JSON Server
     * PUT /expenses/:id
     */
    updateExpense: async (id: string, updates: Partial<CreateExpense>): Promise<Expense> => {
        console.log(`Updating expense ${id} with:`, updates);

        const updatedExpense = await apiRequest<Expense>(`${API_ENDPOINTS.expenses}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...updates,
                // Convert Date to ISO string if date is being updated
                ...(updates.date && { date: updates.date.toISOString() }),
            }),
        });

        // Convert date string back to Date object
        return {
            ...updatedExpense,
            date: new Date(updatedExpense.date),
        };
    },

    /**
     * Delete an expense from the JSON Server
     * DELETE /expenses/:id
     */
    deleteExpense: async (id: string): Promise<{ id: string }> => {
        console.log(`Deleting expense ${id}`);

        await apiRequest(`${API_ENDPOINTS.expenses}/${id}`, {
            method: 'DELETE',
        });

        return { id };
    },
}; 