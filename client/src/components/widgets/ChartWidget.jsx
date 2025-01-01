import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const ChartWidget = ({ data }) => {
  const { chartData = [], title = 'Chart', type = 'line' } = JSON.parse(data.details);

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
        
        {/* Summary stats if available */}
        {chartData.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              Average: {(chartData.reduce((acc, curr) => acc + curr.value, 0) / chartData.length).toFixed(2)}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              Max: {Math.max(...chartData.map(item => item.value))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
