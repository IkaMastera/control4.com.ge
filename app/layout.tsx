import type { Metadata } from 'next'
import './globals.css'
import { inter, montserrat } from '../lib/fonts'
import Header from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'Control4 Georgia',
  description: 'Lighting, security, climate and audio unified in one device'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={`${inter.variable} ${montserrat.variable}`}>
      <body className='min-h-dvh'>
        <Header />
        {children}
      </body>
    </html>
  )
}