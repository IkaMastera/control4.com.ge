import type { Metadata } from 'next'
import './globals.css'
import { inter, montserrat } from '../lib/fonts'
import dynamic from 'next/dynamic'
import Footer from '@/components/layout/footer'
import "@fortawesome/fontawesome-free/css/all.min.css";
import BackToTop from '@/components/common/back-to-top'

const Header = dynamic(() => import('@/components/layout/header'))

export const metadata: Metadata = {
  title: 'Control4 Georgia',
  description: 'Lighting, security, climate and audio unified in one device'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${inter.variable} ${montserrat.variable}`}>
      <body className='min-h-dvh bg-grid antialiased'>
        <Header />

        <div className="relative pt-[var(--header-h,72px)]">
          {children}
        </div>

        <Footer />

        <BackToTop />
      </body>
    </html>
  )
}