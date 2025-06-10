import { useState, useEffect, useCallback } from 'react';
import { Expense, CreateExpense } from '../types';
import { expensesService } from '../services/service';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await expensesService.getExpenses();
            setExpenses(data);
        } catch (err) {
            console.error('Error fetching expenses:', err);
            setError('Error fetching expenses.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const addExpense = async (expenseData: CreateExpense) => {
        setLoading(true);
        try {
            const newExpense = await expensesService.addExpense(expenseData);
            setExpenses(prev => [...prev, newExpense]);
        } catch (err) {
            console.error('Error adding expense:', err);
            setError('Error adding expense.');
        } finally {
            setLoading(false);
        }
    };

    const editExpense = async (id: string, updates: Partial<CreateExpense>) => {
        setLoading(true);
        try {
            const updatedExpense = await expensesService.updateExpense(id, updates);
            setExpenses(prev => prev.map(g => (g.id === id ? updatedExpense : g)));
        } catch (err) {
            console.error('Error updating expense:', err);
            setError('Error updating expense.');
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id: string) => {
        setLoading(true);
        try {
            await expensesService.deleteExpense(id);
            setExpenses(prev => prev.filter(g => g.id !== id));
        } catch (err) {
            console.error('Error deleting expense:', err);
            setError('Error deleting expense.');
        } finally {
            setLoading(false);
        }
    };

    return { expenses, loading, error, fetchExpenses, addExpense, editExpense, deleteExpense };
}; 