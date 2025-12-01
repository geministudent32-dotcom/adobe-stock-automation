const express = require('express');
const router = express.Router();
const axios = require('axios');

// Generate keyword suggestions
router.post('/suggest', async (req, res) => {
  try {
    const { imageUrl, existingKeywords } = req.body;
    
    // Use AI to analyze image and suggest keywords
    const suggestions = await analyzeImageForKeywords(imageUrl);
    
    // Filter out existing keywords
    const newSuggestions = suggestions.filter(
      kw => !existingKeywords.includes(kw)
    );

    res.json({ success: true, suggestions: newSuggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trending keywords
router.get('/trending', async (req, res) => {
  try {
    const { category } = req.query;
    
    // Fetch trending keywords from Adobe Stock
    const trending = [
      'artificial intelligence',
      'sustainability',
      'remote work',
      'digital transformation',
      'wellness'
    ];

    res.json({ success: true, keywords: trending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk update keywords
router.put('/bulk-update', async (req, res) => {
  try {
    const { contentIds, keywords } = req.body;
    const results = [];

    for (const contentId of contentIds) {
      const result = await updateContentKeywords(contentId, keywords);
      results.push(result);
    }

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function analyzeImageForKeywords(imageUrl) {
  // Placeholder for AI-based keyword generation
  // Integrate with Google Vision, AWS Rekognition, or custom ML model
  return ['photo', 'stock', 'professional', 'business'];
}

async function updateContentKeywords(contentId, keywords) {
  const response = await axios.put(
    `https://stock.adobe.io/Rest/Libraries/1/Content/${contentId}`,
    { keywords: keywords.join(',') },
    {
      headers: {
        'X-API-Key': process.env.ADOBE_API_KEY,
        'Authorization': `Bearer ${process.env.ADOBE_ACCESS_TOKEN}`
      }
    }
  );
  return response.data;
}

module.exports = router;