# Adobe Stock Contributor Automation

Automate your Adobe Stock contributor workflow with batch uploads, performance tracking, and keyword optimization.

## Features

### 🚀 Batch Upload
- Upload multiple images at once
- Auto-generate titles and descriptions
- AI-powered keyword suggestions
- Organize by category

### 📊 Performance Analytics
- Track earnings and downloads
- Identify top-performing content
- Monitor approval rates
- Daily/weekly/monthly reports

### 🔍 Keyword Optimization
- AI-generated keyword suggestions
- Trending keyword discovery
- Bulk keyword updates
- Competitor analysis

### 🔔 Notifications
- Sales alerts
- Approval/rejection notifications
- Milestone achievements
- Daily summary emails

## Setup

### Prerequisites
- Node.js 18+
- Adobe Stock Contributor account
- Adobe API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/geministudent32-dotcom/adobe-stock-automation.git
cd adobe-stock-automation
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your Adobe API credentials
```

4. Start the server:
```bash
npm run dev
```

## Adobe API Setup

1. Go to [Adobe Developer Console](https://developer.adobe.com/console)
2. Create a new project
3. Add Adobe Stock API
4. Get your API Key, Client ID, and Client Secret
5. Add them to your `.env` file

## API Endpoints

### Upload
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/batch` - Batch upload images

### Analytics
- `GET /api/analytics/earnings` - Get earnings summary
- `GET /api/analytics/downloads` - Get download stats
- `GET /api/analytics/top-content` - Get top performing content

### Keywords
- `POST /api/keywords/suggest` - Get keyword suggestions
- `GET /api/keywords/trending` - Get trending keywords
- `PUT /api/keywords/bulk-update` - Update keywords in bulk

### Authentication
- `GET /api/auth/adobe/callback` - Adobe OAuth callback
- `POST /api/auth/refresh` - Refresh access token

## Scheduled Tasks

The app runs automated tasks:
- **Daily (9 AM)**: Sync analytics data
- **Every 6 hours**: Check for new sales

## Deployment

### Railway
```bash
railway login
railway init
railway up
```

### Vercel
```bash
vercel --prod
```

## Contributing

Pull requests welcome! Please read CONTRIBUTING.md first.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, open a GitHub issue or contact support@example.com