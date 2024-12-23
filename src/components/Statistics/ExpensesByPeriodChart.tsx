// components/ExpensesByPeriodChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStatistics } from '../Context/StatisticsContext';


export function ExpensesByPeriodChart() {
  const { statistics, selectedPeriod } = useStatistics();

  if (!statistics?.expensesByPeriod.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Gastos por {selectedPeriod === 'month' ? 'Mes' : 'Año'}
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statistics.expensesByPeriod}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
