import { clsx, type ClassValue } from "clsx"
import { es } from "date-fns/locale"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(amount)
}

export const formatDate = (date: Date) => {
  return format(new Date(date), "yyyy-MM-dd", { locale: es })
}