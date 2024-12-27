'use client';

import { StatisticsData, StatisticsQueryDto } from '@/helpers/statistics';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface StatisticsContextType {
  statistics: StatisticsData | null;
  loading: boolean;
  error: string | null;
  fetchStatistics: (filters: StatisticsQueryDto) => Promise<void>;
  selectedPeriod: 'month' | 'year';
  setSelectedPeriod: (period: 'month' | 'year') => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const API_URL = 'https://backendmisgastos-2.onrender.com';

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export function StatisticsProvider({ children }: { children: React.ReactNode }) {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('month');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const fetchStatistics = useCallback(async (filters: StatisticsQueryDto) => {
    try {
      setLoading(true);
      setError(null);

      // Convertir filtros a URLSearchParams
      const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((params, [key, value]) => {
          if (value !== null && value !== undefined) {
            params[key] = value instanceof Date ? value.toISOString() : String(value);
          }
          return params;
        }, {} as Record<string, string>)
      ).toString();

      const response = await fetch(`${API_URL}/statistics?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Suponiendo que guardas el token en localStorage
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar estadísticas');
      }

      const data = await response.json();
      setStatistics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    statistics,
    loading,
    error,
    fetchStatistics,
    selectedPeriod,
    setSelectedPeriod,
    selectedCategoryId,
    setSelectedCategoryId,
    dateRange,
    setDateRange,
  };

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
}

export function useStatistics() {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
}
