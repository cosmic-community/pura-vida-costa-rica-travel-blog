import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #374151;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #059669;">
            <p style="margin: 0; color: #065f46;">
              <strong>Reply to:</strong> ${data.email}
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending notification email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send notification email' 
    };
  }
}

export async function sendContactConfirmation(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: data.email,
      subject: 'Thank you for contacting Pura Vida Costa Rica!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">¡Pura Vida!</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Thank you for reaching out</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Hi ${data.name},
            </p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Thank you for contacting Pura Vida Costa Rica! We've received your message about "${data.subject}" and we'll get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #059669;">
              <h3 style="color: #059669; margin-top: 0; font-size: 18px;">Your Message:</h3>
              <p style="color: #6b7280; line-height: 1.6; margin: 0;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              In the meantime, feel free to explore our latest blog posts about Costa Rica's amazing destinations, wildlife, and adventures!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://pura-vida-costa-rica.cosmicjs.com'}" 
                 style="display: inline-block; background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Visit Our Blog
              </a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #374151;">The Pura Vida Costa Rica Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2024 Pura Vida Costa Rica. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send confirmation email' 
    };
  }
}