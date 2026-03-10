import { useState } from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import Card from '../components/Card';
import BarChartComponent from '../components/BarChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    ageGroup: '',
    gender: '',
  });

  const {
    barChartData,
    lineChartData,
    loading,
    selectedFeature,
    fetchFeatureTimeSeries,
  } = useAnalytics(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBarClick = (featureName) => {
    fetchFeatureTimeSeries(featureName);
  };

  // Calculate stats
  const totalInteractions = barChartData.reduce((sum, item) => sum + item.clicks, 0);
  const uniqueFeatures = barChartData.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
       

        {/* Filters */}
        <Filters onFilterChange={handleFilterChange} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card title="📊 Feature Usage (Click to View Trends)" className="h-96">
            {loading && <div className="flex justify-center items-center h-full"><p>Loading...</p></div>}
            {!loading && (
              <BarChartComponent
                data={barChartData}
                loading={loading}
                onBarClick={handleBarClick}
                selectedFeature={selectedFeature}
              />
            )}
          </Card>

          {/* Line Chart */}
          <Card 
            title={selectedFeature ? `📈 Trend for "${selectedFeature}"` : "📈 Time Trend"} 
            className="h-96"
          >
            {loading && <div className="flex justify-center items-center h-full"><p>Loading...</p></div>}
            {!loading && (
              <LineChartComponent
                data={lineChartData}
                loading={loading}
                selectedFeature={selectedFeature}
              />
            )}
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Total Interactions */}
          <Card>
            <div className="text-center">
              <div className="text-5xl font-bold text-violet-600">{totalInteractions}</div>
              <p className="text-gray-600 text-sm mt-2">Total Interactions</p>
              <p className="text-xs text-gray-400 mt-1">
                {selectedFeature ? `for "${selectedFeature}"` : 'all features'}
              </p>
            </div>
          </Card>

          {/* Unique Features */}
          <Card>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600">{uniqueFeatures}</div>
              <p className="text-gray-600 text-sm mt-2">Unique Features</p>
              <p className="text-xs text-gray-400 mt-1">tracked in this period</p>
            </div>
          </Card>

          {/* Average Interactions */}
          <Card>
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600">
                {uniqueFeatures > 0 ? Math.round(totalInteractions / uniqueFeatures) : 0}
              </div>
              <p className="text-gray-600 text-sm mt-2">Avg per Feature</p>
              <p className="text-xs text-gray-400 mt-1">mean interactions</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity Info */}
        <Card title="ℹ️ How to Use" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800 mb-1">1️⃣ Filter Data</p>
              <p>Use the filters above to narrow down data by date range, age group, or gender</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">2️⃣ Click Bars</p>
              <p>Click on any bar in the chart to see the time trend for that specific feature</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">3️⃣ Analyze Trends</p>
              <p>The line chart shows how clicks for that feature evolved over the selected period</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}