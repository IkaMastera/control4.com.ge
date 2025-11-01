import Link from "next/link";
import { Instagram, Facebook, Linkedin, Phone } from "lucide-react";

const cols = {
  solutions: ["Smart Lighting", "Security & Cameras", "Audio & Video", "Climate Control"],
  products: ["Core Controllers", "Intercom & Access", "Networking", "All Products"],
  company: ["About", "Partners", "Careers", "Contact"],
  legal: ["Privacy", "Terms", "Status"],
};

export default function Footer() {
  return (
    <footer
      className="
        relative mt-24
        bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(0,194,255,0.08),transparent),
             radial-gradient(900px_500px_at_10%_-10%,rgba(0,86,184,0.07),transparent),
             linear-gradient(180deg,#0D1117_0%,#0F1623_100%)]
        text-white
      "
    >
      {/* thin glowing top edge */}
      <div className="h-px w-full bg-gradient-to-r from-[#0056B8]/40 via-[#00C2FF]/50 to-transparent" />

      {/* animated scanline for 'techy' feel (very subtle) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden"
      >
        <i className="block h-[2px] w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[scan_6s_linear_infinite]" />
      </span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-10 border-b border-white/10">
          <div>
            <h3 className="text-lg font-semibold">Insider insights you’ll actually use.</h3>
            <p className="text-sm text-white/70">Monthly tips on smart living & Control4 news (no spam).</p>
          </div>
          <form
            action="https://formspree.io/f/your-id"
            method="POST"
            className="flex w-full max-w-xl items-end gap-3"
          >
            <div className="c4-float flex-1">
              <input
                name="email"
                type="email"
                required
                placeholder=" "
                className="w-full text-sm rounded-2xl bg-white/5 text-white outline-none"
              />
              <label>
                <span className="c4-label-text">Enter your email address</span>
              </label>
            </div>

            <button
              className="btn-glow rounded-2xl bg-[#0056B8] px-5 py-3 text-sm font-medium text-white shadow-sm 
                        hover:bg-[#0063CF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
          <div>
            <div className="text-xl font-semibold">Control4.ge</div>
            <p className="mt-2 text-sm text-white/70">
              Premium Control4 smart home solutions in Georgia.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Social href="#" label="Instagram"><Instagram size={18}/></Social>
              <Social href="#" label="Facebook"><Facebook size={18}/></Social>
              <Social href="#" label="LinkedIn"><Linkedin size={18}/></Social>
              <Social href="https://wa.me/9955XXXXXXX" label="WhatsApp"><Phone size={18}/></Social>
            </div>
          </div>

          <Links title="Solutions" items={cols.solutions} />
          <Links title="Products"  items={cols.products} />
          <div className="grid grid-cols-2 gap-8">
            <Links title="Company" items={cols.company} />
            <Links title="Legal"   items={cols.legal} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Control4 Georgia. All rights reserved.</p>
          <p>Design system by <Link href="#" className="text-white/80 hover:text-white">C4.ge</Link></p>
        </div>
      </div>
    </footer>
  );
}

function Links({ title, items }: { title: string; items: string[] }) {
  return (
    <nav>
      <h4 className="text-white font-semibold mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((x) => (
          <li key={x}>
            <a className="text-white/75 hover:text-white transition-colors" href="#">{x}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Social({ href, label, children }:{
  href: string; label: string; children: React.ReactNode;
}) {
  return (
    <Link
      href={href} aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full
                 bg-white/5 ring-1 ring-white/10 hover:bg-white/8 transition"
    >
      <span className="text-white/80">{children}</span>
    </Link>
  );
}