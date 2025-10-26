"use client";

import { useState } from "react";

type Props = { compact?: boolean };

export default function ContactForm({ compact = false }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <form
      action="https://formspree.io/f/your-form-id" // TODO: replace
      method="POST"
      onSubmit={() => setSent(true)}
      className="rounded-2xl bg-[--color-surface] ring-1 ring-white/10 p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,.8)] backdrop-blur supports-[backdrop-filter]:bg-white/[0.03]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs text-white/70 mb-1">First name</span>
          <input name="firstName" required aria-required className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="John" />
        </label>
        <label className="block">
          <span className="block text-xs text-white/70 mb-1">Last name</span>
          <input name="lastName" required className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="Doe" />
        </label>

        <label className="block">
          <span className="block text-xs text-white/70 mb-1">Work email</span>
          <input type="email" name="email" required className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="block text-xs text-white/70 mb-1">Phone (optional)</span>
          <input name="phone" className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="+995 5XX XX XX XX" />
        </label>

        {!compact && (
          <>
            <label className="block sm:col-span-2">
              <span className="block text-xs text-white/70 mb-1">Company / Project</span>
              <input name="company" className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="Company or Residential Project" />
            </label>
            <label className="block sm:col-span-2">
              <span className="block text-xs text-white/70 mb-1">Message</span>
              <textarea name="message" rows={4} className="w-full rounded-lg bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[--color-accent]/60" placeholder="Tell us about your space, rooms, priorities…"/>
            </label>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-xs text-white/70">
          <input type="checkbox" name="consent" required className="h-4 w-4 rounded border-white/20 bg-white/5" />
          I agree to the Privacy Policy
        </label>

        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm text-white shadow transition-all hover:shadow-lg hover:opacity-95 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60"
        >
          Submit
        </button>
      </div>

      <p aria-live="polite" className="mt-3 text-xs text-white/70">{sent ? "Thanks—your form will be sent via Formspree." : "We’ll get back within one business day."}</p>
    </form>
  );
}