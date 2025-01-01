import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

export const FlowchartWidget = ({ data }) => {
  const { nodes = [], edges = [], title = 'Flowchart' } = JSON.parse(data.details);

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {nodes.map((node, index) => (
            <div key={node.id} className="w-full max-w-md">
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-center font-medium">{node.content}</p>
              </div>
              {index < nodes.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend if needed */}
        {edges.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Connections:</h4>
            <ul className="text-sm text-gray-600">
              {edges.map((edge, index) => (
                <li key={index}>
                  {nodes.find(n => n.id === edge.from)?.content} →{' '}
                  {nodes.find(n => n.id === edge.to)?.content}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
