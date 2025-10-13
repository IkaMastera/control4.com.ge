import { Inter, Montserrat } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
    variable: '--font-montserrat'
})