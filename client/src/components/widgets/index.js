import { ChecklistWidget } from './ChecklistWidget';
import { FlowchartWidget } from './FlowchartWidget';
import { DataTableWidget } from './DataTableWidget';
import { ChartWidget } from './ChartWidget';

export {
  ChecklistWidget,
  FlowchartWidget,
  DataTableWidget,
  ChartWidget
};

export const WidgetSelector = ({ type, data }) => {
  const widgets = {
    checklist: ChecklistWidget,
    flowchart: FlowchartWidget,
    data_table: DataTableWidget,
    chart: ChartWidget
  };

  const Widget = widgets[type];
  
  if (!Widget) {
    console.warn(`Unknown widget type: ${type}`);
    return null;
  }

  try {
    return <Widget data={data} />;
  } catch (error) {
    console.error(`Error rendering widget: ${error}`);
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        Error rendering widget
      </div>
    );
  }
};
