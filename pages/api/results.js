// In-memory storage for Vercel serverless environment
// Note: Results persist only during the function's lifetime
let results = [];
let nextId = 1;
let emails = [];

function storeEmail(email, resultId) {
  const timestamp = new Date().toISOString();
  emails.push({ timestamp, email, resultId });
  console.log(`Email stored: ${email} for result ${resultId}`);
  return true;
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { scores, primaryType, secondaryType, tertiaryType, email } = req.body;
      if (!scores || !primaryType) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const result = {
        id: nextId++,
        scores,
        primaryType,
        secondaryType,
        tertiaryType,
        created_at: new Date().toISOString()
      };
      results.push(result);
      
      if (email) {
        storeEmail(email, result.id);
      }
      
      console.log(`Result ${result.id} created successfully`);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error saving result:', error);
      return res.status(500).json({ error: 'Failed to save result' });
    }
  } else if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const resultId = parseInt(id, 10);
      const result = results.find(r => r.id === resultId);
      if (result) {
        console.log(`Result ${resultId} found`);
        return res.status(200).json(result);
      } else {
        console.log(`Result ${resultId} not found. Available results: ${results.length}`);
        return res.status(404).json({ 
          error: 'Result not found',
          message: 'Result not found. Please complete the test again to generate new results.'
        });
      }
    }
    return res.status(200).json(results);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}