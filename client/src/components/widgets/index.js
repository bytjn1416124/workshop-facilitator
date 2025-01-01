export { ChecklistWidget } from './ChecklistWidget';
export { FlowchartWidget } from './FlowchartWidget';
export { DataTableWidget } from './DataTableWidget';
export { ChartWidget } from './ChartWidget';

export const WidgetSelector = ({ type, data }) => {
  switch (type) {
    case 'checklist':
      return <ChecklistWidget data={data} />;
    case 'flowchart':
      return <FlowchartWidget data={data} />;
    case 'data_table':
      return <DataTableWidget data={data} />;
    case 'chart':
      return <ChartWidget data={data} />;
    default:
      return null;
  }
};