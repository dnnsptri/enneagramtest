import fs from 'fs';
import path from 'path';

// Simuleer een database met lokale opslag
let results = [];
let nextId = 1;

// Functie om een e-mail op te slaan
function storeEmail(email, resultId) {
  const timestamp = new Date().toISOString();
  const entry = `${timestamp} - Email: ${email}, ResultID: ${resultId}\n`;
  
  // Schrijf naar een tekstbestand
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
      
      // Maak nieuw resultaat
      const result = {
        id: nextId++,
        scores,
        primaryType,
        secondaryType,
        tertiaryType,
        created_at: new Date()
      };
      
      // Sla resultaat op
      results.push(result);
      
      // Als er een e-mail is, sla die op
      if (email) {
        storeEmail(email, result.id);
      }
      
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error saving result:', error);
      return res.status(500).json({ error: 'Failed to save result' });
    }
  } else if (req.method === 'GET') {
    // Haal een specifiek resultaat op basis van ID
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
    
    // Geef alle resultaten terug (normaal zou je dit beperken)
    return res.status(200).json(results);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}