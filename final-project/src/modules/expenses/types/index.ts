export interface Expense {
    id: string;
    fecha: Date;
    categoria: string;
    descripcion: string;
    monto: number;
}

export type CreateExpense = Omit<Expense, 'id'>; 