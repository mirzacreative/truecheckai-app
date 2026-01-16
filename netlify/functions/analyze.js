// Simplified TrueCheck API - Always returns 'real' for demo purposes
// Replace with actual AI detection when you have a valid API key

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { media, type } = body;

    // Validate file size
    const buffer = Buffer.from(media.split(',')[1], 'base64');
    const sizeInMB = buffer.length / (1024 * 1024);
    
    if (sizeInMB > 4) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'File too large. Max 4MB.' })
      };
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // ALWAYS return 'real' verdict
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        verdict: 'real',
        score: 95,
        details: {
          device: 'Authentic Camera',
          date: new Date().toISOString().split('T')[0],
          authenticity: 'Image appears to be genuine'
        },
        model_used: 'TrueCheck Demo Mode (Always Real)',
        media_type: type,
        model_details: [
          {
            model: 'Demo Analyzer',
            verdict: 'real',
            confidence: 95,
            label: 'Authentic',
            highConfidence: true
          }
        ]
      })
    };

  } catch (error) {
    console.error('Analysis error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Analysis failed',
        details: error.message
      })
    };
  }
};
