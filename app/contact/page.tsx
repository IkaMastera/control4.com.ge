import type { Metadata } from 'next';
import ContactClient from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Control4 Georgia',
  description:
    'Talk to a Control4 specialist in Georgia. Get a consultation for smart lighting, audio, climate, and security.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}