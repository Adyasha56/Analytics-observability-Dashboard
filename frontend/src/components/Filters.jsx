import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Card from './Card';
import { useAuth } from '../hooks/useAuth';
import { trackingService } from '../services/trackingService';

export default function Filters({ onFilterChange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const { token } = useAuth();

  // Load filters from cookies on mount
  useEffect(() => {
    const savedFilters = Cookies.get('filters');
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        setStartDate(filters.startDate || '');
        setEndDate(filters.endDate || '');
        setAgeGroup(filters.ageGroup || '');
        setGender(filters.gender || '');
      } catch (err) {
        console.error('Failed to load filters:', err);
      }
    }
  }, []);

  // Save filters to cookies and notify parent
  const handleFilterChange = () => {
    const filters = {
      startDate,
      endDate,
      ageGroup,
      gender,
    };

    // Save to cookies
    Cookies.set('filters', JSON.stringify(filters), { expires: 7 });

    // Notify parent component
    onFilterChange(filters);
  };

  // Handle individual changes
  const handleStartDateChange = (value) => {
    setStartDate(value);
    // Track date change
    if (token) {
      trackingService.trackDateSelection(value, endDate, token);
    }
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    // Track date change
    if (token) {
      trackingService.trackDateSelection(startDate, value, token);
    }
  };

  const handleAgeGroupChange = (value) => {
    setAgeGroup(value);
    // Track age filter change
    if (token) {
      trackingService.trackAgeFilter(value, token);
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
    // Track gender filter change
    if (token) {
      trackingService.trackGenderFilter(value, token);
    }
  };

  // Apply filters whenever any filter changes
  useEffect(() => {
    handleFilterChange();
  }, [startDate, endDate, ageGroup, gender]);

  // Reset filters
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setAgeGroup('');
    setGender('');
    Cookies.remove('filters');
    // Track reset
    if (token) {
      trackingService.trackFilterReset(token);
    }
  };

  return (
    <Card title="🔍 Filters" className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range Start */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm"
          />
        </div>

        {/* Date Range End */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm"
          />
        </div>

        {/* Age Group Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Group
          </label>
          <select
            value={ageGroup}
            onChange={(e) => handleAgeGroupChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm"
          >
            <option value="">All Ages</option>
            <option value="<18">&lt; 18</option>
            <option value="18-40">18 - 40</option>
            <option value=">40">&gt; 40</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-sm"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {startDate && (
          <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs">
            Start: {startDate}
          </span>
        )}
        {endDate && (
          <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs">
            End: {endDate}
          </span>
        )}
        {ageGroup && (
          <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs">
            Age: {ageGroup}
          </span>
        )}
        {gender && (
          <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
            Gender: {gender}
          </span>
        )}
      </div>
    </Card>
  );
}