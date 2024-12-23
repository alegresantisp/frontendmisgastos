"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from '../Context/CategoriesContext';
import { useExpenses } from '../Context/ExpensesContext';

const Cards: React.FC = () => {
  const { categories } = useCategories();
  const { expenses, currentMonth } = useExpenses();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const highestExpense = expenses.reduce((max, expense) => 
    expense.amount > max.amount ? expense : max, 
    { amount: 0, description: 'No hay gastos' }
  );

  const categorySpending = categories
  .map(category => ({
    ...category,
    totalAmount: expenses
      .filter(expense => expense.category.id === category.id) 
      .reduce((sum, expense) => sum + expense.amount, 0),
  }))
  .sort((a, b) => b.totalAmount - a.totalAmount)
  .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Gastos totales del mes de {monthNames[currentMonth - 1]}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'ARG' })}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gasto más alto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{highestExpense.amount.toLocaleString('es-ES', { style: 'currency', currency: 'ARG' })}</p>
          <p className="text-sm text-gray-500">{highestExpense.description}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Categorías con Mayor Gasto</CardTitle>
        </CardHeader>
        <CardContent>
          {categorySpending.map(category => (
            <div key={category.id} className="flex justify-between mb-2">
              <span>{category.name}</span>
              <span className="font-bold">{category.totalAmount.toLocaleString('es-ES', { style: 'currency', currency: 'ARG' })}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
