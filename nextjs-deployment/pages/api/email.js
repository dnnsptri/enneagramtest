import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, resultId } = req.body;
      
      // Validatie
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Ongeldig e-mailadres' });
      }
      
      // E-mail opslaan in een bestand
      storeEmail(email, resultId);
      
      // Hier zou je een SendGrid of andere mailing API kunnen gebruiken
      // om een e-mail te versturen naar de gebruiker
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing email:', error);
      return res.status(500).json({ error: 'Interne serverfout' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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