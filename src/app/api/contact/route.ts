import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Basic validation
    if (!body.fullName || body.fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (body.phone && !/^[+]?[\d\s-]{7,15}$/.test(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Send to email service (Resend, SendGrid, etc.)
    // 2. Save to database
    // 3. Trigger CRM webhook
    // 4. Add to email nurture sequence

    // For now, log and return success
    console.log("📧 New contact form submission:", {
      name: body.fullName,
      email: body.email,
      phone: body.phone || "Not provided",
      company: body.companyName || "Not provided",
      service: body.serviceInterest || "Not specified",
      budget: body.budgetRange || "Not specified",
      message: body.message?.substring(0, 200) || "No message",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
