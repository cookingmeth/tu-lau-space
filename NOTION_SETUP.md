# Notion Database Integration Setup

This guide explains how to set up the Notion database integration for the pottery tracking system.

## Prerequisites

1. A Notion account with admin access
2. A Notion database for pottery tracking
3. Netlify account for hosting the serverless functions

## Step 1: Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Fill in the details:
   - **Name**: `Tu Lau Space Pottery Tracker`
   - **Logo**: Upload your logo (optional)
   - **Associated workspace**: Select your workspace
4. Click "Submit"
5. Copy the **Internal Integration Token** (starts with `secret_`)

## Step 2: Set Up Notion Database

Create a Notion database with the following properties:

| Property Name | Type | Description |
|---------------|------|-------------|
| **Name** | Title | Customer name (Primary field) |
| **Date** | Date | Date when pottery was created |
| **Shipping** | Select or Text | Shipping method/status |
| **# Product** | Number | Number of pottery items |
| **Status** | Select | Current status of pottery |
| **File & media** | Files & media | Photos and videos of progress |

### Status Options
Set up these status options in the Status select field:

- **pending** - Chờ xử lý
- **shaping** - Đang tạo hình
- **drying** - Đang phơi khô
- **decorating** - Đang trang trí
- **firing** - Đang nung lò
- **cooling** - Đang làm nguội
- **completed** - Hoàn thành
- **ready** - Sẵn sàng nhận

## Step 3: Share Database with Integration

1. Open your Notion database
2. Click the "Share" button (top right)
3. Click "Invite"
4. Search for your integration name: `Tu Lau Space Pottery Tracker`
5. Select it and click "Invite"
6. Copy the **Database ID** from the URL:
   ```
   https://www.notion.so/DATABASE_ID?v=...
   ```

## Step 4: Configure Environment Variables

### On Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add these variables:

```bash
NOTION_API_TOKEN=secret_your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### For Local Development:

Create a `.env` file in the root directory:

```bash
# .env
NOTION_API_TOKEN=secret_your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

**⚠️ Important**: Add `.env` to your `.gitignore` file to avoid committing secrets!

## Step 5: Test the Integration

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy to Netlify or test locally with:
   ```bash
   netlify dev
   ```

3. Test the API endpoint:
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/pottery-search \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Customer"}'
   ```

## Step 6: Add Sample Data

Add some test data to your Notion database:

| Name | Date | Shipping | # Product | Status | File & media |
|------|------|----------|-----------|--------|--------------|
| Nguyễn Văn A | 2024-01-15 | Giao hàng tận nơi | 2 | firing | [Upload pottery photos] |
| Trần Thị B | 2024-01-10 | Tự đến lấy | 1 | completed | [Upload pottery photos] |
| Lê Minh C | 2024-01-20 | Express | 3 | decorating | [Upload pottery photos] |

## Troubleshooting

### Common Issues:

1. **"Database not found" error**
   - Check if the database ID is correct
   - Verify the integration has access to the database

2. **"Unauthorized" error**
   - Check if the API token is correct
   - Verify the integration is properly configured

3. **"Property not found" error**
   - Ensure property names match exactly (case-sensitive)
   - Check the database schema

### Debug Mode:

To enable debug logging, add this environment variable:
```bash
NODE_ENV=development
```

## Security Notes

1. **Never commit API tokens** to version control
2. **Use environment variables** for all sensitive data
3. **Regularly rotate** your Notion integration tokens
4. **Limit integration permissions** to only what's needed

## API Response Format

The API returns data in this format:

```json
{
  "success": true,
  "results": [
    {
      "id": "notion-page-id",
      "date": "2024-01-15",
      "name": "Nguyễn Văn A",
      "shipping": "Giao hàng tận nơi",
      "products": 2,
      "status": "firing",
      "media": [
        {
          "name": "pottery-progress.jpg",
          "url": "https://notion-file-url...",
          "type": "image",
          "extension": "jpg"
        }
      ]
    }
  ],
  "total": 1
}
```

## Support

If you encounter issues:

1. Check the Netlify function logs
2. Verify your Notion database structure
3. Test the API endpoint directly
4. Contact the development team

---

**Created by**: Claude Code Assistant
**Last updated**: November 2024