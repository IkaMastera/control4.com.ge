import Link from "next/link";
import { Instagram, Facebook, Linkedin, Phone } from "lucide-react";

type FooterLink = {
  id: string; // ✅ unique key
  label: string;
  href: string;
  external?: boolean;
};

const cols: Record<string, FooterLink[]> = {
  solutions: [
    { id: "sol-lighting", label: "Smart Lighting", href: "/products/lighting/keypads-dimmers" },
    { id: "sol-security-cams", label: "Security & Cameras", href: "/products/security/cameras-nvr" },
    { id: "sol-audio-video", label: "Audio & Video", href: "/products/audio-video/triad-speakers" }, // ✅ updated
    { id: "sol-climate", label: "Climate Control", href: "/products/comfort/comfort-controls" },
  ],
  products: [
    { id: "prd-core-controllers", label: "Core Controllers", href: "/products/controllers/core-controllers" },
    { id: "prd-intercom-access", label: "Intercom & Access", href: "/products/security/cameras-nvr" },
    { id: "prd-networking", label: "Networking", href: "/products/interfaces/touchscreens" },
    { id: "prd-all-products", label: "All Products", href: "/products" },
  ],
  company: [
    { id: "cmp-about", label: "About", href: "/about" },
    { id: "cmp-contact", label: "Contact", href: "/contact" },
    { id: "cmp-prices", label: "Prices", href: "/price-calculator" },
  ],
  legal: [
    { id: "leg-privacy", label: "Privacy", href: "/privacy-policy" },
    { id: "leg-terms", label: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative text-white overflow-hidden
        bg-[linear-gradient(180deg,#0B1020_0%,#0A0F1A_55%,#070B12_100%)]
      "
    >
      {/* Tech background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <div className="absolute -top-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,194,255,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -top-44 left-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,86,184,0.16),transparent_60%)] blur-2xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.22]" />

        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
          <i className="block h-0.5 w-1/3 bg-linear-to-r from-transparent via-accent/80 to-transparent animate-[scan_7s_linear_infinite]" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(900px_320px_at_15%_20%,rgba(0,194,255,0.08),transparent),radial-gradient(900px_320px_at_85%_30%,rgba(0,86,184,0.08),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Newsletter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-10 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Smarter living, thoughtfully shared.
            </h3>
            <p className="text-sm text-white/70">
              Insights from the world of Control4 and intelligent homes.
            </p>
          </div>

          <form
            action="https://formspree.io/f/xoqgzzpn"
            method="POST"
            className="flex w-full max-w-xl items-end gap-3"
          >
            {/* REQUIRED: email field */}
            <input type="hidden" name="_subject" value="New Control4 Newsletter Signup" />
            <input type="hidden" name="_template" value="table" />

            <div className="c4-float flex-1">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder=" "
                autoComplete="email"
                className="
                  w-full text-sm rounded-2xl bg-white/[0.06] text-white outline-none
                  ring-1 ring-white/10
                  focus:ring-2 focus:ring-accent/70
                  transition
                "
              />
              <label htmlFor="newsletter-email">
                <span className="c4-label-text">Enter your email address</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn-glow rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
          <div>
            <div className="text-xl font-semibold tracking-tight">Control4 Georgia</div>
            <p className="mt-2 text-sm text-white/70">
              Official Control4 partner across Georgia — intelligent living,
              professionally engineered
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Social href="https://instagram.com" label="Instagram">
                <Instagram size={18} />
              </Social>
              <Social href="https://facebook.com" label="Facebook">
                <Facebook size={18} />
              </Social>
              <Social href="https://linkedin.com" label="LinkedIn">
                <Linkedin size={18} />
              </Social>
              <Social href="https://wa.me/9955XXXXXXX" label="WhatsApp">
                <Phone size={18} />
              </Social>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_16px_rgba(0,194,255,0.8)]" />
              System-grade installs • Clean wiring • Long-term stability
            </div>
          </div>

          <Links title="Solutions" items={cols.solutions} />
          <Links title="Products" items={cols.products} />

          <div className="grid grid-cols-2 gap-8">
            <Links title="Company" items={cols.company} />
            <Links title="Legal" items={cols.legal} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>© {year} Control4 Georgia. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70" />
            <span>
              Design system by{" "}
              <Link href="/" className="text-white/80 hover:text-white">
                C4.ge
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function Links({ title, items }: { title: string; items: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h4 className="text-white font-semibold mb-3 tracking-tight">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <span className="h-px w-4 bg-white/20 group-hover:bg-accent/70 transition-colors" />
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <span className="h-px w-4 bg-white/20 group-hover:bg-accent/70 transition-colors" />
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex h-9 w-9 items-center justify-center rounded-full
        bg-white/[0.05] ring-1 ring-white/10
        shadow-[0_0_0_1px_rgba(0,194,255,0.06)]
        hover:bg-white/[0.08]
        hover:shadow-[0_0_0_1px_rgba(0,194,255,0.16),0_0_26px_rgba(0,194,255,0.10)]
        transition
      "
    >
      <span className="text-white/80">{children}</span>
    </a>
  );
}