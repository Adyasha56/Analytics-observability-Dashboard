import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api', analyticsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

//db sync
const syncDatabase = async () => {
  try {
    // In production: alter: false (safer)
    // In development: alter: true (auto-update schema)
    const alterMode = process.env.NODE_ENV === 'production' ? false : true;
    
    await sequelize.sync({ alter: alterMode });
    console.log('Database synced');
  } catch (err) {
    console.error('Database sync failed:', err);
    // In production, don't crash - just log
    if (process.env.NODE_ENV === 'production') {
      console.error('Warning: Database sync failed, but server continuing...');
    } else {
      process.exit(1);
    }
  }
};

syncDatabase();

//err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
});

export default app;