import { MailService } from '@sendgrid/mail';

// Check if SendGrid API key is available
const sendgridEnabled = !!process.env.SENDGRID_API_KEY;

let mailService: MailService | null = null;

if (sendgridEnabled) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY as string);
}

interface EmailData {
  email: string;
  resultId: number;
}

export async function sendNotificationEmail(data: EmailData): Promise<boolean> {
  if (!sendgridEnabled || !mailService) {
    console.log('SendGrid is not configured. Would send email:', {
      to: "info@groeienontwikkelingscoach.nl",
      subject: `Test gemaakt door ${data.email}`,
      text: `Er is een enneagram test gemaakt door ${data.email}. Resultaat ID: ${data.resultId}`,
    });
    return true; // Pretend it worked in development
  }

  try {
    await mailService.send({
      to: "info@groeienontwikkelingscoach.nl",
      from: "noreply@enneagramtest.nl",
      subject: `Test gemaakt door ${data.email}`,
      text: `Er is een enneagram test gemaakt door ${data.email}. Resultaat ID: ${data.resultId}`,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}