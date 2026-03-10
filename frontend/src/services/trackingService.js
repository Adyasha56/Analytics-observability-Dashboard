import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const trackingService = {
  // Track filter change
  trackFilterChange: async (filterType, filterValue, token) => {
    try {
      console.log(`Tracking: ${filterType} = ${filterValue}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: filterType,
          actionType: 'filter_change',
          metadata: {
            value: filterValue,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error(`Failed to track ${filterType}:`, err.message);
    }
  },

  // Track chart click
  trackChartClick: async (chartType, featureName, token) => {
    try {
      console.log(`Tracking: ${chartType} click on ${featureName}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: featureName,
          actionType: `${chartType}_click`,
          metadata: {
            chartType,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error('Failed to track chart click:', err.message);
    }
  },

  // Track date selection
  trackDateSelection: async (startDate, endDate, token) => {
    try {
      console.log(`Tracking: date_picker ${startDate} to ${endDate}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: 'date_picker',
          actionType: 'date_range_change',
          metadata: {
            startDate,
            endDate,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error('Failed to track date selection:', err.message);
    }
  },

  // Track age filter
  trackAgeFilter: async (ageGroup, token) => {
    try {
      console.log(`Tracking: age_filter = ${ageGroup}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: 'age_filter',
          actionType: 'filter_change',
          metadata: {
            ageGroup,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error('Failed to track age filter:', err.message);
    }
  },

  // Track gender filter
  trackGenderFilter: async (gender, token) => {
    try {
      console.log(`Tracking: gender_filter = ${gender}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: 'gender_filter',
          actionType: 'filter_change',
          metadata: {
            gender,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error(' Failed to track gender filter:', err.message);
    }
  },

  // Track bar chart click
  trackBarChartClick: async (featureName, token) => {
    try {
      console.log(`Tracking: bar_chart click on ${featureName}`);
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: 'bar_chart',
          actionType: 'bar_click',
          metadata: {
            selectedFeature: featureName,
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error('Failed to track bar chart click:', err.message);
    }
  },

  // Track filter reset
  trackFilterReset: async (token) => {
    try {
      console.log('Tracking: filters_reset');
      const response = await axios.post(
        `${API_URL}/track`,
        {
          featureName: 'filters',
          actionType: 'reset',
          metadata: {
            timestamp: new Date().toISOString(),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tracked successfully:', response.data);
    } catch (err) {
      console.error('Failed to track filter reset:', err.message);
    }
  },
};