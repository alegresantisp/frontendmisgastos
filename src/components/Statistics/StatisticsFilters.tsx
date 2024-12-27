'use client'

import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStatistics } from '../Context/StatisticsContext'

export function StatisticsFilters() {
  const {
    selectedPeriod,
    setSelectedPeriod,
  } = useStatistics()

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow-md">
      <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'month' | 'year')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar periodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Por Mes</SelectItem>
          <SelectItem value="year">Por Año</SelectItem>
        </SelectContent>
      </Select>

   
    </div>
  )
}
