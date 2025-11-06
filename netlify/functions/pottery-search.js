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
    // Validate environment variables
    if (!DATABASE_ID) {
      console.error('NOTION_DATABASE_ID is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Database not configured',
          message: 'Please configure NOTION_DATABASE_ID in Netlify environment variables'
        }),
      };
    }

    if (!process.env.NOTION_API_TOKEN) {
      console.error('NOTION_API_TOKEN is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'API token not configured',
          message: 'Please configure NOTION_API_TOKEN in Netlify environment variables'
        }),
      };
    }

    // Parse request body
    const { name } = JSON.parse(event.body);

    if (!name || name.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Customer name is required' }),
      };
    }

    const searchName = name.trim();
    console.log(`Searching for pottery records for customer: ${searchName}`);

    // Query Notion database with case-insensitive search
    // Try multiple approaches to handle different property types and configurations
    let response;
    let searchStrategy = 'unknown';

    try {
      // Strategy 1: Filter by Name property with title type (most common)
      console.log('Strategy 1: Trying title filter...');
      response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: 'Name',
          title: {
            contains: searchName,
          },
        },
        sorts: [
          {
            property: 'Date (YYY-MM-DD)',
            direction: 'descending',
          },
        ],
      });
      searchStrategy = 'title-with-sort';
      console.log(`Strategy 1 succeeded: Found ${response.results.length} results`);
    } catch (titleError) {
      console.log('Strategy 1 failed:', titleError.message);

      try {
        // Strategy 2: Try without sorting (in case Date property doesn't exist)
        console.log('Strategy 2: Trying title filter without sorting...');
        response = await notion.databases.query({
          database_id: DATABASE_ID,
          filter: {
            property: 'Name',
            title: {
              contains: searchName,
            },
          },
        });
        searchStrategy = 'title-no-sort';
        console.log(`Strategy 2 succeeded: Found ${response.results.length} results`);
      } catch (titleError2) {
        console.log('Strategy 2 failed:', titleError2.message);

        try {
          // Strategy 3: Try rich_text type (if Name is not a title property)
          console.log('Strategy 3: Trying rich_text filter...');
          response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
              property: 'Name',
              rich_text: {
                contains: searchName,
              },
            },
          });
          searchStrategy = 'rich-text';
          console.log(`Strategy 3 succeeded: Found ${response.results.length} results`);
        } catch (richTextError) {
          console.log('Strategy 3 failed:', richTextError.message);

          // Strategy 4: Get all records and filter client-side
          console.log('Strategy 4: Fetching all records and filtering client-side...');
          response = await notion.databases.query({
            database_id: DATABASE_ID,
            page_size: 100,
          });
          searchStrategy = 'client-side-filter';
          console.log(`Strategy 4: Retrieved ${response.results.length} total records`);
        }
      }
    }

    // If we're using client-side filtering, filter the results now
    if (searchStrategy === 'client-side-filter') {
      const searchLower = searchName.toLowerCase();
      response.results = response.results.filter(page => {
        const properties = page.properties;

        // Try to get name from various property types
        const nameProperty = properties['Name'] || properties['name'] || properties['Tên'];
        if (!nameProperty) return false;

        let name = '';
        if (nameProperty.title && nameProperty.title.length > 0) {
          name = nameProperty.title[0]?.text?.content || '';
        } else if (nameProperty.rich_text && nameProperty.rich_text.length > 0) {
          name = nameProperty.rich_text[0]?.text?.content || '';
        }

        return name.toLowerCase().includes(searchLower);
      });
      console.log(`Client-side filtering resulted in ${response.results.length} matches`);
    }

    // Log the raw response for debugging (in development mode)
    if (process.env.NODE_ENV === 'development') {
      console.log('Raw Notion response:', JSON.stringify(response.results[0]?.properties, null, 2));
    }

    // Transform Notion data to our format
    const results = response.results.map(page => {
      const properties = page.properties;

      // Helper function to safely get property value
      const getProperty = (propNames, defaultValue = '') => {
        for (const propName of propNames) {
          if (properties[propName]) {
            return properties[propName];
          }
        }
        return defaultValue;
      };

      // Extract date
      const dateProperty = getProperty(['Date (YYY-MM-DD)', 'Date', 'date']);
      const date = dateProperty?.date?.start || page.created_time || null;

      // Extract name
      const nameProperty = getProperty(['Name', 'name']);
      const name = nameProperty?.title?.[0]?.text?.content || 'Unknown';

      // Extract shipping
      const shippingProperty = getProperty(['Shipping', 'shipping']);
      const shipping = shippingProperty?.rich_text?.[0]?.text?.content ||
                      shippingProperty?.select?.name ||
                      'Chưa cập nhật';

      // Extract product count
      const productProperty = getProperty(['# Product', 'Product Count', 'Products', 'products']);
      const products = productProperty?.number || 1;

      // Extract status
      const statusProperty = getProperty(['Status', 'status']);
      const status = (statusProperty?.select?.name ||
                     statusProperty?.status?.name ||
                     'pending').toLowerCase();

      // Extract workshop type
      const workshopProperty = getProperty(['LOẠI WORKSHOP', 'Workshop Type', 'workshop_type']);
      const workshop_type = workshopProperty?.select?.name ||
                           workshopProperty?.rich_text?.[0]?.text?.content ||
                           'Chưa cập nhật';

      // Extract firing status
      const firingProperty = getProperty(['Nung mốc/Phơi không nung', 'Firing Status', 'firing_status']);
      const firing_status = firingProperty?.checkbox || false;

      // Extract note
      const noteProperty = getProperty(['Note', 'note', 'Notes', 'notes']);
      const note = noteProperty?.rich_text?.[0]?.text?.content || '';

      // Extract media files
      const mediaProperty = getProperty(['Files & media', 'File & media', 'Media', 'Files', 'media', 'files']);
      const media = extractMediaFiles(mediaProperty);

      return {
        id: page.id,
        date,
        name,
        shipping,
        products,
        status,
        workshop_type,
        firing_status,
        note,
        media,
      };
    });

    console.log(`Found ${results.length} records for ${searchName} using ${searchStrategy} strategy`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        results: results,
        total: results.length,
        query: searchName,
        searchStrategy: searchStrategy,
        message: results.length === 0 ? 'Không tìm thấy kết quả phù hợp' : `Tìm thấy ${results.length} kết quả`,
      }),
    };

  } catch (error) {
    console.error('Error searching pottery records:', error);
    console.error('Error stack:', error.stack);

    // Handle specific Notion API errors
    if (error.code === 'object_not_found') {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Database not found',
          message: 'The Notion database could not be found. Please verify the NOTION_DATABASE_ID is correct and the integration has access to the database.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        }),
      };
    }

    if (error.code === 'unauthorized') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
          message: 'Cannot access Notion database. Please verify the NOTION_API_TOKEN is correct and the integration has been shared with the database.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        }),
      };
    }

    if (error.code === 'validation_error') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Validation error',
          message: 'The request to Notion API was invalid. This might be due to incorrect property names in the database.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        }),
      };
    }

    if (error.code === 'rate_limited') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Rate limited',
          message: 'Too many requests to Notion API. Please try again in a moment.',
        }),
      };
    }

    // Generic error
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while searching pottery records. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          status: error.status,
        } : undefined,
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