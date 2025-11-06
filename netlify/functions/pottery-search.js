const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

// Notion Database ID (set this in your Netlify environment variables)
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * Netlify Function to search pottery tracking data from Notion database
 */
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { name } = JSON.parse(event.body);

    if (!name || name.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Customer name is required' }),
      };
    }

    console.log(`Searching for pottery records for customer: ${name}`);

    // Query Notion database
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Name', // Make sure this matches your Notion database property name
        title: {
          contains: name.trim(),
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    // Transform Notion data to our format
    const results = response.results.map(page => {
      const properties = page.properties;

      return {
        id: page.id,
        date: properties.Date?.date?.start || properties.Date?.created_time || null,
        name: properties.Name?.title?.[0]?.text?.content || '',
        shipping: properties.Shipping?.rich_text?.[0]?.text?.content || properties.Shipping?.select?.name || '',
        products: properties['# Product']?.number || properties.Products?.number || 1,
        status: properties.Status?.select?.name?.toLowerCase() || properties.Status?.status?.name?.toLowerCase() || 'pending',
        media: extractMediaFiles(properties['File & media'] || properties.Media || properties.Files),
        raw_properties: properties, // For debugging
      };
    });

    console.log(`Found ${results.length} records for ${name}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        results: results,
        total: results.length,
      }),
    };

  } catch (error) {
    console.error('Error searching pottery records:', error);

    // Handle specific Notion API errors
    if (error.code === 'object_not_found') {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'Database not found. Please check your configuration.',
        }),
      };
    }

    if (error.code === 'unauthorized') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: 'Unauthorized access to Notion database.',
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error while searching pottery records.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      }),
    };
  }
};

/**
 * Extract media files from Notion files property
 */
function extractMediaFiles(filesProperty) {
  if (!filesProperty || !filesProperty.files) {
    return [];
  }

  return filesProperty.files.map(file => {
    const isExternal = file.type === 'external';
    const url = isExternal ? file.external?.url : file.file?.url;
    const name = file.name || 'Untitled';

    // Determine file type based on extension
    const extension = name.split('.').pop()?.toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];

    let type = 'file';
    if (imageExtensions.includes(extension)) {
      type = 'image';
    } else if (videoExtensions.includes(extension)) {
      type = 'video';
    }

    return {
      name,
      url,
      type,
      extension,
      is_external: isExternal,
    };
  });
}

/**
 * Helper function to get text content from rich text property
 */
function getRichTextContent(richTextProperty) {
  if (!richTextProperty || !richTextProperty.rich_text) {
    return '';
  }

  return richTextProperty.rich_text
    .map(text => text.text?.content || '')
    .join('');
}

/**
 * Helper function to format date
 */
function formatDate(dateString) {
  if (!dateString) return null;

  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}