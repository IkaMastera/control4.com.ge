import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      first_name,
      last_name,
      email,
      company_size,
      phone,
      topic,
      message,
      schedule_demo,
    } = body;

    if (!email || !first_name) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // 🔍 DEBUG: read CONTACT_TO at runtime and log it
    const envTo = process.env.CONTACT_TO;
    console.log('CONTACT_TO in /api/contact =', envTo);

    // if env missing, fall back to technicalservice
    const to = envTo && envTo.length > 0
      ? envTo
      : 'info@technicalservice.ge';

    const from =
      process.env.CONTACT_FROM ||
      'Control4 Georgia <onboarding@resend.dev>';

    const subject = `New Control4.ge inquiry – ${first_name} ${
      last_name || ''
    }`.trim();

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#020617; padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#020617;border-radius:18px;border:1px solid rgba(148,163,184,0.35);">
          <tr>
            <td style="padding:24px 28px 18px;">
              <h1 style="margin:0;font-size:20px;color:#e5e7eb;">New contact request from <span style="color:#38bdf8;">Control4.ge</span></h1>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:13px;">
                Someone filled out the contact form on the website.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 4px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:#e5e7eb;border-collapse:separate;border-spacing:0 6px;">
                <tr>
                  <td style="width:140px;color:#64748b;">Name</td>
                  <td>${first_name} ${last_name || ''}</td>
                </tr>
                <tr>
                  <td style="width:140px;color:#64748b;">Email</td>
                  <td><a href="mailto:${email}" style="color:#38bdf8;text-decoration:none;">${email}</a></td>
                </tr>
                ${
                  phone
                    ? `<tr><td style="color:#64748b;">Phone</td><td><a href="tel:${phone}" style="color:#e5e7eb;text-decoration:none;">${phone}</a></td></tr>`
                    : ''
                }
                ${
                  company_size
                    ? `<tr><td style="color:#64748b;">Company size</td><td>${company_size}</td></tr>`
                    : ''
                }
                ${
                  topic
                    ? `<tr><td style="color:#64748b;">Topic</td><td>${topic}</td></tr>`
                    : ''
                }
                <tr>
                  <td style="color:#64748b;">Schedule demo</td>
                  <td>${schedule_demo ? 'Yes ✅' : 'No'}</td>
                </tr>
              </table>
            </td>
          </tr>
          ${
            message
              ? `<tr>
                   <td style="padding:10px 28px 4px;">
                     <p style="margin:0 0 4px;color:#64748b;font-size:12px;">Message</p>
                     <div style="border-radius:12px;background:#020617;border:1px solid rgba(148,163,184,0.4);padding:12px 14px;color:#e5e7eb;font-size:13px;white-space:pre-wrap;">
                       ${message}
                     </div>
                   </td>
                 </tr>`
              : ''
          }
          <tr>
            <td style="padding:18px 28px 22px;">
              <p style="margin:0;color:#6b7280;font-size:11px;">
                Sent automatically from <span style="color:#38bdf8;">Control4.ge</span> contact form.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `;

    const result = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html,
    });

    console.log('Resend send result:', result);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}