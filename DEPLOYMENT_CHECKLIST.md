# Pottery Search Deployment Checklist

This checklist ensures the pottery tracking search functionality is properly deployed and configured.

## ✅ Pre-Deployment Checklist

### 1. Notion Database Setup
- [ ] Notion database created with required properties
- [ ] **Name** property exists (type: Title or Rich Text)
- [ ] Database has at least one test record with a customer name
- [ ] Status select options configured (pending, firing, completed, etc.)

### 2. Notion Integration
- [ ] Notion integration created at https://www.notion.so/my-integrations
- [ ] Integration token copied (starts with `secret_`)
- [ ] Database shared with the integration (Click Share → Invite Integration)
- [ ] Database ID copied from URL (32-character string)

### 3. Netlify Environment Variables
- [ ] `NOTION_API_TOKEN` configured in Netlify
- [ ] `NOTION_DATABASE_ID` configured in Netlify
- [ ] Optional: `NODE_ENV=development` for debug logs

**To set environment variables:**
1. Go to Netlify Dashboard → Your Site
2. Settings → Environment variables
3. Add variables: NOTION_API_TOKEN and NOTION_DATABASE_ID
4. Save and redeploy

### 4. Function Dependencies
- [ ] `/netlify/functions/package.json` exists
- [ ] `@notionhq/client` dependency listed (v2.2.15 or higher)
- [ ] Functions deployed to Netlify (check Functions tab)

## 🧪 Testing Steps

### Step 1: Test Notion Connection
Visit the test endpoint to verify configuration:

```
https://tulau.netlify.app/.netlify/functions/pottery-test
```

**Expected response:**
```json
{
  "overall_status": "pass",
  "checks": [
    { "name": "NOTION_API_TOKEN", "status": "pass" },
    { "name": "Database Access", "status": "pass" },
    { "name": "Database Properties", "status": "pass", "properties": ["Name", ...] }
  ]
}
```

**If test fails:**
- ❌ "NOTION_API_TOKEN missing" → Add token to Netlify environment variables
- ❌ "Database not found" → Check DATABASE_ID or share database with integration
- ❌ "Unauthorized" → Verify API token is correct

### Step 2: Test Search Function
Test with curl or browser:

```bash
curl -X POST https://tulau.netlify.app/.netlify/functions/pottery-search \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Expected response:**
```json
{
  "success": true,
  "results": [...],
  "total": 1,
  "query": "Test",
  "searchStrategy": "title-with-sort",
  "message": "Tìm thấy 1 kết quả"
}
```

**Search strategies (from most to least preferred):**
1. `title-with-sort` - Name is Title property, sorted by date ✅ Best
2. `title-no-sort` - Name is Title property, no date sorting ✅ Good
3. `rich-text` - Name is Rich Text property ✅ Works
4. `client-side-filter` - Fallback: fetches all records and filters ⚠️ Slower

### Step 3: Test on Website
Visit: https://tulau.netlify.app/theo-doi-gom/

1. Enter a customer name from your database
2. Click "Tìm Kiếm" button
3. Should see results or "Không tìm thấy kết quả"

## 🔍 Troubleshooting

### Issue: "Không thể kết nối đến hệ thống theo dõi"

**Possible causes:**
1. Netlify functions not deployed
2. Environment variables not configured
3. Notion database not shared with integration

**Fix:**
```bash
# Check Netlify Functions tab - should show:
- pottery-search
- pottery-test

# Redeploy if needed:
git push origin main

# Or trigger manual deploy in Netlify Dashboard
```

### Issue: Search returns empty results but data exists

**Possible causes:**
1. Name property in database is different name/type
2. Customer names are in wrong property
3. Database permissions

**Fix:**
1. Check test endpoint for exact property names
2. Verify customer names are in "Name" property
3. Try searching with exact name from database

### Issue: "Property not found" errors in logs

**Fix:**
The improved search function now tries 4 different strategies:
1. Title property with sorting
2. Title property without sorting
3. Rich Text property
4. Client-side filtering (fallback)

If all strategies fail, check Netlify function logs for details.

## 📊 Viewing Logs

**Netlify Function Logs:**
1. Netlify Dashboard → Functions
2. Click on `pottery-search`
3. View real-time logs

**Look for:**
```
Strategy 1: Trying title filter...
Strategy 1 succeeded: Found 2 results
Found 2 records for John using title-with-sort strategy
```

## 🚀 Deployment

After making changes:

```bash
# 1. Commit changes
git add .
git commit -m "Fix pottery search functionality"

# 2. Push to GitHub
git push origin claude/fix-search-ui-011CUrUxEPUq6Qc4UGYAyzU4

# 3. Netlify auto-deploys from GitHub
# Check deployment status in Netlify Dashboard

# 4. Test after deployment
curl https://tulau.netlify.app/.netlify/functions/pottery-test
```

## ✨ Recent Improvements

### Enhanced Search Function (pottery-search.js)
- ✅ Multiple search strategies (4 fallback options)
- ✅ Supports both Title and Rich Text property types
- ✅ Client-side filtering as ultimate fallback
- ✅ Better error messages and debugging
- ✅ Search strategy reporting
- ✅ Comprehensive logging

### Benefits:
- More robust against different Notion database configurations
- Works even if property names vary slightly
- Gracefully handles missing sort properties
- Better debugging information

## 📝 Environment Variables Template

Add these to Netlify (Settings → Environment variables):

```bash
# Required
NOTION_API_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional (for debugging)
NODE_ENV=development
```

## 🔐 Security Notes

- ✅ Never commit .env files
- ✅ Use Netlify environment variables for secrets
- ✅ Rotate Notion tokens regularly
- ✅ Limit integration permissions

## 📞 Support

If issues persist:
1. Check all items in this checklist
2. Review Netlify function logs
3. Test the test endpoint first
4. Verify Notion database permissions

---

**Last Updated:** November 2024
**Improved Search Version:** v2.0

## 🔄 Deployment Status

### Latest Changes (Commit History)
1. ✅ Enhanced pottery search with multi-strategy fallback system
2. ✅ Fixed JavaScript DOM error: addEventListener on null element

Both commits are required for full functionality. Ensure both are merged and deployed to Netlify.
