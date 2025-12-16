import Container from "@/components/common/container";

export const metadata = {
  title: "Privacy Policy | Control4 Georgia",
  description:
    "Privacy Policy explaining how Control4 Georgia collects, uses, and protects personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="relative border-t border-white/5 bg-[var(--color-bg)]">
      <Container className="py-12 lg:py-20 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm text-white/60">
          Last updated: December 2025
        </p>

        <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/80 prose-li:text-white/80 prose-headings:text-white">
          <h2>1. Introduction</h2>
          <p>
            Control4 Georgia respects your privacy and is committed to protecting
            your personal data. This Privacy Policy explains how we collect, use,
            and safeguard information when you visit our website.
          </p>

          <h2>2. Who We Are</h2>
          <p>
            Control4 Georgia is an official partner providing Control4 smart home
            solutions in Georgia. Our website is informational and intended to
            help clients understand our services and contact us.
          </p>

          <h2>3. Information We Collect</h2>
          <ul>
            <li>Personal information you provide via contact forms (name, email, message)</li>
            <li>Technical data such as IP address, browser type, and device information</li>
            <li>Anonymous usage data collected via analytics tools</li>
          </ul>

          <h2>4. How We Use Your Information</h2>
          <ul>
            <li>To respond to inquiries and contact requests</li>
            <li>To improve website performance and usability</li>
            <li>To maintain website security and prevent abuse</li>
          </ul>

          <h2>5. Cookies and Analytics</h2>
          <p>
            We use essential cookies and privacy-friendly analytics tools to
            understand website traffic. These tools do not track users across
            different websites or create personal profiles.
          </p>

          <h2>6. Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal data. Information may
            only be shared with trusted service providers strictly for operating
            this website.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to respond to
            inquiries or comply with legal obligations.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            You have the right to request access, correction, or deletion of
            your personal data. To exercise these rights, please contact us.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your information from unauthorized access, loss, or misuse.
          </p>

          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to external websites. We are not
            responsible for the privacy practices or content of those sites.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            If you have questions about this Privacy Policy or how your data is
            handled, please contact us via the contact form on this website.
          </p>
        </div>
      </Container>
    </section>
  );
}