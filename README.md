# 📊 Interactive Product Analytics Dashboard

> A full-stack web application that tracks its own usage. Every user interaction with the dashboard (filter changes, chart clicks) is logged and visualized in real-time analytics.

## 🎯 Project Overview

This is a **self-referential analytics dashboard** - it analyzes its own usage patterns. When users interact with filters or charts, those interactions become the data that the dashboard displays.

### The "Twist"
Unlike traditional dashboards that show external product metrics, this dashboard visualizes **its own usage**. This creates a recursive analytics loop:

```
User Interaction → Logged in Database → Displayed in Charts → User sees their own interaction
```

---

## ✨ Features

### ✅ Core Features Implemented

#### 🔐 Authentication System
- User Registration with profile info (age, gender)
- Secure Login with JWT tokens
- Password hashing with bcryptjs
- HTTP-only cookie storage
- Protected dashboard routes
- Session management

#### 📊 Interactive Dashboard
- **Bar Chart** - Feature usage breakdown (total clicks per feature)
- **Line Chart** - Time trend analysis (clicks over time)
- **Interactive Charts** - Click bars to see detailed time trends
- **Real-time Analytics** - Data updates as users interact

#### 🔍 Advanced Filtering
- **Date Range Picker** - Filter by custom date ranges
- **Age Group Filter** - <18, 18-40, >40
- **Gender Filter** - Male, Female, Other
- **Filter Persistence** - Selections saved in cookies across sessions
- **Visual Badges** - Shows active filters

#### 🖱️ Interaction Tracking (The Core Feature)
- **Automatic Logging** - Every user action tracked:
  - Filter changes (date, age, gender)
  - Bar chart clicks
  - Filter resets
- **Timestamped Records** - Each interaction logged with precise timestamp
- **User Attribution** - Tracks which user made the interaction
- **Zero Latency** - Non-blocking background tracking

#### 📈 Analytics Aggregation
- **Feature Usage Count** - Total clicks per feature
- **Time Series Data** - Grouped by date
- **Dynamic Filtering** - Apply date/age/gender filters to analytics
- **Stats Cards** - Summary metrics (total interactions, unique features, averages)

