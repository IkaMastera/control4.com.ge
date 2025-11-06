import type { Metadata } from 'next';
import ContactHalo from '@/components/sections/contact/contact-halo';
import ContactFormCard from '@/components/sections/contact/contact-form-card';

export const metadata: Metadata = {
  title: 'Contact Us | Control4 Georgia',
  description:
    'Talk to a Control4 specialist in Georgia. Get a consultation for smart lighting, audio, climate, and security.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="text-white relative">
      <ContactHalo />

      {/* Header copy (staggered rise-in) */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60 motion-safe:animate-[c4-rise-in_600ms_cubic-bezier(0.22,0.8,0.2,1)_60ms_both]">
          CONTACT
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold motion-safe:animate-[c4-rise-in_680ms_cubic-bezier(0.22,0.8,0.2,1)_120ms_both]">
          Get in touch
        </h1>
        <p className="mt-4 text-white/75 text-base sm:text-lg motion-safe:animate-[c4-rise-in_720ms_cubic-bezier(0.22,0.8,0.2,1)_180ms_both]">
          EN: Fill the form to request info or schedule a demo call.
        </p>
      </section>

      {/* Form card rises in after header */}
      <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <ContactFormCard className="motion-safe:animate-[c4-rise-in_760ms_cubic-bezier(0.22,0.8,0.2,1)_260ms_both]" />
      </section>
    </main>
  );
}