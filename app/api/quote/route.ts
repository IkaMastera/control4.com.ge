import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getOffer, formatUsd, type Needs } from "@/lib/calculator/package-engine";
import type { PackageTier } from "@/data/pricing-packages";

type QuotePayload = {
  name: string;
  phone: string;
  email?: string;
  note?: string;
  areaSqm: number;
  tier: PackageTier;
  recommendedTier: PackageTier;
  needs: Needs;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function needsToBullets(needs: Needs) {
  const items: string[] = [];
  if (needs.dimmableLighting) items.push("Dimmable lighting");
  if (needs.touchPanel) items.push("Touch panel");
  if (needs.audioForTv) items.push("Audio for TV");
  if (needs.smartLock) items.push("Smart door lock integration");
  if (needs.curtainControl) items.push("Curtain control");
  if (needs.sensorsOrVoice) items.push("Sensors / voice integration");
  return items.length ? items : ["No extra options selected"];
}

async function sendWhatsAppCloudMessage(opts: {
  toPhoneE164: string; // e.g. 9955xxxxxxx
  phoneNumberId: string;
  token: string;
  text: string;
}) {
  const { toPhoneE164, phoneNumberId, token, text } = opts;

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: toPhoneE164,
        type: "text",
        text: { body: text },
      }),
    }
  );

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`WhatsApp API failed: ${res.status} ${msg}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as QuotePayload;

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const areaSqm = Number(body.areaSqm || 0);
    const tier = body.tier;

    if (!name || !phone || !Number.isFinite(areaSqm) || areaSqm <= 0) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { offer } = getOffer(tier, areaSqm);
    const included = offer.included;
    const budget = offer.usdBudget;

    // ✅ Use YOUR env names
    const toEmail = process.env.CONTACT_TO;
    const fromEmail = process.env.CONTACT_FROM;
    const resendKey = process.env.RESEND_API_KEY;

    if (!toEmail || !fromEmail || !resendKey) {
      return NextResponse.json(
        { ok: false, error: "Email not configured on server." },
        { status: 500 }
      );
    }

    const needsList = needsToBullets(body.needs);
    const safeNote = escapeHtml((body.note || "").trim());
    const safeEmail = escapeHtml((body.email || "").trim());

    const subject = `New Control4 Calculator Lead — ${name} — ${areaSqm}m² — ${tier.toUpperCase()}`;

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; background:#0D1117; color:#F9FAFB; padding:24px; border-radius:14px;">
        <h2 style="margin:0 0 8px 0;">New Calculator Request</h2>
        <p style="margin:0 0 18px 0; color:rgba(249,250,251,0.75);">
          A user submitted the smart-home package calculator form.
        </p>

        <div style="background:#111827; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; margin-bottom:14px;">
          <div><b>Name:</b> ${escapeHtml(name)}</div>
          <div><b>Phone:</b> ${escapeHtml(phone)}</div>
          ${
            safeEmail
              ? `<div><b>Email:</b> ${safeEmail}</div>`
              : `<div><b>Email:</b> (not provided)</div>`
          }
          <div><b>Area:</b> ${areaSqm} m²</div>
          <div><b>Selected package:</b> ${escapeHtml(tier.toUpperCase())}</div>
          <div><b>Recommended package:</b> ${escapeHtml(
            body.recommendedTier.toUpperCase()
          )}</div>
          <div><b>Estimated budget:</b> ${escapeHtml(formatUsd(budget))}</div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr; gap:12px;">
          <div style="background:#0B1220; border:1px solid rgba(0,194,255,0.20); border-radius:12px; padding:14px;">
            <div style="font-weight:600; margin-bottom:8px;">Selected needs</div>
            <ul style="margin:0; padding-left:18px; color:rgba(249,250,251,0.8);">
              ${needsList.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}
            </ul>
          </div>

          <div style="background:#0B1220; border:1px solid rgba(0,194,255,0.20); border-radius:12px; padding:14px;">
            <div style="font-weight:600; margin-bottom:8px;">Included systems</div>
            <ul style="margin:0; padding-left:18px; color:rgba(249,250,251,0.8);">
              ${included.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
            </ul>
          </div>

          ${
            safeNote
              ? `<div style="background:#111827; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:14px;">
                  <div style="font-weight:600; margin-bottom:6px;">Client note</div>
                  <div style="color:rgba(249,250,251,0.8); white-space:pre-wrap;">${safeNote}</div>
                </div>`
              : ""
          }
        </div>

        <p style="margin:18px 0 0 0; font-size:12px; color:rgba(249,250,251,0.55);">
          Sent from Control4.com.ge calculator.
        </p>
      </div>
    `;

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
      replyTo: body.email?.trim() || undefined,
    });

    // Optional WhatsApp notify (only if configured)
    const waToken = process.env.WHATSAPP_TOKEN;
    const waPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const waTo = process.env.WHATSAPP_TO_PHONE; // e.g. 9955xxxxxxx

    if (waToken && waPhoneNumberId && waTo) {
      const text =
        `New Control4 lead:\n` +
        `${name}\n` +
        `${phone}\n` +
        `${areaSqm} m² · ${tier.toUpperCase()}\n` +
        `Budget: ${formatUsd(budget)}`;

      await sendWhatsAppCloudMessage({
        token: waToken,
        phoneNumberId: waPhoneNumberId,
        toPhoneE164: waTo,
        text,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}