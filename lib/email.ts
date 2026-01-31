import { Resend } from 'resend';

const FROM_EMAIL = 'Subletly <notifications@subletly.com>';

// Lazy initialization to avoid errors when API key is not set
let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const client = getResendClient();

  // Only send emails if API key is configured
  if (!client) {
    console.log('Email not sent - RESEND_API_KEY not configured');
    console.log('Would have sent:', { to, subject });
    return null;
  }

  try {
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return null;
  }
}

// Email Templates

export async function sendNewInquiryNotification({
  landlordEmail,
  landlordName,
  renterName,
  propertyTitle,
  message,
  inquiryUrl,
}: {
  landlordEmail: string;
  landlordName: string;
  renterName: string;
  propertyTitle: string;
  message: string;
  inquiryUrl: string;
}) {
  const truncatedMessage = message.length > 200
    ? message.substring(0, 200) + '...'
    : message;

  return sendEmail({
    to: landlordEmail,
    subject: `New inquiry for ${propertyTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Inquiry Received</h1>
          </div>

          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin-top: 0;">Hi ${landlordName},</p>

            <p>You have a new inquiry from <strong>${renterName}</strong> about your property:</p>

            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #7c3aed;">${propertyTitle}</h3>
              <p style="margin-bottom: 0; color: #6b7280;">"${truncatedMessage}"</p>
            </div>

            <a href="${inquiryUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 10px;">
              View & Respond
            </a>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Respond promptly to increase your chances of securing a tenant!
            </p>
          </div>

          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Subletly - Find Your Perfect Sublet
          </p>
        </body>
      </html>
    `,
  });
}

export async function sendNewMessageNotification({
  recipientEmail,
  recipientName,
  senderName,
  propertyTitle,
  messagePreview,
  conversationUrl,
}: {
  recipientEmail: string;
  recipientName: string;
  senderName: string;
  propertyTitle: string;
  messagePreview: string;
  conversationUrl: string;
}) {
  const truncatedMessage = messagePreview.length > 150
    ? messagePreview.substring(0, 150) + '...'
    : messagePreview;

  return sendEmail({
    to: recipientEmail,
    subject: `New message from ${senderName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Message</h1>
          </div>

          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin-top: 0;">Hi ${recipientName},</p>

            <p><strong>${senderName}</strong> sent you a message about <strong>${propertyTitle}</strong>:</p>

            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="margin: 0; color: #374151;">"${truncatedMessage}"</p>
            </div>

            <a href="${conversationUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 10px;">
              View Conversation
            </a>

            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Don't keep them waiting - reply now!
            </p>
          </div>

          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Subletly - Find Your Perfect Sublet
          </p>
        </body>
      </html>
    `,
  });
}
