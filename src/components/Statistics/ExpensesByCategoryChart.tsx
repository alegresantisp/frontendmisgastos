// components/ExpensesByCategoryChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useStatistics } from '../Context/StatisticsContext';
import { CategoryExpense } from '@/helpers/statistics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function ExpensesByCategoryChart() {
  const { statistics } = useStatistics();

  if (!statistics?.expensesByCategory.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Gastos por Categoría</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statistics.expensesByCategory}
              dataKey="total"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statistics.expensesByCategory.map((entry: CategoryExpense, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}