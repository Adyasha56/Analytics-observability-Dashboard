import FeatureClicks from '../models/FeatureClicks.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

//get analytics
export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, ageGroup, gender, featureName } = req.query;
    const userId = req.user.id;

    // Build where clause
    const whereClause = { userId };

    // Add date filter
    if (startDate || endDate) {
      whereClause.timestamp = {};
      if (startDate) {
        whereClause.timestamp[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        const endDateObj = new Date(endDate);
        endDateObj.setHours(23, 59, 59, 999);
        whereClause.timestamp[Op.lte] = endDateObj;
      }
    }

    // Add feature name filter
    if (featureName) {
      whereClause.featureName = featureName;
    }

    // Get all matching feature clicks
    let clicks = await FeatureClicks.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['id', 'age', 'gender'],
        },
      ],
      order: [['timestamp', 'ASC']],
    });

    // Apply age and gender filters on the JavaScript side
    if (ageGroup || gender) {
      clicks = clicks.filter((click) => {
        const userAge = click.User.age;
        const userGender = click.User.gender;

        if (ageGroup) {
          const ageMatch = filterByAgeGroup(userAge, ageGroup);
          if (!ageMatch) return false;
        }

        if (gender && userGender !== gender) {
          return false;
        }

        return true;
      });
    }

    // Group by feature name
    const byFeature = {};
    clicks.forEach((click) => {
      byFeature[click.featureName] = (byFeature[click.featureName] || 0) + 1;
    });

    // Group by date for time series
    const timeSeries = {};
    clicks.forEach((click) => {
      const date = click.timestamp.toISOString().split('T')[0];
      timeSeries[date] = (timeSeries[date] || 0) + 1;
    });

    // Convert to array and sort
    const timeSeriesArray = Object.entries(timeSeries)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      byFeature,
      timeSeries: timeSeriesArray,
      totalClicks: clicks.length,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

//track 
export const trackInteraction = async (req, res) => {
  try {
    const { featureName, actionType } = req.body;
    const userId = req.user.id;

    console.log('Tracking interaction:', { userId, featureName, actionType });

    if (!featureName || !actionType) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'featureName and actionType required' });
    }

    const click = await FeatureClicks.create({
      userId,
      featureName,
      actionType,
      timestamp: new Date(),
    });

    console.log('Interaction tracked successfully:', click.toJSON());

    res.json({
      message: 'Interaction tracked',
      click: click.toJSON(),
    });
  } catch (err) {
    console.error('Track interaction error:', err);
    res.status(500).json({ error: 'Failed to track interaction', details: err.message });
  }
};

//helper func
function filterByAgeGroup(age, ageGroup) {
  if (!age) return true; // If age is not set, include it

  switch (ageGroup) {
    case '<18':
      return age < 18;
    case '18-40':
      return age >= 18 && age <= 40;
    case '>40':
      return age > 40;
    default:
      return true;
  }
}