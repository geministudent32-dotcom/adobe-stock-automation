const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get earnings summary
router.get('/earnings', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const response = await axios.get(
      'https://stock.adobe.io/Rest/Libraries/1/Member/Profile',
      {
        headers: {
          'X-API-Key': process.env.ADOBE_API_KEY,
          'Authorization': `Bearer ${process.env.ADOBE_ACCESS_TOKEN}`
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get download stats
router.get('/downloads', async (req, res) => {
  try {
    const response = await axios.get(
      'https://stock.adobe.io/Rest/Libraries/1/Member/ContentStats',
      {
        headers: {
          'X-API-Key': process.env.ADOBE_API_KEY,
          'Authorization': `Bearer ${process.env.ADOBE_ACCESS_TOKEN}`
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top performing content
router.get('/top-content', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const response = await axios.get(
      `https://stock.adobe.io/Rest/Libraries/1/Member/Content?limit=${limit}&sort=downloads`,
      {
        headers: {
          'X-API-Key': process.env.ADOBE_API_KEY,
          'Authorization': `Bearer ${process.env.ADOBE_ACCESS_TOKEN}`
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;