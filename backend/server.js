const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// CORS configuration supporting production CLIENT_URL and local dev
const clientOrigin = process.env.CLIENT_URL;
app.use(cors({
  origin: clientOrigin && clientOrigin !== '*'
    ? clientOrigin.includes(',')
      ? clientOrigin.split(',').map((o) => o.trim())
      : clientOrigin
    : true,
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));

// Health check endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Learning Platform API running 🚀', status: 'ok' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/lessons', require('./routes/lesson'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});