import fs from 'fs';
import path from 'path';

const resultsFile = path.join(process.cwd(), 'results.json');

function loadResults() {
  try {
    if (fs.existsSync(resultsFile)) {
      const data = fs.readFileSync(resultsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error loading results:', e);
  }
  return [];
}

function saveResults(results) {
  try {
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  } catch (e) {
    console.error('Error saving results:', e);
  }
}

let results = loadResults();
let nextId = results.length > 0 ? Math.max(...results.map(r => r.id)) + 1 : 1;

function storeEmail(email, resultId) {
  const timestamp = new Date().toISOString();
  const entry = `${timestamp} - Email: ${email}, ResultID: ${resultId}\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), 'emails.txt'), entry);
    return true;
  } catch (error) {
    console.error('Error storing email:', error);
    return false;
  }
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
        created_at: new Date()
      };
      results.push(result);
      saveResults(results);
      if (email) {
        storeEmail(email, result.id);
      }
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error saving result:', error);
      return res.status(500).json({ error: 'Failed to save result' });
    }
  } else if (req.method === 'GET') {
    results = loadResults();
    const { id } = req.query;
    if (id) {
      const resultId = parseInt(id, 10);
      const result = results.find(r => r.id === resultId);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ error: 'Result not found' });
      }
    }
    return res.status(200).json(results);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}