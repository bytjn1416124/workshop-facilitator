import { Card, CardContent, CardHeader, CardTitle } from '../card';

interface ChartData {
  chartData: Array<{ name: string; value: number }>;
  title?: string;
}

interface ChartWidgetProps {
  data: ChartData;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ data }) => {
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