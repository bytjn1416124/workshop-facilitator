import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import type { ChecklistData } from './WidgetSelector';

interface ChecklistWidgetProps {
  data: ChecklistData;
}

export const ChecklistWidget: React.FC<ChecklistWidgetProps> = ({ data }) => {
  const { items = [], title = 'Checklist' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={item.checked}
                onChange={() => {}}
              />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};