const express = require('express');
const router = express.Router();
const axios = require('axios');

// Adobe OAuth callback
router.get('/adobe/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    // Exchange code for access token
    const response = await axios.post(
      'https://ims-na1.adobelogin.com/ims/token/v3',
      {
        grant_type: 'authorization_code',
        client_id: process.env.ADOBE_CLIENT_ID,
        client_secret: process.env.ADOBE_CLIENT_SECRET,
        code
      }
    );

    const { access_token, refresh_token } = response.data;
    
    // Store tokens securely
    res.json({ success: true, access_token, refresh_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    const response = await axios.post(
      'https://ims-na1.adobelogin.com/ims/token/v3',
      {
        grant_type: 'refresh_token',
        client_id: process.env.ADOBE_CLIENT_ID,
        client_secret: process.env.ADOBE_CLIENT_SECRET,
        refresh_token
      }
    );

    res.json({ success: true, access_token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;