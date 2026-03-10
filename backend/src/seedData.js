import sequelize from './config/database.js';
import User from './models/User.js';
import FeatureClicks from './models/FeatureClicks.js';
import { hashPassword } from './utils/passwordUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    // Clear existing data
    await FeatureClicks.destroy({ where: {} });
    await User.destroy({ where: {} });
    console.log('Cleared existing data');

    // Create test users
    const users = [];
    const usernames = ['john_doe', 'jane_smith', 'mike_johnson', 'sarah_williams', 'alex_brown'];
    const ages = [22, 35, 28, 45, 19, 52, 38, 25, 41, 33];
    const genders = ['Male', 'Female', 'Other'];

    console.log('Creating users...');
    for (const username of usernames) {
      const hashedPassword = await hashPassword('password123');
      const user = await User.create({
        username,
        password: hashedPassword,
        age: ages[Math.floor(Math.random() * ages.length)],
        gender: genders[Math.floor(Math.random() * genders.length)],
      });
      users.push(user);
      console.log(`Created user: ${username}`);
    }

    // Feature names to track
    const features = [
      'Dashboard View',
      'Filter Applied',
      'Chart Clicked',
      'Export Data',
      'Settings',
      'User Profile',
      'Analytics Report',
      'Download CSV',
    ];

    // Action types
    const actionTypes = [
      'filter_change',
      'chart_click',
      'button_click',
      'page_view',
      'data_export',
    ];

    // Create fake interactions (150+ total)
    console.log('Creating interactions...');
    let clickCount = 0;

    for (let i = 0; i < 150; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomFeature = features[Math.floor(Math.random() * features.length)];
      const randomAction = actionTypes[Math.floor(Math.random() * actionTypes.length)];

      // Create timestamps from last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);

      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

      await FeatureClicks.create({
        userId: randomUser.id,
        featureName: randomFeature,
        actionType: randomAction,
        timestamp,
      });

      clickCount++;
    }

    console.log(`Created ${clickCount} interactions`);

    // Display summary
    console.log('\n' + '='.repeat(50));
    console.log('seeding complete');
    console.log('='.repeat(50));
    console.log(`Statistics:`);
    console.log(`   • Users created: ${users.length}`);
    console.log(`   • Interactions created: ${clickCount}`);
    console.log(`   • F eatures tracked: ${features.length}`);
    console.log(`   • Date range: Last 30 days`);
    console.log('\nYou can now login and see real data in the charts!');
    console.log('\nTest users:');
    usernames.forEach((username) => {
      console.log(`Username: ${username}, Password: password123`);
    });
    console.log('='.repeat(50) + '\n');

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();