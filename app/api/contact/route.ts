import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification, sendContactConfirmation, type ContactFormData } from '@/lib/resend';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Send notification email to tony@cosmicjs.com
    const notificationResult = await sendContactNotification(body);
    if (!notificationResult.success) {
      console.error('Failed to send notification:', notificationResult.error);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationResult = await sendContactConfirmation(body);
    if (!confirmationResult.success) {
      console.error('Failed to send confirmation:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
      // The notification was sent successfully
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        confirmationSent: confirmationResult.success
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}