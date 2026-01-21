import type { Metadata } from 'next';
import './globals.css';
import { inter, montserrat } from '../lib/fonts';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/footer';
import "@fortawesome/fontawesome-free/css/all.min.css";
import BackToTop from '@/components/common/back-to-top';
import WhatsAppFAB from '@/components/ui/whatsapp-fab';
import { SITE } from '@/data/config/site';



const HeaderDynamic = dynamic(() => import('@/components/layout/header-dynamic'))

export const metadata: Metadata = {
  metadataBase: new URL("https://control4.com.ge"),

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
  },

  title: {
    default: "Control4 Georgia",
    template: "%s | Control4 Georgia",
  },
  description:
    "Official Control4 smart home integrator in Georgia. Lighting, audio, security, climate & automation — integrated into one premium system. ჭკვიანი სახლი საქართველოში.",
  alternates: { canonical: "https://control4.com.ge" },
  openGraph: {
    type: "website",
    url: "https://control4.com.ge",
    siteName: "Control4 Georgia",
    title: "Control4 Smart Home Georgia | ჭკვიანი სახლი • Automation & Integration",
    description:
      "Official Control4 smart home integrator in Georgia. Lighting, audio, security, climate & automation — integrated into one premium system. ჭკვიანი სახლი საქართველოში.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${inter.variable} ${montserrat.variable}`}>
      <body className='min-h-dvh bg-grid antialiased'>
        <HeaderDynamic />

        <div data-scroll-behavior="smooth" className="relative pt-(--header-h,72px)">

            {children}

        </div>
       

        <Footer />

        <BackToTop />

        <div className="fixed right-6 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[60] flex flex-col items-end gap-4 pointer-events-none">
          <WhatsAppFAB phone={SITE.whatsappPhone} message={SITE.whatsappMessage} locale="ka"  />
        </div>

      </body>
    </html>
  )
}