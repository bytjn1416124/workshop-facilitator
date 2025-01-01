import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FlowchartWidget = ({ data }) => {
  const { nodes = [], title = 'Flowchart' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {nodes.map((node, index) => (
            <div key={index} className="p-4 border rounded bg-white">
              {node.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};