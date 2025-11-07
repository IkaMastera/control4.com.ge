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
  title: 'Control4 Georgia',
  description: 'Lighting, security, climate and audio unified in one device'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${inter.variable} ${montserrat.variable}`}>
      <body className='min-h-dvh bg-grid antialiased'>
        <HeaderDynamic />

        <div className="relative pt-[var(--header-h,72px)]">
          {children}
        </div>
       

        <Footer />

        <BackToTop />

        <div className="fixed right-6 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[60] flex flex-col items-end gap-4 pointer-events-none">
          <WhatsAppFAB phone={SITE.whatsappPhone} message={SITE.whatsappMessage} locale="ka" fixed={false} className="pointer-events-auto" />
        </div>

      </body>
    </html>
  )
}