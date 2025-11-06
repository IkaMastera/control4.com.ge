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

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">CONTACT</p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold">Get in touch</h1>
        <p className="mt-4 text-white/75 text-base sm:text-lg">
          EN: Fill the form to request info or schedule a demo call.
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-32 md:pb-40">
        <div className="mx-auto w-full max-w-5xl">
          <ContactFormCard />
        </div>
      </section>
    </main>
  );
}