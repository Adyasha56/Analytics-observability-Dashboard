import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

export const useAnalytics = (filters) => {
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const { token } = useAuth();

  // Generate mock bar chart data
  const generateMockBarData = () => {
    const features = ['Dashboard View', 'Filter Applied', 'Chart Clicked', 'Export Data', 'Settings'];
    return features.map((feature) => ({
      name: feature,
      clicks: Math.floor(Math.random() * 100) + 10,
    }));
  };

  // Generate mock line chart data (15 days)
  const generateMockLineData = () => {
    const dates = [];
    for (let i = 14; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates.map((date) => ({
      date,
      clicks: Math.floor(Math.random() * 50) + 5,
    }));
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        console.log('No token available, using mock data');
        setBarChartData(generateMockBarData());
        setLoading(false);
        return;
      }

      const params = {
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
        ageGroup: filters.ageGroup || '',
        gender: filters.gender || '',
      };

      console.log('Fetching analytics with params:', params);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/analytics`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Analytics response:', response.data);

      // Bar chart: grouped by feature
      if (response.data.byFeature && Object.keys(response.data.byFeature).length > 0) {
        const barData = Object.entries(response.data.byFeature).map(([feature, count]) => ({
          name: feature,
          clicks: count,
        }));
        setBarChartData(barData);
      } else {
        console.log('No feature data, using mock data');
        setBarChartData(generateMockBarData());
      }

      // Line chart: time series (initially all data)
      if (response.data.timeSeries && response.data.timeSeries.length > 0) {
        const lineData = response.data.timeSeries.map((item) => ({
          date: item.date,
          clicks: item.count,
        }));
        setLineChartData(lineData);
      } else {
        console.log('No time series data');
        setLineChartData([]);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err.message);
      setError('Failed to load analytics data, using mock data');
      
      // Fallback to mock data
      setBarChartData(generateMockBarData());
      setLineChartData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch time series data for selected feature
  const fetchFeatureTimeSeries = async (featureName) => {
    setSelectedFeature(featureName);
    setLoading(true);

    try {
      if (!token) {
        console.log('No token, generating mock time series');
        setLineChartData(generateMockLineData());
        setLoading(false);
        return;
      }

      const params = {
        featureName,
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
        ageGroup: filters.ageGroup || '',
        gender: filters.gender || '',
      };

      console.log('Fetching time series for feature:', featureName);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/analytics`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.timeSeries && response.data.timeSeries.length > 0) {
        const lineData = response.data.timeSeries.map((item) => ({
          date: item.date,
          clicks: item.count,
        }));
        setLineChartData(lineData);
      } else {
        console.log('No data for feature, using mock data');
        setLineChartData(generateMockLineData());
      }
    } catch (err) {
      console.error('Failed to fetch feature time series:', err.message);
      setLineChartData(generateMockLineData());
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    fetchAnalytics();
  }, [filters, token]);

  return {
    barChartData,
    lineChartData,
    loading,
    error,
    selectedFeature,
    fetchFeatureTimeSeries,
    refreshData: fetchAnalytics,
  };
};