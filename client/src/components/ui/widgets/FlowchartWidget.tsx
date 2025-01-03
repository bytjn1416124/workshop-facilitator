import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import type { FlowchartData } from './WidgetSelector';

interface FlowchartWidgetProps {
  data: FlowchartData;
}

export const FlowchartWidget: React.FC<FlowchartWidgetProps> = ({ data }) => {
  const { nodes = [], title = 'Flowchart' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-4 border rounded bg-white w-full text-center"
            >
              {node.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};