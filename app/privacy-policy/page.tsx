import Container from "@/components/common/container";

export const metadata = {
  title: "Privacy Policy | Control4 Georgia",
  description:
    "Simple Privacy Policy for Control4 Georgia (control4.com.ge).",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[var(--color-bg)]">
      {/* subtle tech background (lightweight) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.22),transparent_62%)] blur-2xl" />
        <div className="absolute -right-52 top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,86,184,0.20),transparent_62%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(13,17,23,0.35),rgba(13,17,23,1))]" />
      </div>

      <Container className="relative z-10 py-10 lg:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-white/5 px-3 py-1 text-xs text-sky-200/90 shadow-[0_0_0_1px_rgba(0,194,255,0.10)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(0,194,255,0.55)]" />
            Privacy • Transparency • Security
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Privacy Policy
          </h1>

          <p className="mt-2 text-sm text-white/60">Last updated: December 2025</p>

          <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(0,194,255,0.06)] backdrop-blur">
            <p className="text-sm leading-relaxed text-white/75">
              This Privacy Policy explains how Control4 Georgia (control4.com.ge)
              collects and uses information when you visit our website or contact us.
            </p>

            <h2 className="text-base font-semibold text-white">What we collect</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>Contact details you submit (name, email, message)</li>
              <li>Basic technical data (IP address, browser/device, referrer)</li>
              <li>Anonymous analytics to improve the site</li>
            </ul>

            <h2 className="text-base font-semibold text-white">How we use it</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>To respond to your inquiry</li>
              <li>To improve website performance and usability</li>
              <li>To protect against abuse and maintain security</li>
            </ul>

            <h2 className="text-base font-semibold text-white">Sharing</h2>
            <p className="text-sm leading-relaxed text-white/75">
              We do not sell your personal data. We may share information only with
              trusted providers required to operate the website (e.g., hosting or form processing).
            </p>

            <h2 className="text-base font-semibold text-white">Retention</h2>
            <p className="text-sm leading-relaxed text-white/75">
              We keep personal data only as long as needed to respond to requests or meet legal obligations.
            </p>

            <h2 className="text-base font-semibold text-white">Your choices</h2>
            <p className="text-sm leading-relaxed text-white/75">
              You can request access, correction, or deletion of your data by contacting us using the website contact form.
            </p>

            <h2 className="text-base font-semibold text-white">Updates</h2>
            <p className="text-sm leading-relaxed text-white/75">
              We may update this policy. Changes will be posted on this page with an updated date.
            </p>

            <div className="mt-2 rounded-xl border border-sky-500/20 bg-[linear-gradient(135deg,rgba(0,86,184,0.14),rgba(0,194,255,0.10))] p-4">
              <p className="text-sm text-white/80">
                Questions? Use our contact form on control4.com.ge.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}