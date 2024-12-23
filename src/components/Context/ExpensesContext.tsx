"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { createExpense, getExpenses, deleteExpense as deleteExpenseApi } from "@/helpers/expenses";
import { CreateExpenseDto, Expense } from "../Dashboard/types";

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (dto: CreateExpenseDto) => Promise<void>;
  deleteExpense: (id: number) => Promise<void>;
  fetchExpenses: (categoryId?: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  currentMonth: number;
  currentYear: number;
}

interface ExpensesProviderProps {
  children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses debe ser usado dentro de un ExpensesProvider");
  }
  return context;
};

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth() + 1);

  const fetchExpenses = async (categoryId?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const expensesData = await getExpenses(categoryId);
      setExpenses(expensesData);
    } catch (err) {
      console.error("Error al obtener los gastos:", err);
      setError("Error al obtener los gastos");
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (dto: CreateExpenseDto) => {
    // Añadimos una validación adicional para amount
    if (dto.amount === undefined || dto.amount <= 0) {
      throw new Error("El importe del gasto debe ser un número positivo");
    }

    setIsLoading(true);
    setError(null);
    try {
      // Convertimos el DTO a un tipo compatible con la API
      const newExpense = await createExpense({
        ...dto,
        amount: dto.amount // Aseguramos que amount sea un número
      });
      setExpenses([newExpense, ...expenses]);
    } catch (error) {
      console.error("Error al crear el gasto:", error);
      setError("Error al crear el gasto");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteExpenseApi(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch {
      setError("Error al eliminar el gasto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense, fetchExpenses, isLoading, error, currentMonth,
        currentYear  }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
