const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/upload', require('./routes/upload'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/keywords', require('./routes/keywords'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Adobe Stock Automation API is running' });
});

// Scheduled tasks
cron.schedule('0 9 * * *', () => {
  console.log('Running daily analytics sync...');
  // Sync Adobe Stock analytics
});

cron.schedule('0 */6 * * *', () => {
  console.log('Checking for new sales...');
  // Check for new sales and send notifications
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});