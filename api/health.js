// API Health Check Endpoint for Express Backend
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    database: 'connected', // Update based on actual DB connection
  };

  res.status(200).json(healthData);
});

module.exports = router;
