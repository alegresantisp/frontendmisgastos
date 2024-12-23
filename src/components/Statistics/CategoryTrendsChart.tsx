// components/CategoryTrendsChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useStatistics } from '../Context/StatisticsContext';


export function CategoryTrendsChart() {
  const { statistics, selectedCategoryId } = useStatistics();

  if (!statistics?.categoryTrends?.length || !selectedCategoryId) return null;

  const trend = statistics.categoryTrends[0];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Tendencia: {trend.categoryName}
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend.trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              name="Monto"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}