#### 🎨 Modern UI/UX
- Tailwind CSS v4 with custom theme colors
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional SaaS-style dashboard layout
- Soft shadows and rounded corners
- Theme colors: Purple, Violet, Amber, Emerald, Red

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts (Bar & Line charts)
- **HTTP Client:** Axios
- **Routing:** React Router DOM v6
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Storage:** js-cookie (for filter persistence)
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL 16
- **ORM:** Sequelize
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment:** dotenv
- **CORS:** cors middleware

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INTEGER,
  gender ENUM('Male', 'Female', 'Other'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Feature Clicks Table
```sql
CREATE TABLE feature_clicks (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  featureName VARCHAR(255) NOT NULL,
  actionType VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and npm
- **PostgreSQL** v12+ (running locally or remote)
- **Git** (for cloning)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

#### 1. Clone Repository

```bash
git clone <your-repo-url>
cd product-analytics-dashboard
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add to `backend/.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=product_analytics_dev
DB_PORT=5432

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d

LOG_LEVEL=debug
```

#### 3. Initialize Database

```bash
# Make sure PostgreSQL is running
psql -U postgres

# Create databases
CREATE DATABASE product_analytics_dev;
CREATE DATABASE product_analytics_test;
```

#### 4. Seed Database with Dummy Data

```bash
cd backend

# This creates 5 test users and 150+ interactions
npm run seed
```

**Test accounts created:**
```
Username: john_doe       | Password: password123
Username: jane_smith     | Password: password123
Username: mike_johnson   | Password: password123
Username: sarah_williams | Password: password123
Username: alex_brown     | Password: password123
```

#### 5. Start Backend Server

```bash
# From backend directory
npm run dev
```

Expected output:
```
✅ Database synced
🚀 Server running on http://localhost:5000
```

#### 6. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### 7. Start Frontend Development Server

```bash
# From frontend directory
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

#### 8. Access Dashboard

1. Open browser: `http://localhost:5173`
2. You'll be redirected to login
3. Login with any test account above
4. Dashboard loads with 150+ seeded interactions

---

## 📖 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request:**
```json
{
  "username": "newuser",
  "password": "password123",
  "age": 28,
  "gender": "Male"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 6,
    "username": "newuser",
    "age": 28,
    "gender": "Male"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/api/auth/login`
Authenticate existing user.

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "age": 25,
    "gender": "Male"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/auth/me`
Get current logged-in user. **Requires JWT token.**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "age": 25,
    "gender": "Male"
  }
}
```

### Analytics Endpoints

#### GET `/api/analytics`
Fetch aggregated analytics data. **Requires JWT token.**

**Query Parameters:**
```
startDate     - (YYYY-MM-DD) Filter from date
endDate       - (YYYY-MM-DD) Filter to date
ageGroup      - ('<18', '18-40', '>40')
gender        - ('Male', 'Female', 'Other')
featureName   - (string) Filter by specific feature
```

**Example Request:**
```
GET /api/analytics?startDate=2026-02-01&endDate=2026-03-10&ageGroup=18-40&gender=Male
```

**Response:**
```json
{
  "byFeature": {
    "date_picker": 7,
    "age_filter": 5,
    "gender_filter": 3,
    "bar_chart": 2,
    "filters": 1
  },
  "timeSeries": [
    { "date": "2026-02-24", "count": 5 },
    { "date": "2026-02-25", "count": 8 },
    { "date": "2026-02-26", "count": 12 }
  ],
  "totalClicks": 18
}
```

#### POST `/api/track`
Log a user interaction. **Requires JWT token.**

**Request:**
```json
{
  "featureName": "date_picker",
  "actionType": "date_range_change",
  "metadata": {
    "startDate": "2026-02-01",
    "endDate": "2026-03-10"
  }
}
```

**Response:**
```json
{
  "message": "Interaction tracked",
  "click": {
    "id": 162,
    "userId": 2,
    "featureName": "date_picker",
    "actionType": "date_range_change",
    "timestamp": "2026-03-10T15:09:18.917Z"
  }
}
```

---

## 📁 Project Structure

```
product-analytics-dashboard/
│
├── frontend/                    # React Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Top navigation bar
│   │   │   ├── Card.jsx        # Reusable card component
│   │   │   ├── Filters.jsx     # Filter controls
│   │   │   ├── BarChartComponent.jsx
│   │   │   ├── LineChartComponent.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login page
│   │   │   ├── Register.jsx    # Registration page
│   │   │   └── Dashboard.jsx   # Main dashboard
│   │   ├── hooks/
│   │   │   ├── useAuth.js      # Auth context hook
│   │   │   └── useAnalytics.js # Analytics data hook
│   │   ├── services/
│   │   │   └── trackingService.js # Interaction tracking
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── App.jsx
│   │   ├── index.css           # Tailwind styles
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Express.js API server
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── FeatureClicks.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── analyticsController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── utils/
│   │   │   ├── passwordUtils.js
│   │   │   └── tokenUtils.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── server.js           # Entry point
│   │   └── seedData.js         # Database seeding
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── README.md (this file)
```

---

## 🧪 Testing the Application

### Test Scenario 1: Basic Authentication
```
1. Open http://localhost:5173
2. Click "Register"
3. Create account with:
   - Username: testuser
   - Password: test123
   - Age: 30
   - Gender: Male
4. Should redirect to dashboard
```

### Test Scenario 2: Interaction Tracking
```
1. Login with john_doe/password123
2. Open DevTools (F12) → Console
3. Change age filter to "18-40"
4. Console should show:
   🎯 Tracking: age_filter = 18-40
   ✅ Tracked successfully: {...}
5. Hard refresh (Ctrl+Shift+R)
6. Bar chart now shows "age_filter: 1" (increased from seed data)
```

### Test Scenario 3: Filter Persistence
```
1. Set filters:
   - Start Date: 2026-02-01
   - Age: 18-40
   - Gender: Female
2. Hard refresh page
3. Filters should still be selected (saved in cookies)
```

### Test Scenario 4: Charts & Analytics
```
1. Click on "date_picker" bar in chart
2. Line chart updates showing date_picker trend
3. Stats cards update to show selected feature data
4. Click different bars to see different time series
```

---

## 🔍 Tracking Features

### What Gets Tracked

| Action | Feature Name | Action Type | Tracked |
|--------|-------------|-------------|---------|
| Change start date | `date_picker` | `date_range_change` | ✅ |
| Change end date | `date_picker` | `date_range_change` | ✅ |
| Select age group | `age_filter` | `filter_change` | ✅ |
| Select gender | `gender_filter` | `filter_change` | ✅ |
| Click bar in chart | `bar_chart` | `bar_click` | ✅ |
| Reset filters | `filters` | `reset` | ✅ |

### Tracking Flow

```
User Action on Dashboard
         ↓
trackingService.track*() called
         ↓
POST /api/track sent to backend
         ↓
Backend validates JWT
         ↓
FeatureClicks record created
         ↓
Data persisted in database
         ↓
Silent success (no UI blocking)
         ↓
On next dashboard refresh
         ↓
GET /api/analytics retrieves updated data
         ↓
Charts display new metrics
```

---

## 🗄️ Database Management

### View Interactions

```bash
# Connect to database
psql -U postgres -d product_analytics_dev

# Count total interactions
SELECT COUNT(*) FROM feature_clicks;

# See recent interactions
SELECT id, user_id, feature_name, action_type, timestamp 
FROM feature_clicks 
ORDER BY timestamp DESC 
LIMIT 10;

# Count by feature
SELECT feature_name, COUNT(*) as total_clicks
FROM feature_clicks
GROUP BY feature_name
ORDER BY total_clicks DESC;

# See by user
SELECT users.username, COUNT(feature_clicks.id) as interactions
FROM feature_clicks
JOIN users ON feature_clicks.user_id = users.id
GROUP BY users.id, users.username;
```

### Reset Database

```bash
# Backup existing data
pg_dump product_analytics_dev > backup.sql

# Drop and recreate
psql -U postgres -d postgres
DROP DATABASE product_analytics_dev;
CREATE DATABASE product_analytics_dev;
\q

# Reseed
cd backend
npm run seed
```

---

## 🚀 Deployment

### Deploy Backend (Render.com)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create new Web Service on Render**
   - Connect GitHub repo
   - Select `backend` directory
   - Set environment variables from `.env`
   - Deploy

3. **Update Frontend .env**
   ```env
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   ```

### Deploy Frontend (Vercel)

1. **Push to GitHub** (same repo)

2. **Create new project on Vercel**
   - Import GitHub repo
   - Select `frontend` directory
   - Add environment variables
   - Deploy

3. **Get live URLs**
   - Backend: `https://dashboard-em9s.onrender.com`
   - Frontend: `https://analytics-observability-dashboard.vercel.app/`

---

## 🏗️ Architecture & Design Decisions

### Frontend Architecture
- **Component-Based:** Reusable components (Card, Navbar, Charts)
- **Hooks-Based State:** Modern React patterns (useState, useEffect, useContext)
- **Context API:** Centralized auth state management
- **Custom Hooks:** `useAuth`, `useAnalytics` for logic abstraction
- **Service Pattern:** `trackingService` for API calls
- **Separation of Concerns:** UI, logic, API calls separated

### Backend Architecture
- **MVC Pattern:**
  - **Models:** Sequelize ORM for data schema
  - **Views:** JSON responses via Express
  - **Controllers:** Business logic in separate files
- **Middleware:** Auth validation, CORS handling
- **Error Handling:** Try-catch blocks with informative messages
- **Logging:** Console logs for debugging (can be replaced with Winston)

### Database Design
- **Normalized:** Separate users and interactions tables
- **Foreign Keys:** User-Interaction relationship with cascading deletes
- **Indexing:** User ID indexed for fast queries
- **Timestamps:** Track when interactions occurred

---

## 📊 Scalability: 1 Million Writes/Minute

### Current Architecture Limitations
- **Single Server:** One backend instance can handle ~1000-5000 writes/min
- **PostgreSQL:** Can handle millions of writes with proper indexing
- **In-Memory:** No caching layer

### To Scale to 1M Writes/Minute

#### 1. **Add Message Queue (Kafka/RabbitMQ)**
```
Dashboard → Message Queue → Worker Pool → Database
```
Instead of direct writes, queue interactions asynchronously.

#### 2. **Implement Caching Layer (Redis)**
```
GET /analytics queries → Check Redis cache first
                      → If miss, query PostgreSQL
                      → Cache result for 5-10 minutes
```

#### 3. **Database Optimization**
```sql
-- Add indexes
CREATE INDEX idx_feature_clicks_user_id ON feature_clicks(user_id);
CREATE INDEX idx_feature_clicks_timestamp ON feature_clicks(timestamp);
CREATE INDEX idx_feature_clicks_feature_name ON feature_clicks(feature_name);

-- Partitioning by date
CREATE TABLE feature_clicks_2026_01 
  PARTITION OF feature_clicks FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

#### 4. **Horizontal Scaling**
```
Load Balancer
    ↓
├── Backend Instance 1
├── Backend Instance 2
├── Backend Instance 3
└── Backend Instance 4
    ↓
Connection Pool
    ↓
PostgreSQL (Read Replicas for analytics queries)
```

#### 5. **Batch Writing**
```javascript
// Instead of single writes
POST /track (1 interaction)

// Batch multiple interactions
POST /track/batch ([100 interactions])

// Database batches inserts with one query
INSERT INTO feature_clicks VALUES (...)
ON CONFLICT DO NOTHING;
```

#### 6. **Data Compression**
- Archive old interactions to separate table
- Compress historical data
- Real-time queries hit fresh data only

#### 7. **Monitoring & Optimization**
```
- Use APM tools (New Relic, DataDog)
- Monitor query performance
- Set up auto-scaling based on CPU/memory
- Use CloudFlare for static asset caching
```

**Estimated Setup:**
- Kafka/RabbitMQ: 50K writes/sec (2.5M writes/min)
- With 4 backend instances + Redis: 10M writes/min
- With database partitioning: 100M+ writes/min

---

## 🔒 Security Considerations

### Implemented
- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ CORS enabled
- ✅ Environment variables for secrets
- ✅ Protected routes

### Recommended for Production
- 🔲 HTTPS/TLS encryption
- 🔲 Rate limiting (express-rate-limit)
- 🔲 Input validation (joi, express-validator)
- 🔲 SQL injection prevention (Sequelize parameterized queries)
- 🔲 CSRF protection
- 🔲 XSS protection headers
- 🔲 Database encryption at rest
- 🔲 API key rotation
- 🔲 Audit logging
- 🔲 Regular security audits

---

## 🐛 Troubleshooting

### "Database connection failed"
```bash
# Check PostgreSQL is running
psql -U postgres -d postgres

# Verify credentials in .env match
# Verify database exists
\l
```

### "Token expired or invalid"
```bash
# Clear cookies
localStorage.clear();
// or press F12 → Application → Clear all
// Refresh and login again
```

### "Charts not displaying"
```bash
# Check if API returns data
curl http://localhost:5000/api/analytics

# Check browser console for errors (F12)
# Make sure height is set on chart containers
```

### "Tracking not working"
```bash
# Check DevTools Console for tracking logs
# Check backend terminal for incoming POST /track requests
# Verify JWT token is valid
```

---

## 📝 Environment Variables

### Backend `.env`
```
NODE_ENV=development|production
PORT=5000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=product_analytics_dev
DB_PORT=5432

JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRY=7d

LOG_LEVEL=debug|info|warn|error
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📄 License

MIT License - Feel free to use this project for learning purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

