import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});


//db sync
sequelize.sync({ alter: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Database sync failed:', err);
});

//err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;