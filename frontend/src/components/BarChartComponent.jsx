import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { trackingService } from '../services/trackingService';

const COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];

export default function BarChartComponent({ data, loading, onBarClick, selectedFeature }) {
  const { token } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const handleBarClick = (barData) => {
    // Track the bar click
    if (token) {
      trackingService.trackBarChartClick(barData.name, token);
    }
    // Call parent handler
    onBarClick(barData.name);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={{ value: 'Click Count', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '10px',
          }}
          formatter={(value) => [`${value} clicks`, 'Total']}
        />
        <Legend />
        <Bar
          dataKey="clicks"
          fill="#7C3AED"
          radius={[8, 8, 0, 0]}
          onClick={handleBarClick}
          cursor="pointer"
          animationDuration={500}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                selectedFeature === entry.name
                  ? '#EC4899'
                  : COLORS[index % COLORS.length]
              }
              opacity={selectedFeature === entry.name ? 1 : 0.8}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}