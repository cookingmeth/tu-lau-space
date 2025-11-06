# Netlify Functions for Tu Lau Space

This directory contains serverless functions that power the pottery tracking system using Notion as a database.

## Available Functions

### 1. pottery-search

**Endpoint**: `POST /.netlify/functions/pottery-search`

Searches the Notion database for pottery tracking records by customer name.

**Request**:
```json
{
  "name": "Nguyễn Văn A"
}
```

**Response**:
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
      "workshop_type": "Workshop cơ bản",
      "firing_status": true,
      "note": "Khách yêu cầu nung chậm",
      "media": [
        {
          "name": "progress-1.jpg",
          "url": "https://...",
          "type": "image",
          "extension": "jpg"
        }
      ]
    }
  ],
  "total": 1,
  "query": "Nguyễn Văn A"
}
```

**Features**:
- Case-insensitive search
- Partial name matching
- Comprehensive error handling
- Support for multiple property name variations
- Automatic fallback if sorting fails
- **NEW:** Multi-strategy search with 4 fallback options:
  1. Title property with date sorting (fastest)
  2. Title property without sorting
  3. Rich Text property filtering
  4. Client-side filtering (most compatible)

### 2. pottery-test

**Endpoint**: `GET /.netlify/functions/pottery-test`

Tests and verifies the Notion integration configuration.

**Response**:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "checks": [
    {
      "name": "NOTION_API_TOKEN",
      "status": "pass",
      "message": "API token is configured"
    },
    {
      "name": "Database Access",
      "status": "pass",
      "message": "Successfully connected to Notion database",
      "database_title": "Pottery Tracking"
    },
    {
      "name": "Database Properties",
      "status": "pass",
      "message": "Found 8 properties",
      "properties": ["Name", "Date (YYY-MM-DD)", "Status", "..."]
    }
  ],
  "overall_status": "pass"
}
```

**What it checks**:
- ✓ Environment variables are set
- ✓ Notion API token is valid
- ✓ Database is accessible
- ✓ Database properties are correct
- ✓ Query functionality works
- ✓ Shows sample record structure

## Environment Variables

Required environment variables (set in Netlify dashboard):

```bash
NOTION_API_TOKEN=secret_...
NOTION_DATABASE_ID=...
NODE_ENV=development  # Optional, for debug logging
```

## Development

### Local Testing

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   NOTION_API_TOKEN=secret_your_token_here
   NOTION_DATABASE_ID=your_database_id_here
   NODE_ENV=development
   ```

3. Run locally:
   ```bash
   netlify dev
   ```

4. Test the endpoints:
   ```bash
   # Test configuration
   curl http://localhost:8888/.netlify/functions/pottery-test

   # Test search
   curl -X POST http://localhost:8888/.netlify/functions/pottery-search \
     -H "Content-Type: application/json" \
     -d '{"name": "Test"}'
   ```

### Adding New Functions

1. Create a new `.js` file in this directory
2. Export a `handler` function:
   ```javascript
   exports.handler = async (event, context) => {
     return {
       statusCode: 200,
       body: JSON.stringify({ message: "Hello" }),
     };
   };
   ```

3. Deploy to Netlify (functions are automatically deployed)

## Error Handling

All functions return detailed error messages with appropriate HTTP status codes:

- `400`: Bad request (e.g., missing customer name)
- `401`: Unauthorized (invalid Notion API token)
- `404`: Not found (database doesn't exist)
- `429`: Rate limited (too many requests to Notion)
- `500`: Internal server error

Errors include helpful messages in production and detailed debug info in development mode.

## Database Schema

Expected Notion database properties:

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| Name | Title | Yes | Customer name (searchable) |
| Date (YYY-MM-DD) | Date | No | Creation date |
| Status | Select | No | Current status |
| # Product | Number | No | Product count |
| Shipping | Select/Text | No | Shipping method |
| LOẠI WORKSHOP | Select/Text | No | Workshop type |
| Nung mốc/Phơi không nung | Checkbox | No | Firing status |
| Note | Text | No | Additional notes |
| Files & media | Files | No | Photos and videos |

The functions support multiple property name variations to accommodate different database setups.

## Troubleshooting

### Function not working?

1. **Run the test endpoint first**: `/.netlify/functions/pottery-test`
2. **Check Netlify function logs**: Dashboard → Functions → View logs
3. **Verify environment variables**: Dashboard → Site settings → Environment variables
4. **Check Notion database**: Ensure it's shared with your integration

### Common issues:

- **"Database not found"**: Database not shared with integration
- **"Unauthorized"**: Wrong API token or not configured
- **Empty results**: Check property names in your database
- **CORS errors**: Functions already include CORS headers

## Documentation

For complete setup instructions, see: [NOTION_SETUP.md](../../NOTION_SETUP.md)

## Support

If you encounter issues:
1. Check the test endpoint output
2. Review Netlify function logs
3. Verify Notion database setup
4. Check environment variables

---

**Last updated**: November 2024
