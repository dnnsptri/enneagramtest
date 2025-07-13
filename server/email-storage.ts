import fs from 'fs';
import path from 'path';

const EMAIL_FILE_PATH = path.join(process.cwd(), 'emails.txt');
const FALLBACK_EMAIL_PATH = path.join(process.cwd(), 'emails_backup.txt');

// Functie om e-mail op te slaan
export async function storeEmail(email: string, resultId: number): Promise<boolean> {
  if (!email || typeof email !== 'string') {
    console.error('Invalid email format provided:', email);
    return false;
  }

  try {
    // Controleer of het emailadres een geldige indeling heeft
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return false;
    }

    const timestamp = new Date().toISOString();
    const entry = `${timestamp}: ${email} (Resultaat ID: ${resultId})\n`;
    
    // Zorg ervoor dat de directory bestaat
    const dir = path.dirname(EMAIL_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Append naar het bestand (creëert het bestand als het niet bestaat)
    fs.appendFileSync(EMAIL_FILE_PATH, entry);
    
    console.log(`E-mail succesvol opgeslagen: ${email} voor resultaat ${resultId}`);
    return true;
  } catch (error) {
    console.error('Fout bij opslaan e-mail:', error);
    
    // Fallback: probeer op te slaan in een alternatief bestand
    try {
      const timestamp = new Date().toISOString();
      const entry = `${timestamp}: ${email} (Resultaat ID: ${resultId}) [FALLBACK]\n`;
      fs.appendFileSync(FALLBACK_EMAIL_PATH, entry);
      console.log(`E-mail opgeslagen in fallback bestand: ${email}`);
      return true;
    } catch (fallbackError) {
      console.error('Fallback e-mail opslag mislukt:', fallbackError);
      return false;
    }
  }
}

// Functie om alle opgeslagen e-mails te lezen
export function getStoredEmails(): string[] {
  const emails: string[] = [];
  
  try {
    // Probeer primair email bestand te lezen
    if (fs.existsSync(EMAIL_FILE_PATH)) {
      const content = fs.readFileSync(EMAIL_FILE_PATH, 'utf-8');
      emails.push(...content.split('\n').filter(line => line.trim() !== ''));
    }
    
    // Probeer fallback email bestand te lezen indien het bestaat
    if (fs.existsSync(FALLBACK_EMAIL_PATH)) {
      const fallbackContent = fs.readFileSync(FALLBACK_EMAIL_PATH, 'utf-8');
      emails.push(...fallbackContent.split('\n').filter(line => line.trim() !== ''));
    }
    
    return emails;
  } catch (error) {
    console.error('Fout bij lezen e-mails:', error);
    return [];
  }
}