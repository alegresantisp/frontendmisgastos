'use client'

import React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
    dateRange,
    setDateRange,
  } = useStatistics()

  // Convertir valores de null a undefined
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dateRange.startDate || undefined,
    to: dateRange.endDate || undefined,
  })

  React.useEffect(() => {
    if (date?.from && date?.to) {
      setDateRange({ startDate: date.from, endDate: date.to })
    }
  }, [date, setDateRange])

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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Seleccionar rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
