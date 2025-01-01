import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export const ChecklistWidget = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const { items = [], title = 'Checklist', instructions = '' } = JSON.parse(data.details);

  const handleCheck = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {instructions && (
          <p className="text-sm text-gray-600">{instructions}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox
                id={`item-${index}`}
                checked={checkedItems[index] || false}
                onCheckedChange={() => handleCheck(index)}
              />
              <label
                htmlFor={`item-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Completed: {Object.values(checkedItems).filter(Boolean).length} of {items.length}
        </div>
      </CardContent>
    </Card>
  );
};
