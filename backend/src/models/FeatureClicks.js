import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const FeatureClicks = sequelize.define('FeatureClicks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  featureName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  actionType: {
    type: DataTypes.STRING, // 'filter_change', 'chart_click', 'bar_click', etc.
    allowNull: false,
  },
}, {
  tableName: 'feature_clicks',
  timestamps: false,
});

// Define relationship
User.hasMany(FeatureClicks, { foreignKey: 'userId' });
FeatureClicks.belongsTo(User, { foreignKey: 'userId' });

export default FeatureClicks;