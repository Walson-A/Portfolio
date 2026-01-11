import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractères").max(50),
    email: z.string().email("Format d'email invalide"),
    subject: z.string().min(2, "Le sujet doit faire au moins 2 caractères").max(100),
    message: z.string().min(10, "Le message doit faire au moins 10 caractères").max(2000),
    // Honeypot field - should be empty!
    _honeypot: z.string().max(0, { message: "Bot detected" }).optional(),
});

export async function POST(req: Request) {
    try {
        // 1. Rate Limiting based on IP
        const ip = req.headers.get('x-forwarded-for') || 'anonymous';
        const limiter = rateLimit(ip, 3, 10 * 60 * 1000, 'contact'); // 3 messages / 10 min

        if (!limiter.success) {
            return NextResponse.json(
                { error: "Trop de messages envoyés. Veuillez patienter 10 minutes." },
                { status: 429 }
            );
        }

        const body = await req.json();

        // 2. Validation with Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = result.data;

        if (!process.env.RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY in .env.local");
            return NextResponse.json(
                { error: "Server configuration error (Missing API key)" },
                { status: 500 }
            );
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['walson.a.rene@gmail.com'],
            replyTo: email,
            subject: `[Portfolio] ${subject} - from ${name}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4FD1C5 0%, #3CBFAF 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #4FD1C5; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #4FD1C5; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">📩 Nouveau Message depuis votre Portfolio</h2>
        </div>
        <div class="content">
            <div class="info-row">
                <span class="label">👤 Nom:</span> ${name}
            </div>
            <div class="info-row">
                <span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a>
            </div>
            <div class="info-row">
                <span class="label">📝 Sujet:</span> ${subject}
            </div>
            <div class="message-box">
                <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
        </div>
    </div>
</body>
</html>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
