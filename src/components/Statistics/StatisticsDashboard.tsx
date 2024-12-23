'use client'
import React, { useEffect } from 'react';
import { useStatistics } from '../Context/StatisticsContext';
import { StatisticsFilters } from './StatisticsFilters';
import { StatisticsSummary } from './StatisticsSummary';
import { ExpensesByCategoryChart } from './ExpensesByCategoryChart';
import { ExpensesByPeriodChart } from './ExpensesByPeriodChart';
import { CategoryTrendsChart } from './CategoryTrendsChart';
import { Spinner } from '../ui/Spinner'; // Importamos el Spinner

export function StatisticsDashboard() {
  const {
    fetchStatistics,
    selectedPeriod,
    selectedCategoryId,
    dateRange,
    loading,
    error
  } = useStatistics();

  useEffect(() => {
    fetchStatistics({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      categoryId: selectedCategoryId,
      groupBy: selectedPeriod,
    });
  }, [fetchStatistics, selectedPeriod, selectedCategoryId, dateRange]);

  // Muestra el Spinner mientras está cargando
  if (loading) return <Spinner />;

  // Muestra el error si ocurrió uno
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Gastos</h1>
      
      <StatisticsFilters />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatisticsSummary />
        <ExpensesByCategoryChart />
      </div>
      
      <div className="mt-6">
        <ExpensesByPeriodChart />
      </div>
      
      {selectedCategoryId && (
        <div className="mt-6">
          <CategoryTrendsChart />
        </div>
      )}
    </div>
  );
}
