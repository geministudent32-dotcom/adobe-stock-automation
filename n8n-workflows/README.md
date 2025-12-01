# n8n Workflows for Adobe Stock Automation

## Available Workflows

### 1. Batch Upload (`adobe-batch-upload.json`)
**Purpose**: Upload multiple images with AI-generated keywords

**Features**:
- Webhook trigger for file uploads
- Google Vision API for automatic keyword generation
- Metadata formatting
- Direct upload to Adobe Stock

**Setup**:
1. Import workflow into n8n
2. Configure Adobe Stock credentials (API Key + Bearer Token)
3. Configure Google Vision API credentials
4. Activate workflow
5. Use webhook URL to upload files

---

### 2. Daily Analytics Sync (`adobe-analytics-sync.json`)
**Purpose**: Automatically sync analytics data every day at 9 AM

**Features**:
- Fetches profile data, content stats, and top performers
- Saves to database for historical tracking
- Sends daily email report

**Setup**:
1. Import workflow into n8n
2. Configure Adobe Stock credentials
3. Configure database connection (PostgreSQL)
4. Configure email credentials
5. Update email recipient
6. Activate workflow

---

### 3. Sales Notifications (`adobe-sales-notifications.json`)
**Purpose**: Get notified every 6 hours when you make new sales

**Features**:
- Checks for new sales every 6 hours
- Sends notifications via Email, Slack, and Discord
- Shows sale count and total earnings

**Setup**:
1. Import workflow into n8n
2. Configure Adobe Stock credentials
3. Configure notification channels:
   - Email (SMTP)
   - Slack (webhook or OAuth)
   - Discord (webhook)
4. Activate workflow

---

### 4. Keyword Optimizer (`adobe-keyword-optimizer.json`)
**Purpose**: Automatically optimize keywords for low-performing content

**Features**:
- Identifies content with low downloads
- Uses GPT-4 to generate better keywords
- Updates content automatically

**Setup**:
1. Import workflow into n8n
2. Configure Adobe Stock credentials
3. Configure OpenAI API key
4. Activate workflow
5. Trigger via webhook or schedule

---

## How to Import Workflows

### Method 1: Via n8n UI
1. Open your n8n instance
2. Click "Workflows" → "Import from File"
3. Select the JSON file
4. Configure credentials
5. Activate workflow

### Method 2: Via n8n CLI
```bash
n8n import:workflow --input=./adobe-batch-upload.json
n8n import:workflow --input=./adobe-analytics-sync.json
n8n import:workflow --input=./adobe-sales-notifications.json
n8n import:workflow --input=./adobe-keyword-optimizer.json
```

---

## Required Credentials

### Adobe Stock API
- **API Key**: Get from Adobe Developer Console
- **Access Token**: OAuth 2.0 Bearer Token
- **Endpoint**: `https://stock.adobe.io/Rest/`

### Google Vision API (for keyword generation)
- **API Key** or **Service Account JSON**
- Enable Vision API in Google Cloud Console

### OpenAI API (for keyword optimization)
- **API Key**: Get from OpenAI platform
- Model: GPT-4 or GPT-3.5-turbo

### Email (for notifications)
- **SMTP Host**: e.g., smtp.gmail.com
- **Port**: 587 (TLS) or 465 (SSL)
- **Username & Password**: Your email credentials

### Slack (optional)
- **Webhook URL** or **OAuth Token**

### Discord (optional)
- **Webhook URL**

---

## Workflow Customization

### Change Schedule Times
Edit the cron expression in Schedule nodes:
- Daily at 9 AM: `0 9 * * *`
- Every 6 hours: `0 */6 * * *`
- Every hour: `0 * * * *`

### Modify Notification Channels
Add/remove notification nodes in the sales workflow:
- Email
- Slack
- Discord
- Telegram
- SMS (Twilio)

### Adjust Performance Thresholds
In keyword optimizer, change the download threshold:
```javascript
"value2": 10  // Change to your preferred minimum downloads
```

---

## Troubleshooting

### Workflow Not Triggering
- Check if workflow is activated (toggle in top-right)
- Verify cron expression is valid
- Check n8n logs for errors

### Authentication Errors
- Verify API credentials are correct
- Check if tokens have expired (refresh if needed)
- Ensure proper scopes/permissions

### No Data Returned
- Test Adobe Stock API credentials manually
- Check if your account has content uploaded
- Verify API endpoint URLs are correct

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/geministudent32-dotcom/adobe-stock-automation/issues
- n8n Community: https://community.n8n.io
- Adobe Stock API Docs: https://developer.adobe.com/stock/docs/