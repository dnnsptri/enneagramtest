import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, resultId } = req.body;
      
      // Uitgebreide validatie
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'E-mailadres is vereist' });
      }
      
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Ongeldig e-mailadres formaat' });
      }
      
      if (!resultId) {
        return res.status(400).json({ error: 'Resultaat ID is vereist' });
      }
      
      // E-mail opslaan in een bestand - controleren op succes
      const stored = storeEmail(email, resultId);
      
      if (!stored) {
        console.error('Failed to store email, but continuing with response');
      }
      
      // Log de operatie voor debug doeleinden
      console.log(`Email stored: ${email} for result ID: ${resultId}, success: ${stored}`);
      
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
  const EMAIL_FILE_PATH = path.join(process.cwd(), 'emails.txt');
  const timestamp = new Date().toISOString();
  const entry = `${timestamp}: ${email} (Resultaat ID: ${resultId})\n`;
  
  try {
    // Controleer of de map bestaat, anders maken
    const dir = path.dirname(EMAIL_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Schrijf naar een tekstbestand
    fs.appendFileSync(EMAIL_FILE_PATH, entry);
    console.log(`Email successfully stored: ${email}`);
    return true;
  } catch (error) {
    console.error('Error storing email:', error);
    
    // Fallback methode proberen in het geval van fouten
    try {
      const tempPath = path.join(process.cwd(), 'temp_emails.txt');
      fs.appendFileSync(tempPath, entry);
      console.log(`Email stored to fallback location: ${tempPath}`);
      return true;
    } catch (fallbackError) {
      console.error('Even fallback storage failed:', fallbackError);
      return false;
    }
  }
}