import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ChecklistWidget = ({ data }: { data: any }) => {
  const { items = [], title = 'Checklist' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const FlowchartWidget = ({ data }: { data: any }) => {
  const { nodes = [], title = 'Flowchart' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {nodes.map((node: any, index: number) => (
            <div key={index} className="p-4 border rounded bg-white">
              {node.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const DataTableWidget = ({ data }: { data: any }) => {
  const { headers = [], rows = [], title = 'Data Table' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {headers.map((header: string, index: number) => (
                  <th key={index} className="p-2 text-left border-b">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="p-2 border-b">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export const ChartWidget = ({ data }: { data: any }) => {
  const { chartData = [], title = 'Chart' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};