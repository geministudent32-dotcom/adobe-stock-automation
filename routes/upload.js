const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const axios = require('axios');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Batch upload endpoint
router.post('/batch', upload.array('images', 50), async (req, res) => {
  try {
    const { autoKeywords, category } = req.body;
    const results = [];

    for (const file of req.files) {
      // Process image
      const metadata = await sharp(file.buffer).metadata();
      
      // Generate keywords if enabled
      let keywords = [];
      if (autoKeywords === 'true') {
        keywords = await generateKeywords(file.buffer);
      }

      // Upload to Adobe Stock
      const uploadResult = await uploadToAdobeStock({
        file: file.buffer,
        filename: file.originalname,
        keywords,
        category,
        metadata
      });

      results.push(uploadResult);
    }

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Single upload endpoint
router.post('/single', upload.single('image'), async (req, res) => {
  try {
    const { title, description, keywords, category } = req.body;
    
    const result = await uploadToAdobeStock({
      file: req.file.buffer,
      filename: req.file.originalname,
      title,
      description,
      keywords: keywords.split(','),
      category
    });

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function uploadToAdobeStock(data) {
  // Adobe Stock API upload logic
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('title', data.title || data.filename);
  formData.append('keywords', data.keywords.join(','));
  
  const response = await axios.post(
    'https://stock.adobe.io/Rest/Media/1/Files',
    formData,
    {
      headers: {
        'X-API-Key': process.env.ADOBE_API_KEY,
        'X-Product': 'MySampleApp/1.0',
        'Authorization': `Bearer ${process.env.ADOBE_ACCESS_TOKEN}`
      }
    }
  );

  return response.data;
}

async function generateKeywords(imageBuffer) {
  // Use AI to generate keywords from image
  // This could integrate with Google Vision API, AWS Rekognition, etc.
  const keywords = ['photo', 'stock', 'image'];
  return keywords;
}

module.exports = router;