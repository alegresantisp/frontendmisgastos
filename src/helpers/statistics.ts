// types/statistics.ts
export interface CategoryExpense {
    categoryId: number | 'uncategorized';
    categoryName: string;
    total: number;
    percentage: number;
  }
  
  export interface PeriodExpense {
    period: string;
    total: number;
    categories: CategoryExpense[];
  }
  
  export interface CategoryTrend {
    categoryId: number | 'uncategorized';
    categoryName: string;
    trends: { period: string; amount: number }[];
  }
  
  export interface StatisticsData {
    totalExpenses: number;
    averageExpense: number;
    expensesByCategory: CategoryExpense[];
    expensesByPeriod: PeriodExpense[];
    categoryTrends?: CategoryTrend[];
  }
  
  export interface StatisticsQueryDto {
    startDate?: Date | null;
    endDate?: Date | null;
    categoryId?: string | null;
    groupBy?: 'month' | 'year';
  }
  