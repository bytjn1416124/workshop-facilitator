import React from 'react';
import { ChecklistWidget } from './ChecklistWidget';
import { FlowchartWidget } from './FlowchartWidget';
import { DataTableWidget } from './DataTableWidget';
import { ChartWidget } from './ChartWidget';

export interface ChecklistData {
  items: Array<{ id: string; text: string; checked?: boolean }>;
  title?: string;
}

export interface FlowchartData {
  nodes: Array<{ id: string; content: string }>;
  title?: string;
}

export interface DataTableData {
  headers: string[];
  rows: string[][];
  title?: string;
}

export interface ChartData {
  chartData: Array<{ name: string; value: number }>;
  title?: string;
}

type WidgetData = {
  checklist: ChecklistData;
  flowchart: FlowchartData;
  data_table: DataTableData;
  chart: ChartData;
};

interface WidgetSelectorProps {
  type: keyof WidgetData;
  data: WidgetData[keyof WidgetData];
}

export const WidgetSelector: React.FC<WidgetSelectorProps> = ({ type, data }) => {
  const widgets = {
    checklist: ChecklistWidget,
    flowchart: FlowchartWidget,
    data_table: DataTableWidget,
    chart: ChartWidget
  } as const;

  const Widget = widgets[type];
  
  if (!Widget) {
    console.warn(`Unknown widget type: ${type}`);
    return null;
  }

  try {
    // Type assertion to handle the widget-specific data type
    return <Widget data={data as any} />;
  } catch (error) {
    console.error(`Error rendering widget: ${error}`);
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        Error rendering widget
      </div>
    );
  }
};