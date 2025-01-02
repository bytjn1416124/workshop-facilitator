import { Card, CardContent, CardHeader, CardTitle } from '../card';

export const ChecklistWidget = ({ data }) => {
  const { items = [], title = 'Checklist' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
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
            <div key={index} className="p-4 border rounded bg-white w-full text-center">
              {node.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const DataTableWidget = ({ data }) => {
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
                {headers.map((header, index) => (
                  <th key={index} className="p-2 text-left border-b bg-gray-50">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
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

export const ChartWidget = ({ data }) => {
  const { chartData = [], title = 'Chart' } = data;
  
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Chart visualization will be rendered here</p>
        </div>
      </CardContent>
    </Card>
  );
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