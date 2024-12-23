import React from 'react';
import { useStatistics } from '../Context/StatisticsContext';

export function StatisticsSummary() {
  const { statistics } = useStatistics();

  if (!statistics) return null;

  // Determinar el mes con más gastos
  const monthWithMostExpenses = statistics.expensesByPeriod.reduce(
    (max, period) => (period.total > max.total ? period : max),
    { period: '', total: 0 }
  );

  // Determinar la categoría con más gastos
  const categoryWithMostExpenses = statistics.expensesByCategory.reduce(
    (max, category) => (category.total > max.total ? category : max),
    { categoryName: '', total: 0 }
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Gastos</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
          ${statistics.totalExpenses.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Mes con más gastos</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
          {monthWithMostExpenses.period} - ${monthWithMostExpenses.total.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Categoría con más gastos</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
          {categoryWithMostExpenses.categoryName} - ${categoryWithMostExpenses.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
