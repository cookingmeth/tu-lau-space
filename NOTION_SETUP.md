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

### 5.1 Install Dependencies

```bash
npm install
```

### 5.2 Test Configuration (Recommended First Step)

Test that your Notion integration is set up correctly:

```bash
# Visit the test endpoint in your browser or use curl
curl https://your-site.netlify.app/.netlify/functions/pottery-test

# Or for local testing:
netlify dev
# Then visit: http://localhost:8888/.netlify/functions/pottery-test
```

This test endpoint will check:
- ✓ Environment variables are configured
- ✓ Notion client can connect
- ✓ Database is accessible
- ✓ Database properties are correct
- ✓ Query functionality works

### 5.3 Test Search Functionality

Once the configuration test passes, test the search endpoint:

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/pottery-search \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Customer"}'
```

Or visit the tracking page directly: `https://your-site.netlify.app/theo-doi-gom/`

## Step 6: Add Sample Data

Add some test data to your Notion database:

| Name | Date | Shipping | # Product | Status | File & media |
|------|------|----------|-----------|--------|--------------|
| Nguyễn Văn A | 2024-01-15 | Giao hàng tận nơi | 2 | firing | [Upload pottery photos] |
| Trần Thị B | 2024-01-10 | Tự đến lấy | 1 | completed | [Upload pottery photos] |
| Lê Minh C | 2024-01-20 | Express | 3 | decorating | [Upload pottery photos] |

## Troubleshooting

### Step 1: Run the Test Endpoint

Always start by running the test endpoint to diagnose issues:

```bash
curl https://your-site.netlify.app/.netlify/functions/pottery-test
```

The test endpoint will tell you exactly what's wrong:
- Missing environment variables
- Incorrect API token
- Database not shared with integration
- Wrong database ID
- Property name mismatches

### Common Issues:

1. **"Database not found" error**
   - **Check database ID**: Make sure NOTION_DATABASE_ID is the correct 32-character ID from your database URL
   - **Share database**: Open your Notion database → Click "Share" → Invite your integration
   - **Verify in test endpoint**: The test endpoint will confirm if the database is accessible

2. **"Unauthorized" error**
   - **Check API token**: Verify NOTION_API_TOKEN starts with `secret_` and is from your integration page
   - **Create new token**: If unsure, create a new integration at https://www.notion.so/my-integrations
   - **Share database**: Make sure the database is shared with your integration (not just the page)

3. **"Property not found" error or empty results**
   - **Check property names**: Use the test endpoint to see exact property names in your database
   - **Case sensitivity**: Property names are case-sensitive ("Name" ≠ "name")
   - **Property types**: Make sure "Name" is a Title property, not Text
   - Run the test endpoint and check the "Sample Record Structure" section

4. **Search returns no results but data exists**
   - **Check Name property**: Ensure customer names are in the "Name" title property
   - **Partial matching**: The search uses "contains", so partial names should work
   - **Test with exact match**: Try searching with the exact name from your database

### Debug Mode:

To enable detailed debug logging, add this environment variable:

```bash
NODE_ENV=development
```

This will show:
- Raw Notion API responses
- Detailed error messages
- Property mapping debug info

### Viewing Netlify Function Logs:

1. Go to Netlify dashboard → Your site → Functions
2. Click on the function name (pottery-search or pottery-test)
3. View real-time logs to see errors and debug messages

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