import { Card, CardContent, CardHeader, CardTitle } from '../card';

interface DataTableData {
  headers: string[];
  rows: string[][];
  title?: string;
}

interface DataTableWidgetProps {
  data: DataTableData;
}

export const DataTableWidget: React.FC<DataTableWidgetProps> = ({ data }) => {
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