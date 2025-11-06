const { Client } = require('@notionhq/client');

/**
 * Netlify Function to test Notion database connection and configuration
 * This endpoint helps diagnose issues with the Notion integration
 */
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use GET.' }),
    };
  }

  const results = {
    timestamp: new Date().toISOString(),
    checks: [],
    overall_status: 'unknown',
  };

  // Check 1: Environment variables
  const hasApiToken = !!process.env.NOTION_API_TOKEN;
  const hasDatabaseId = !!process.env.NOTION_DATABASE_ID;

  results.checks.push({
    name: 'NOTION_API_TOKEN',
    status: hasApiToken ? 'pass' : 'fail',
    message: hasApiToken
      ? 'API token is configured'
      : 'API token is missing. Please set NOTION_API_TOKEN environment variable.',
  });

  results.checks.push({
    name: 'NOTION_DATABASE_ID',
    status: hasDatabaseId ? 'pass' : 'fail',
    message: hasDatabaseId
      ? 'Database ID is configured'
      : 'Database ID is missing. Please set NOTION_DATABASE_ID environment variable.',
  });

  if (!hasApiToken || !hasDatabaseId) {
    results.overall_status = 'fail';
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results),
    };
  }

  // Check 2: Initialize Notion client
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_TOKEN,
    });

    results.checks.push({
      name: 'Notion Client',
      status: 'pass',
      message: 'Notion client initialized successfully',
    });

    // Check 3: Test database access
    try {
      const response = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID,
      });

      results.checks.push({
        name: 'Database Access',
        status: 'pass',
        message: 'Successfully connected to Notion database',
        database_title: response.title?.[0]?.plain_text || 'Untitled',
      });

      // Check 4: List database properties
      const properties = Object.keys(response.properties || {});
      results.checks.push({
        name: 'Database Properties',
        status: 'pass',
        message: `Found ${properties.length} properties`,
        properties: properties,
      });

      // Check 5: Test query (get first 3 records)
      try {
        const queryResponse = await notion.databases.query({
          database_id: process.env.NOTION_DATABASE_ID,
          page_size: 3,
        });

        results.checks.push({
          name: 'Database Query',
          status: 'pass',
          message: `Successfully queried database`,
          total_records: queryResponse.results.length,
          has_more: queryResponse.has_more,
        });

        // Show sample data structure if records exist
        if (queryResponse.results.length > 0) {
          const sampleRecord = queryResponse.results[0];
          const sampleProperties = {};

          for (const [key, value] of Object.entries(sampleRecord.properties)) {
            sampleProperties[key] = {
              type: value.type,
              id: value.id,
            };
          }

          results.checks.push({
            name: 'Sample Record Structure',
            status: 'info',
            message: 'First record property types',
            sample_properties: sampleProperties,
          });
        }

        results.overall_status = 'pass';

      } catch (queryError) {
        results.checks.push({
          name: 'Database Query',
          status: 'fail',
          message: 'Failed to query database',
          error: queryError.message,
          code: queryError.code,
        });
        results.overall_status = 'partial';
      }

    } catch (dbError) {
      results.checks.push({
        name: 'Database Access',
        status: 'fail',
        message: 'Failed to access database',
        error: dbError.message,
        code: dbError.code,
        hint: dbError.code === 'object_not_found'
          ? 'Database not found. Check NOTION_DATABASE_ID or share the database with the integration.'
          : dbError.code === 'unauthorized'
          ? 'Unauthorized. Check NOTION_API_TOKEN or share the database with the integration.'
          : 'Unknown error. Check Netlify function logs for details.',
      });
      results.overall_status = 'fail';
    }

  } catch (clientError) {
    results.checks.push({
      name: 'Notion Client',
      status: 'fail',
      message: 'Failed to initialize Notion client',
      error: clientError.message,
    });
    results.overall_status = 'fail';
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(results, null, 2),
  };
};
